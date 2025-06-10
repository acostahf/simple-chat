"use client";

import React from "react";
import { Plus, Search, Menu, X } from "lucide-react";
import { ConversationList } from "./ConversationList";
import { Button } from "../../ui/components/Button";
import { Input } from "../../ui/components/Input";
import { Conversation } from "../types/conversation.types";
import { cn } from "../../../lib/utils";

interface ConversationSidebarProps {
    conversations: Conversation[];
    currentConversationId?: string;
    onSelectConversation: (conversationId: string) => void;
    onNewConversation: () => void;
    onDeleteConversation: (conversationId: string) => void;
    onRenameConversation: (
        conversationId: string,
        newTitle: string
    ) => void;
    isLoading?: boolean;
    isOpen?: boolean;
    onToggle?: () => void;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
    conversations,
    currentConversationId,
    onSelectConversation,
    onNewConversation,
    onDeleteConversation,
    onRenameConversation,
    isLoading = false,
    isOpen = true,
    onToggle,
}) => {
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredConversations = React.useMemo(() => {
        if (!searchQuery.trim()) return conversations;

        return conversations.filter((conversation) =>
            conversation.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [conversations, searchQuery]);

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && onToggle && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Conversations
                    </h2>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={onNewConversation}
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            New Chat
                        </Button>

                        {onToggle && (
                            <button
                                onClick={onToggle}
                                className="lg:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="relative">
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

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    <ConversationList
                        conversations={filteredConversations}
                        currentConversationId={currentConversationId}
                        onSelectConversation={onSelectConversation}
                        onDeleteConversation={onDeleteConversation}
                        onRenameConversation={onRenameConversation}
                        isLoading={isLoading}
                    />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                        <p>T3 Chat Clone</p>
                        <p className="mt-1">
                            {conversations.length} conversation
                            {conversations.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile toggle button */}
            {!isOpen && onToggle && (
                <button
                    onClick={onToggle}
                    className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg"
                >
                    <Menu className="h-4 w-4" />
                </button>
            )}
        </>
    );
};

export { ConversationSidebar };
