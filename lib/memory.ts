import { Redis } from "@upstash/redis";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FileKey } from "lucide-react";
import { count } from "console";

export type ComanionKey = {
  comapnionName: string;
  modelName: string;
  userId: string;
};

export class MemoryManager {
  private static instance: MemoryManager;
  private histroy: Redis;
  private vectorDBClient: Pinecone;

  public MemoryManager() {
    this.histroy = Redis.fromEnv();
    this.vectorDBClient = new Pinecone();
  }

  public async init() {
    if (this.vectorDBClient instanceof Pinecone) {
      new Pinecone({
        apiKey: "your_api_key",
        environment: "your_environment",
      });
    }
  }

  public async vectorSearch(
    recentChatHistory: string,
    companionFileName: string
  ) {
    const pineconeclient = <Pinecone>this.vectorDBClient;

    const pineconeIndex = pineconeclient.Index(
      process.env.PINCONE_INDEX! || ""
    );

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
      { pineconeIndex }
    );

    const similarDocs = await vectorStore
      .similaritySearch(recentChatHistory, 3, { fileName: companionFileName })
      .catch((err) => {
        console.log(err);
      });
  }

  public static async getInstance(): Promise<MemoryManager> {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
      await MemoryManager.instance.init();
    }

    return MemoryManager.instance;
  }

  private generateRedisCompainonKey(companionKey: ComanionKey): string {
    return `${companionKey.comapnionName}-${companionKey.modelName}-${companionKey.userId}`;
  }

  public async writeToHistory(text: string, companionKey: ComanionKey) {
    if (!companionKey || typeof companionKey.userId === "undefined") {
      console.log("companion 키 분실");
      return "";
    }

    const key = this.generateRedisCompainonKey(companionKey);
    const result = await this.histroy.zadd(key, {
      score: Date.now(),
      member: text,
    });

    return result;
  }

  public async readLatestHistory(companionKey: ComanionKey): Promise<string> {
    if (!companionKey || typeof companionKey.userId == "undefined") {
      console.log("companion 설정한 키 오류");
    }

    const key = this.generateRedisCompainonKey(companionKey);
    let result = await this.histroy.zrange(key, 0, Date.now(), {
      byScore: true,
    });

    result = result.slice(-30).reverse();
    const recentChats = result.reverse().join("\n");
    return recentChats;
  }

  public async seedChatHistory(
    seedContent: string,
    delimiter: string = "\n",
    companionKey: ComanionKey
  ) {
    const key = this.generateRedisCompainonKey(companionKey);

    if (await this.histroy.exists(key)) {
      console.log("user already has chat history");
      return;
    }

    const content = seedContent.split(delimiter);
    let counter = 0;

    for (const line of content) {
      await this.histroy.zadd(key, { score: counter, member: line });
      counter += 1;
    }
  }
}
