"use client";

import React from "react";
import { ConversationList } from "../../../features/conversations/components/ConversationList";
import { useConversations } from "../../../features/conversations/hooks/useConversations";
import { Search, MessageCircle } from "lucide-react";
import { Input } from "../../../features/ui/components/Input";

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = React.useState("");

    const {
        conversations,
        isLoading,
        deleteConversation,
        updateConversation,
    } = useConversations();

    const filteredConversations = React.useMemo(() => {
        if (!searchQuery.trim()) return conversations;

        return conversations.filter((conversation) =>
            conversation.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [conversations, searchQuery]);

    const handleSelectConversation = (id: string) => {
        window.location.href = `/dashboard/chat/${id}`;
    };

    const handleDeleteConversation = async (id: string) => {
        try {
            await deleteConversation(id);
        } catch (error) {
            console.error("Failed to delete conversation:", error);
        }
    };

    const handleRenameConversation = async (
        id: string,
        newTitle: string
    ) => {
        try {
            await updateConversation({ id, title: newTitle });
        } catch (error) {
            console.error("Failed to rename conversation:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Chat History
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        View and manage all your conversations
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.target.value)
                            }
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    {isLoading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-slate-600 dark:text-slate-400">
                                Loading conversations...
                            </p>
                        </div>
                    ) : filteredConversations.length === 0 ? (
                        <div className="p-8 text-center">
                            <MessageCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                                {searchQuery
                                    ? "No conversations found"
                                    : "No conversations yet"}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                {searchQuery
                                    ? "Try adjusting your search terms"
                                    : "Start a new chat to see it here"}
                            </p>
                        </div>
                    ) : (
                        <ConversationList
                            conversations={filteredConversations}
                            onSelectConversation={handleSelectConversation}
                            onDeleteConversation={handleDeleteConversation}
                            onRenameConversation={handleRenameConversation}
                            isLoading={isLoading}
                        />
                    )}
                </div>

                {/* Stats */}
                {conversations.length > 0 && (
                    <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        {conversations.length} conversation
                        {conversations.length !== 1 ? "s" : ""} total
                        {searchQuery &&
                            filteredConversations.length !==
                                conversations.length && (
                                <span>
                                    {" "}
                                    • {filteredConversations.length}{" "}
                                    matching your search
                                </span>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
}
