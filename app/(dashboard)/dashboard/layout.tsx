"use client";

import { useUser } from "@clerk/nextjs";
import { MessageCircle, Settings, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

function DashboardContent({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const router = useRouter();
    const createConversation = useMutation(
        api.conversations.createConversation
    );

    const handleNewChat = async () => {
        try {
            await createConversation({
                title: "New Chat",
                model: "openai/gpt-4o",
            });
            // Refresh the page to show the new conversation
            router.refresh();
        } catch (error) {
            console.error("Failed to create conversation:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            Simple Chat
                        </span>
                    </div>

                    <button
                        onClick={handleNewChat}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        New Chat
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search your threads..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Conversation History */}
                <div className="flex-1 overflow-y-auto">
                    {/* Pinned Section */}
                    <div className="p-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                            <span>📌</span>
                            <span>Pinned</span>
                        </div>
                        {/* Placeholder pinned conversations */}
                        <div className="space-y-1">
                            <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    Mobile App Idea for Pokemon...
                                </div>
                            </div>
                            <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    grammar check
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Today Section */}
                    <div className="p-4">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                            Today
                        </div>
                        <div className="space-y-1">
                            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-l-2 border-purple-500 cursor-pointer">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    Building a Modern Chat App...
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Last 7 Days Section */}
                    <div className="p-4">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                            Last 7 Days
                        </div>
                        <div className="space-y-1">
                            <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    Safari Login Issue with Supab...
                                </div>
                            </div>
                            <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    Tailwind/Next.js Max Height w...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Profile & Settings */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {user?.firstName?.[0] || "U"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {user?.firstName || "User"}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Pro
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/settings"
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">{children}</div>
        </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Authenticated>
                <DashboardContent>{children}</DashboardContent>
            </Authenticated>
            <Unauthenticated>
                {/* Redirect to sign-in if not authenticated */}
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Please sign in
                        </h1>
                        <Link
                            href="/sign-in"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </Unauthenticated>
            <AuthLoading>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
                </div>
            </AuthLoading>
        </>
    );
}
