export const OPENROUTER_API_URL = "https://openrouter.ai/api/v1";

export const DEFAULT_MODEL = "anthropic/claude-3.5-sonnet";

export const THEMES = {
    LIGHT: "light" as const,
    DARK: "dark" as const,
};

export const MESSAGE_ROLES = {
    USER: "user" as const,
    ASSISTANT: "assistant" as const,
} as const;

export const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    DASHBOARD: "/dashboard",
    CHAT: "/dashboard/chat",
    HISTORY: "/dashboard/history",
    SETTINGS: "/dashboard/settings",
} as const;
