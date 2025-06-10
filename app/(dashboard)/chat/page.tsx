"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChatInterface } from "../../../features/chat/components/ChatInterface";
import { ConversationSidebar } from "../../../features/conversations/components/ConversationSidebar";
import { useConversations } from "../../../features/conversations/hooks/useConversations";
import { useChat } from "../../../features/chat/hooks/useChat";
import { DEFAULT_MODEL } from "../../../lib/constants";

export default function ChatPage() {
    const router = useRouter();
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
    } = useChat();

    const handleNewConversation = async () => {
        try {
            const newConversationId = await createConversation({
                title: "New Conversation",
                model: selectedModel || DEFAULT_MODEL,
            });

            // Navigate to new conversation
            router.push(`/dashboard/chat/${newConversationId}`);
        } catch (error) {
            console.error("Failed to create conversation:", error);
        }
    };

    const handleSelectConversation = (id: string) => {
        router.push(`/dashboard/chat/${id}`);
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

    const handleSendMessage = async (message: string) => {
        // If no conversation exists, create one first
        if (!conversations.length) {
            await handleNewConversation();
        }
        await sendMessage(message);
    };

    return (
        <div className="h-screen flex bg-slate-50 dark:bg-slate-900">
            <ConversationSidebar
                conversations={conversations}
                currentConversationId={undefined}
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
                    conversationId={undefined}
                    messages={messages}
                    isLoading={isLoading}
                    isStreaming={isStreaming}
                    selectedModel={selectedModel || DEFAULT_MODEL}
                    onSendMessage={handleSendMessage}
                    onModelChange={setSelectedModel}
                    streamingMessage={streamingMessage}
                />
            </div>
        </div>
    );
}
