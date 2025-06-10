import {
    ChatCompletionRequest,
    ChatCompletionResponse,
    ChatCompletionStreamChunk,
} from "../types/chat.types";

interface OpenRouterModel {
    id: string;
    name?: string;
    description?: string;
    pricing?: {
        prompt: string;
        completion: string;
    };
    context_length?: number;
    architecture?: {
        modality: string;
        tokenizer: string;
    };
    top_provider?: {
        max_completion_tokens?: number;
    };
}

class OpenRouterService {
    async createChatCompletion(
        request: ChatCompletionRequest
    ): Promise<ChatCompletionResponse> {
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: request.model,
                    messages: request.messages,
                    temperature: request.temperature || 0.7,
                    max_tokens: request.max_tokens || 2048,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to get AI response"
                );
            }

            return await response.json();
        } catch (error) {
            console.error("Chat API error:", error);
            throw error;
        }
    }

    async *createStreamingChatCompletion(
        request: ChatCompletionRequest
    ): AsyncGenerator<ChatCompletionStreamChunk> {
        // For now, we'll implement this later when we add streaming support
        // Just return the non-streaming response for now
        const response = await this.createChatCompletion(request);

        // Convert the response to a stream-like format for compatibility
        if (response.choices && response.choices[0]) {
            const choice = response.choices[0];
            const chunk: ChatCompletionStreamChunk = {
                id: response.id,
                object: "chat.completion.chunk",
                created: response.created,
                model: response.model,
                choices: [
                    {
                        index: choice.index,
                        delta: {
                            role: choice.message.role,
                            content: choice.message.content,
                        },
                        finish_reason: choice.finish_reason,
                    },
                ],
            };
            yield chunk;
        }
    }

    // Method to get available models - we can implement this later if needed
    async getAvailableModels(): Promise<OpenRouterModel[]> {
        // For now, return some popular models
        return [
            {
                id: "openai/gpt-4o",
                name: "GPT-4o",
                description: "OpenAI GPT-4o model",
            },
            {
                id: "openai/gpt-4o-mini",
                name: "GPT-4o Mini",
                description: "OpenAI GPT-4o Mini model",
            },
            {
                id: "anthropic/claude-3.5-sonnet",
                name: "Claude 3.5 Sonnet",
                description: "Anthropic Claude 3.5 Sonnet model",
            },
            {
                id: "google/gemini-pro-1.5",
                name: "Gemini Pro 1.5",
                description: "Google Gemini Pro 1.5 model",
            },
        ];
    }
}

export const openRouterService = new OpenRouterService();
