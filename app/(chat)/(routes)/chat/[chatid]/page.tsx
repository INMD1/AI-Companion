import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/dist/server/api-utils";
import { ChatClient } from "./components/client";

interface ChatIdpageProps {
    params : {
        chatId: string
    }
}

const Chatidpage = async  ({
    params
}: ChatIdpageProps) => {
    const { userId } = auth();

    if(!userId){
        return redirectToSignIn();
    }

    const companion = await prismadb.companioned.findFirst({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where:{
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    return(
        <ChatClient companion={companion}/>
    )
}

export default Chatidpage;