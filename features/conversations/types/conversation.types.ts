"use client";

export interface Conversation {
    id: string;
    userId: string;
    title: string;
    model: string;
    createdAt: number;
    updatedAt: number;
}

export interface ConversationState {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    isLoading: boolean;
    error: string | null;
}

export interface CreateConversationRequest {
    title: string;
    model: string;
}

export interface UpdateConversationRequest {
    id: string;
    title?: string;
    model?: string;
}

export interface ConversationWithMessageCount extends Conversation {
    messageCount: number;
    lastMessage?: {
        content: string;
        timestamp: number;
        role: "user" | "assistant";
    };
}
