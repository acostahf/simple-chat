"use client";

export interface User {
    id: string;
    clerkId: string;
    email: string;
    name: string;
    preferences: UserPreferences;
}

export interface UserPreferences {
    theme: "light" | "dark";
    defaultModel: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isSignedIn: boolean;
}

export interface SignInFormData {
    email: string;
    password: string;
}

export interface SignUpFormData {
    email: string;
    password: string;
    name: string;
}
