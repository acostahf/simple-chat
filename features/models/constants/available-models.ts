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

export const AVAILABLE_MODELS: AIModel[] = [
    {
        id: "anthropic/claude-3.5-sonnet",
        name: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        description:
            "Most capable model with excellent reasoning and code generation",
        contextLength: 200000,
        pricing: {
            prompt: 0.003,
            completion: 0.015,
        },
        tags: ["recommended", "reasoning", "coding"],
    },
    {
        id: "openai/gpt-4o",
        name: "GPT-4 Omni",
        provider: "OpenAI",
        description: "Fastest and most capable GPT-4 model",
        contextLength: 128000,
        pricing: {
            prompt: 0.005,
            completion: 0.015,
        },
        tags: ["fast", "multimodal", "popular"],
    },
    {
        id: "openai/gpt-4-turbo",
        name: "GPT-4 Turbo",
        provider: "OpenAI",
        description: "High-performance model with large context window",
        contextLength: 128000,
        pricing: {
            prompt: 0.01,
            completion: 0.03,
        },
        tags: ["large-context", "versatile"],
    },
    {
        id: "google/gemini-pro-1.5",
        name: "Gemini Pro 1.5",
        provider: "Google",
        description:
            "Advanced model with excellent reasoning capabilities",
        contextLength: 1000000,
        pricing: {
            prompt: 0.0025,
            completion: 0.0075,
        },
        tags: ["large-context", "reasoning"],
    },
    {
        id: "meta-llama/llama-3.1-70b-instruct",
        name: "Llama 3.1 70B",
        provider: "Meta",
        description: "Open-source model with competitive performance",
        contextLength: 128000,
        pricing: {
            prompt: 0.0009,
            completion: 0.0009,
        },
        tags: ["open-source", "cost-effective"],
    },
    {
        id: "anthropic/claude-3-haiku",
        name: "Claude 3 Haiku",
        provider: "Anthropic",
        description: "Fast and cost-effective model for simple tasks",
        contextLength: 200000,
        pricing: {
            prompt: 0.00025,
            completion: 0.00125,
        },
        tags: ["fast", "cost-effective"],
    },
];

export const getModelById = (id: string): AIModel | undefined => {
    return AVAILABLE_MODELS.find((model) => model.id === id);
};

export const getModelsByProvider = (provider: string): AIModel[] => {
    return AVAILABLE_MODELS.filter((model) => model.provider === provider);
};

export const getModelsByTag = (tag: string): AIModel[] => {
    return AVAILABLE_MODELS.filter((model) => model.tags.includes(tag));
};
