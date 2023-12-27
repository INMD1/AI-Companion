"use client";

import { Companioned } from "@prisma/client";

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
    return(
        <div className="flex-1 overflow-y-auto pr-4">
            
        </div>
    )
};
