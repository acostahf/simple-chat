"use client";

import React from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "../../ui/components/Button";
import { cn } from "../../../lib/utils";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
    onSendMessage,
    isLoading = false,
    disabled = false,
    placeholder = "Type your message...",
}) => {
    const [message, setMessage] = React.useState("");
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSubmit = React.useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (message.trim() && !isLoading && !disabled) {
                onSendMessage(message.trim());
                setMessage("");
                if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                }
            }
        },
        [message, onSendMessage, isLoading, disabled]
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
            }
        },
        [handleSubmit]
    );

    const handleInputChange = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);

            // Auto-resize textarea
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        },
        []
    );

    return (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={1}
                        className={cn(
                            "w-full resize-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50",
                            "min-h-[44px] max-h-32 overflow-y-auto"
                        )}
                        style={{ height: "auto" }}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-slate-400 dark:text-slate-500">
                        Press Enter to send, Shift+Enter for new line
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={!message.trim() || isLoading || disabled}
                    size="icon"
                    className="h-11 w-11 flex-shrink-0"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </Button>
            </form>
        </div>
    );
};

export { MessageInput };
