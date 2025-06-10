"use client";

import React from "react";
import { Message } from "../types/chat.types";
import { formatDate, cn } from "../../../lib/utils";
import { User, Bot, Copy, Check } from "lucide-react";

interface MessageBubbleProps {
    message: Message;
    isStreaming?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isStreaming = false,
}) => {
    const [copied, setCopied] = React.useState(false);
    const isAssistant = message.role === "assistant";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy message:", error);
        }
    };

    return (
        <div
            className={cn(
                "flex gap-3 p-4 group",
                isAssistant
                    ? "bg-slate-50 dark:bg-slate-800/50"
                    : "bg-white dark:bg-slate-900"
            )}
        >
            <div
                className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    isAssistant
                        ? "bg-blue-500 text-white"
                        : "bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-700"
                )}
            >
                {isAssistant ? (
                    <Bot className="w-4 h-4" />
                ) : (
                    <User className="w-4 h-4" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {isAssistant ? "Assistant" : "You"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(message.timestamp)}
                    </span>
                    {isStreaming && (
                        <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-75" />
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-150" />
                        </div>
                    )}
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                        {message.content}
                    </pre>
                </div>

                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { MessageBubble };
