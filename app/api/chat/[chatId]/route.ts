import { MemoryManager } from "@/lib/memory";
import prismadb from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
const openapi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request, { params: { chatId: string } }) {
  try {
    //사용자가 입력한 정보를 볼수 있다.
    const { userId } = auth();
    const body = await request.json();

    //명렁어를 입력하면 역할부여시작
    if (body.prompt == "/start") {
      //생성된 봇의 정보를 불려옴
      const mind = await prismadb.companioned.findMany({
        where: {
          userId: userId,
        },
      });
      
      const instructionMessage: ChatCompletionMessageParam = {
        role: "system",
        content:
          "내가 너한데 역할을 줄거야 내가 줄 역할은" + mind[0].instructions + "이거야, 알아드렸으면 아래와같은 문장을 보내줘 '확인 했습니다. 이제 사용해보세요.'",
      };

      console.log(instructionMessage);
      
      const response = await openapi.chat.completions.create(
        {
            messages: [instructionMessage],
            model: 'gpt-3.5-turbo'
        }
    )
      return NextResponse.json(response.choices[0].message.content);
    }

    // const { prompt } = await request.json();
    // const user = await currentUser();

    // if (!user || !user.firstName || !user.id) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // const identifier = request.url + "-" + user.id;
    // const { success } = await rateLimit(identifier);

    // if (!success) {
    //   return new NextResponse("Rate limit exceeded", { status: 429 });
    // }

    // const companion = await prismadb.companioned.update({
    //   where: {
    //     id: params.chatId,
    //   },
    //   data: {
    //     messages: {
    //       create: {
    //         content: prompt,
    //         role: "user",
    //         userId: user.id,
    //       },
    //     },
    //   },
    // });

    // if (!companion) {
    //   return new NextResponse("Companion not found", { status: 404 });
    // }

    // //GPT 키는 위로 올라갔습니다.

    
    // const memoryManager = await MemoryManager.getInstance();

    // const records = await memoryManager.readLatestHistory(companionKey);
    // if (records.length === 0) {
    //   await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);
    // }
    // await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

    // const recentChatHistory = await memoryManager.readLatestHistory(
    //   companionKey
    // );

    // const response = await openapi.chat.completions.create(
    //   {
    //       messages: [instructionMessage],
    //       model: 'gpt-3.5-turbo'
    //   }
    // )


      
  } catch (error) {
    console.log("adasdd" + error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
