"use client";

export interface AIModel {
    id: string;
    name: string;
    provider: string;
    description: string;
    contextLength: number;
    pricing: {
        prompt: number;
        completion: number;
    };
    tags: string[];
}

export interface ModelState {
    availableModels: AIModel[];
    selectedModel: AIModel | null;
    isLoading: boolean;
    error: string | null;
}

export interface ModelUsage {
    modelId: string;
    tokensUsed: number;
    cost: number;
    requestCount: number;
}

export interface ModelProvider {
    name: string;
    models: AIModel[];
    description: string;
    website: string;
}
