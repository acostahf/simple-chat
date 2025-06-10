import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMessages = query({
    args: {
        conversationId: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user || conversation.userId !== user._id) return [];

        return await ctx.db
            .query("messages")
            .withIndex("by_conversation", (q) =>
                q.eq("conversationId", args.conversationId)
            )
            .order("asc")
            .collect();
    },
});

export const createMessage = mutation({
    args: {
        conversationId: v.id("conversations"),
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) throw new Error("Conversation not found");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user || conversation.userId !== user._id) {
            throw new Error("Unauthorized");
        }

        const messageId = await ctx.db.insert("messages", {
            conversationId: args.conversationId,
            role: args.role,
            content: args.content,
            timestamp: Date.now(),
        });

        // Update conversation timestamp
        await ctx.db.patch(args.conversationId, {
            updatedAt: Date.now(),
        });

        return messageId;
    },
});

export const deleteMessage = mutation({
    args: {
        id: v.id("messages"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const message = await ctx.db.get(args.id);
        if (!message) throw new Error("Message not found");

        const conversation = await ctx.db.get(message.conversationId);
        if (!conversation) throw new Error("Conversation not found");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user || conversation.userId !== user._id) {
            throw new Error("Unauthorized");
        }

        await ctx.db.delete(args.id);
    },
});
