"use client"
import {ChatRequestOptions} from "ai"
import { ChangeEvent, FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatFormProps {
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    isLoading: boolean
}

export const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading
} : ChatFormProps) => {
    return (
        <form
            onSubmit={onSubmit}
            className="boder-t border-primary/10 py-4 flex items-center gap-x-2">
                <Input disabled={isLoading}></Input>
                <Button variant="ghost" disabled={isLoading}>
                    <SendHorizonal className="w-6 h-6"/>
                </Button>
        </form>
    )
}