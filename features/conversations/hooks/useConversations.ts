"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
    Conversation,
    CreateConversationRequest,
    UpdateConversationRequest,
} from "../types/conversation.types";

export function useConversations() {
    const convex = useConvex();
    const queryClient = useQueryClient();

    // Fetch conversations
    const {
        data: conversations = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => {
            try {
                const result = await convex.query(
                    api.conversations.getConversations
                );
                return result || [];
            } catch (error) {
                console.error("Failed to fetch conversations:", error);
                return [];
            }
        },
    });

    // Create conversation mutation
    const createConversationMutation = useMutation({
        mutationFn: async (data: CreateConversationRequest) => {
            return await convex.mutation(
                api.conversations.createConversation,
                data
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
    });

    // Update conversation mutation
    const updateConversationMutation = useMutation({
        mutationFn: async (data: UpdateConversationRequest) => {
            return await convex.mutation(
                api.conversations.updateConversation,
                data
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
    });

    // Delete conversation mutation
    const deleteConversationMutation = useMutation({
        mutationFn: async (id: string) => {
            return await convex.mutation(
                api.conversations.deleteConversation,
                { id }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
    });

    return {
        conversations: conversations as Conversation[],
        isLoading,
        error,
        createConversation: createConversationMutation.mutateAsync,
        updateConversation: updateConversationMutation.mutateAsync,
        deleteConversation: deleteConversationMutation.mutateAsync,
        isCreating: createConversationMutation.isPending,
        isUpdating: updateConversationMutation.isPending,
        isDeleting: deleteConversationMutation.isPending,
    };
}
