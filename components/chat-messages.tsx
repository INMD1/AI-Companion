"use client";

import { Companioned } from "@prisma/client";
import { ChatMessage } from "./chat-message";
import { useEffect, useState } from "react";

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

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fackloading}
        src={companion.src}
        role="system"
        content={`hello, I am ${companion.name}, ${companion.description}`}
      />
      <ChatMessage src={companion.src} role="user" content="Okay Okay cat " />
    </div>
  );
};
