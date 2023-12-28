"use client";

import { Companioned } from "@prisma/client";
import { ChatMessage } from "./chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: any[];
  isLoading: boolean;
  companion: Companioned;
}

export const ChatMessages = ({
  messages,
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fackloading, setFackloading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFackloading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  }, [messages.length])

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fackloading}
        src={companion.src}
        role="system"
        content={`hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.src}
        />
      ))}
      {
        isLoading && (
          <ChatMessage
            role="system"
            src={companion.src}
            isLoading
            />
        )
      }
      <div ref={scrollRef}/>
    </div>
  );
};
