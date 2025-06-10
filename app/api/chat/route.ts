import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1";

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get request body
        const body = await request.json();
        const { model, messages, temperature, max_tokens } = body;

        // Validate required fields
        if (!model || !messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Missing required fields: model and messages" },
                { status: 400 }
            );
        }

        // Get OpenRouter API key from server environment
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            console.error("OPENROUTER_API_KEY not configured");
            return NextResponse.json(
                { error: "OpenRouter API not configured" },
                { status: 500 }
            );
        }

        // Make request to OpenRouter
        const response = await fetch(
            `${OPENROUTER_API_URL}/chat/completions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                    "HTTP-Referer":
                        process.env.NEXT_PUBLIC_APP_URL ||
                        "http://localhost:3000",
                    "X-Title": "Simple Chat",
                },
                body: JSON.stringify({
                    model,
                    messages,
                    temperature: temperature || 0.7,
                    max_tokens: max_tokens || 2048,
                    stream: false,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(
                "OpenRouter API error:",
                response.status,
                errorText
            );
            return NextResponse.json(
                { error: "Failed to get AI response" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
