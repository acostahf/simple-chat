"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ChatInterface } from "../../../../features/chat/components/ChatInterface";
import { ConversationSidebar } from "../../../../features/conversations/components/ConversationSidebar";
import { useConversations } from "../../../../features/conversations/hooks/useConversations";
import { useChat } from "../../../../features/chat/hooks/useChat";
import { DEFAULT_MODEL } from "../../../../lib/constants";

export default function ChatPage() {
    const params = useParams();
    const conversationId = params.id as string;

    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    const {
        conversations,
        isLoading: conversationsLoading,
        createConversation,
        deleteConversation,
        updateConversation,
    } = useConversations();

    const {
        messages,
        isLoading,
        isStreaming,
        selectedModel,
        streamingMessage,
        sendMessage,
        setSelectedModel,
    } = useChat(conversationId);

    const handleNewConversation = async () => {
        try {
            const newConversationId = await createConversation({
                title: "New Conversation",
                model: selectedModel || DEFAULT_MODEL,
            });

            // Navigate to new conversation
            window.location.href = `/dashboard/chat/${newConversationId}`;
        } catch (error) {
            console.error("Failed to create conversation:", error);
        }
    };

    const handleSelectConversation = (id: string) => {
        window.location.href = `/dashboard/chat/${id}`;
    };

    const handleDeleteConversation = async (id: string) => {
        try {
            await deleteConversation(id);

            // If we deleted the current conversation, redirect to dashboard
            if (id === conversationId) {
                window.location.href = "/dashboard";
            }
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
        <div className="h-screen flex bg-slate-50 dark:bg-slate-900">
            <ConversationSidebar
                conversations={conversations}
                currentConversationId={conversationId}
                onSelectConversation={handleSelectConversation}
                onNewConversation={handleNewConversation}
                onDeleteConversation={handleDeleteConversation}
                onRenameConversation={handleRenameConversation}
                isLoading={conversationsLoading}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className="flex-1 flex flex-col">
                <ChatInterface
                    conversationId={conversationId}
                    messages={messages}
                    isLoading={isLoading}
                    isStreaming={isStreaming}
                    selectedModel={selectedModel || DEFAULT_MODEL}
                    onSendMessage={sendMessage}
                    onModelChange={setSelectedModel}
                    streamingMessage={streamingMessage}
                />
            </div>
        </div>
    );
}
