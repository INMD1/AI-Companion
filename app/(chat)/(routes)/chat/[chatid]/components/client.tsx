"use client"
import {useCompletion} from "ai/react"
import { ChatHeader } from "@/components/chat-header";
import { Companioned, Message } from "@prisma/client"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatForm } from "@/components/chat-form";
import { ChatMessages } from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";

interface ChatClientProps {
    companion : Companioned & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
}

export const ChatClient = (
    {companion}: ChatClientProps
) => {
    const router = useRouter();
    const [message , setMessage] = useState<any[]>(companion.messages);


    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(prompt, completion) {
            const systemMessage = {
                role: "system",
                content: completion,
            };

            setMessage((current) => [...current, systemMessage]);
            setInput("")
            
            router.back()
        }
    });

    const onSubmit =(e: FormEvent<HTMLFieldSetElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input,
        };

        setMessage((current) => [...current, userMessage]);

        handleSubmit(e)
    };
    return(
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion= {companion}/>
            <ChatMessages companion={companion} isLoading={isLoading} messages={message}/>
            <div>
                Message TODO
            </div>
            <ChatForm isLoading={isLoading} input={input} handleInputChange={handleInputChange} onSubmit={onSubmit}/>

        </div>
    )
}