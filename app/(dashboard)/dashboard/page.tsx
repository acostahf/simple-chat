"use client";

import { useState, useEffect } from "react";
import { useChat } from "@/features/chat";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AVAILABLE_MODELS } from "@/features/models/constants/available-models";

export default function DashboardPage() {
    const [currentConversationId, setCurrentConversationId] = useState<
        string | undefined
    >();

    // Get the latest conversation or create one if none exists
    const conversations =
        useQuery(api.conversations.getConversations) || [];
    const createConversation = useMutation(
        api.conversations.createConversation
    );

    // Use the current conversation or the latest one
    const conversationId = currentConversationId || conversations[0]?._id;

    const {
        messages,
        isLoading,
        isStreaming,
        selectedModel,
        sendMessage,
        setSelectedModel,
    } = useChat(conversationId);

    const [inputValue, setInputValue] = useState("");

    // Create a conversation if none exists
    useEffect(() => {
        const initializeConversation = async () => {
            if (conversations.length === 0 && !currentConversationId) {
                try {
                    const newConversationId = await createConversation({
                        title: "New Chat",
                        model: "openai/gpt-4o",
                    });
                    setCurrentConversationId(newConversationId);
                } catch (error) {
                    console.error(
                        "Failed to create initial conversation:",
                        error
                    );
                }
            }
        };

        initializeConversation();
    }, [conversations.length, currentConversationId, createConversation]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading || isStreaming) return;

        await sendMessage(inputValue);
        setInputValue("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
    };

    const hasMessages = messages.length > 0;

    // Show loading while setting up conversation
    if (!conversationId) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Chat Messages or Welcome Screen */}
            <div className="flex-1 overflow-y-auto">
                {!hasMessages ? (
                    // Welcome Screen
                    <div className="flex flex-col items-center justify-center h-full p-8">
                        <div className="max-w-3xl w-full text-center">
                            <h1 className="text-4xl font-medium text-gray-900 dark:text-gray-100 mb-6">
                                How can I help you, Fabian?
                            </h1>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all group">
                                    <div className="text-2xl mb-2">✨</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Create
                                    </div>
                                </button>
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all group">
                                    <div className="text-2xl mb-2">📊</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Explore
                                    </div>
                                </button>
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all group">
                                    <div className="text-2xl mb-2">💻</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Code
                                    </div>
                                </button>
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all group">
                                    <div className="text-2xl mb-2">🎓</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Learn
                                    </div>
                                </button>
                            </div>

                            {/* Suggested Questions */}
                            <div className="space-y-3 mb-8">
                                <button
                                    onClick={() =>
                                        handleSuggestionClick(
                                            "How does AI work?"
                                        )
                                    }
                                    className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                                >
                                    <div className="text-gray-900 dark:text-gray-100">
                                        How does AI work?
                                    </div>
                                </button>
                                <button
                                    onClick={() =>
                                        handleSuggestionClick(
                                            "Are black holes real?"
                                        )
                                    }
                                    className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                                >
                                    <div className="text-gray-900 dark:text-gray-100">
                                        Are black holes real?
                                    </div>
                                </button>
                                <button
                                    onClick={() =>
                                        handleSuggestionClick(
                                            "How many Rs are in the word strawberry?"
                                        )
                                    }
                                    className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                                >
                                    <div className="text-gray-900 dark:text-gray-100">
                                        How many Rs are in the word
                                        strawberry?
                                    </div>
                                </button>
                                <button
                                    onClick={() =>
                                        handleSuggestionClick(
                                            "What is the meaning of life?"
                                        )
                                    }
                                    className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                                >
                                    <div className="text-gray-900 dark:text-gray-100">
                                        What is the meaning of life?
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Chat Messages
                    <div className="p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-3xl px-4 py-2 rounded-lg ${
                                        message.role === "user"
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    }`}
                                >
                                    <div className="whitespace-pre-wrap">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message here..."
                            className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            rows={1}
                            style={{
                                minHeight: "44px",
                                maxHeight: "200px",
                            }}
                            disabled={isLoading || isStreaming}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={
                                !inputValue.trim() ||
                                isLoading ||
                                isStreaming
                            }
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.5 1.5L7 9M14.5 1.5L10 14.5L7 9M14.5 1.5L1.5 6L7 9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Model Selector */}
                    <div className="flex items-center justify-between mt-3">
                        <select
                            value={selectedModel}
                            onChange={(e) =>
                                setSelectedModel(e.target.value)
                            }
                            className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {AVAILABLE_MODELS.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Press Enter to send, Shift+Enter for new line
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
