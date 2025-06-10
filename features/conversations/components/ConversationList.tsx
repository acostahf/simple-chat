"use client";

import React from "react";
import {
    MessageCircle,
    Trash2,
    Edit2,
    MoreHorizontal,
} from "lucide-react";
import { Conversation } from "../types/conversation.types";
import { formatDate, truncateText, cn } from "../../../lib/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface ConversationListProps {
    conversations: Conversation[];
    currentConversationId?: string;
    onSelectConversation: (conversationId: string) => void;
    onDeleteConversation: (conversationId: string) => void;
    onRenameConversation: (
        conversationId: string,
        newTitle: string
    ) => void;
    isLoading?: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({
    conversations,
    currentConversationId,
    onSelectConversation,
    onDeleteConversation,
    onRenameConversation,
    isLoading = false,
}) => {
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [editTitle, setEditTitle] = React.useState("");

    const handleStartEdit = (conversation: Conversation) => {
        setEditingId(conversation.id);
        setEditTitle(conversation.title);
    };

    const handleSaveEdit = () => {
        if (editingId && editTitle.trim()) {
            onRenameConversation(editingId, editTitle.trim());
        }
        setEditingId(null);
        setEditTitle("");
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSaveEdit();
        } else if (e.key === "Escape") {
            handleCancelEdit();
        }
    };

    if (isLoading) {
        return (
            <div className="p-4">
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (conversations.length === 0) {
        return (
            <div className="p-4 text-center">
                <MessageCircle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    No conversations yet
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Start a new chat to see it here
                </p>
            </div>
        );
    }

    return (
        <div className="p-2">
            <div className="space-y-1">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className={cn(
                            "group relative flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors",
                            currentConversationId === conversation.id
                                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                        onClick={() =>
                            onSelectConversation(conversation.id)
                        }
                    >
                        <MessageCircle className="h-4 w-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                            {editingId === conversation.id ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                    onBlur={handleSaveEdit}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent border-none outline-none text-sm font-medium text-slate-900 dark:text-slate-100"
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                        {truncateText(
                                            conversation.title,
                                            30
                                        )}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {formatDate(
                                                conversation.updatedAt
                                            )}
                                        </span>
                                        <span className="text-xs text-slate-400 dark:text-slate-500">
                                            {conversation.model
                                                .split("/")
                                                .pop()}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button
                                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    className="min-w-[160px] bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg p-1 z-50"
                                    sideOffset={5}
                                >
                                    <DropdownMenu.Item
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md cursor-pointer outline-none"
                                        onClick={() =>
                                            handleStartEdit(conversation)
                                        }
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        Rename
                                    </DropdownMenu.Item>

                                    <DropdownMenu.Item
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md cursor-pointer outline-none"
                                        onClick={() =>
                                            onDeleteConversation(
                                                conversation.id
                                            )
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { ConversationList };
