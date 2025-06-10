"use client";

import React from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { Message } from "../types/chat.types";
import { DEFAULT_MODEL } from "../../../lib/constants";

export function useChat(conversationId?: string) {
    const queryClient = useQueryClient();
    const [localMessages, setLocalMessages] = React.useState<Message[]>(
        []
    );

    const [selectedModel, setSelectedModel] =
        React.useState<string>(DEFAULT_MODEL);

    // For now, use local state for messages since Convex storage is not implemented
    const messages = localMessages;
    const isLoading = false;
    const error = null;

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: async ({
            content,
            model,
        }: {
            content: string;
            model: string;
        }) => {
            if (!conversationId) {
                throw new Error("No conversation selected");
            }

            // Add user message to local state immediately
            const userMessage: Message = {
                id: `user-${Date.now()}`,
                role: "user",
                content,
                timestamp: Date.now(),
                conversationId: conversationId!,
            };

            setLocalMessages((prev) => [...prev, userMessage]);

            // Prepare messages for API (include the new user message)
            const allMessages = [
                ...messages,
                { role: "user" as const, content },
            ];

            // Call our API route
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: allMessages,
                    model,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to send message"
                );
            }

            const chatResponse = await response.json();
            return chatResponse;
        },
        onSuccess: async (chatResponse) => {
            // Handle the complete response
            if (chatResponse.choices?.[0]?.message?.content) {
                const assistantMessage: Message = {
                    id: `assistant-${Date.now()}`,
                    role: "assistant",
                    content: chatResponse.choices[0].message.content,
                    timestamp: Date.now(),
                    conversationId: conversationId!,
                };

                setLocalMessages((prev) => [...prev, assistantMessage]);

                // TODO: Save to Convex when available
                // await convex.mutation(api.messages.createMessage, {
                //   conversationId,
                //   role: 'assistant',
                //   content: assistantMessage.content,
                // });
            }
        },
        onError: (error) => {
            console.error("Send message error:", error);
        },
    });

    const sendMessage = React.useCallback(
        async (content: string) => {
            if (!content.trim() || sendMessageMutation.isPending) return;

            try {
                await sendMessageMutation.mutateAsync({
                    content: content.trim(),
                    model: selectedModel,
                });
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        },
        [sendMessageMutation, selectedModel]
    );

    // Reset messages when conversation changes
    React.useEffect(() => {
        setLocalMessages([]);
    }, [conversationId]);

    return {
        messages: messages as Message[],
        isLoading,
        isStreaming: false, // Disabled for now
        selectedModel,
        streamingMessage: undefined as undefined, // Disabled for now
        error,
        sendMessage,
        setSelectedModel,
        isSending: sendMessageMutation.isPending,
    };
}
