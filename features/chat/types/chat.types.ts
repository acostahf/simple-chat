"use client";

export interface Message {
    id: string;
    conversationId: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    isStreaming: boolean;
    error: string | null;
    currentModel: string;
}

export interface StreamingMessage {
    id: string;
    content: string;
    isComplete: boolean;
}

export interface ChatCompletionRequest {
    model: string;
    messages: Array<{
        role: "user" | "assistant" | "system";
        content: string;
    }>;
    stream?: boolean;
    temperature?: number;
    max_tokens?: number;
}

export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: "assistant";
            content: string;
        };
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface ChatCompletionStreamChunk {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        delta: {
            role?: "assistant";
            content?: string;
        };
        finish_reason: string | null;
    }>;
}
