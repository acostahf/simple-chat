"use client";

import React from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ModelSelector } from "./ModelSelector";
import { Loading } from "../../ui/components/Loading";
import { AVAILABLE_MODELS } from "../../models/constants/available-models";
import { Message } from "../types/chat.types";
import { Settings } from "lucide-react";

interface ChatInterfaceProps {
    conversationId?: string;
    messages: Message[];
    isLoading: boolean;
    isStreaming: boolean;
    selectedModel: string;
    onSendMessage: (message: string) => void;
    onModelChange: (modelId: string) => void;
    streamingMessage?: {
        id: string;
        content: string;
        isComplete: boolean;
    };
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    conversationId,
    messages,
    isLoading,
    isStreaming,
    selectedModel,
    onSendMessage,
    onModelChange,
    streamingMessage,
}) => {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const messagesContainerRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamingMessage]);

    // Display messages including streaming message
    const displayMessages = React.useMemo(() => {
        const allMessages = [...messages];

        if (streamingMessage) {
            allMessages.push({
                id: streamingMessage.id,
                conversationId: conversationId || "",
                role: "assistant" as const,
                content: streamingMessage.content,
                timestamp: Date.now(),
            });
        }

        return allMessages;
    }, [messages, streamingMessage, conversationId]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Chat
                    </h2>
                    {conversationId && (
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            ID: {conversationId.slice(-8)}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <ModelSelector
                        models={AVAILABLE_MODELS}
                        selectedModel={selectedModel}
                        onModelChange={onModelChange}
                        disabled={isLoading || isStreaming}
                    />
                    <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <Settings className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto"
            >
                {displayMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                            <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                            Start a conversation
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                            Ask me anything! I'm here to help with coding,
                            writing, analysis, and more.
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-2 w-full max-w-sm">
                            <button
                                onClick={() =>
                                    onSendMessage(
                                        "Help me write a React component"
                                    )
                                }
                                className="p-3 text-left text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                Help me write a React component
                            </button>
                            <button
                                onClick={() =>
                                    onSendMessage(
                                        "Explain how async/await works"
                                    )
                                }
                                className="p-3 text-left text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                Explain how async/await works
                            </button>
                            <button
                                onClick={() =>
                                    onSendMessage(
                                        "Review my code for best practices"
                                    )
                                }
                                className="p-3 text-left text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                Review my code for best practices
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {displayMessages.map((message, index) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                isStreaming={
                                    streamingMessage?.id === message.id &&
                                    !streamingMessage.isComplete
                                }
                            />
                        ))}
                        {isLoading && !streamingMessage && (
                            <div className="p-4">
                                <Loading text="Thinking..." />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <MessageInput
                onSendMessage={onSendMessage}
                isLoading={isLoading || isStreaming}
                disabled={!selectedModel}
                placeholder={
                    !selectedModel
                        ? "Please select a model first..."
                        : "Type your message..."
                }
            />
        </div>
    );
};

export { ChatInterface };
