import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getConversations = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user) return [];

        return await ctx.db
            .query("conversations")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .order("desc")
            .collect();
    },
});

export const createConversation = mutation({
    args: {
        title: v.string(),
        model: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (!user) throw new Error("User not found");

        const now = Date.now();
        return await ctx.db.insert("conversations", {
            userId: user._id,
            title: args.title,
            model: args.model,
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const updateConversation = mutation({
    args: {
        id: v.id("conversations"),
        title: v.optional(v.string()),
        model: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const conversation = await ctx.db.get(args.id);
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

        const updates: any = { updatedAt: Date.now() };
        if (args.title) updates.title = args.title;
        if (args.model) updates.model = args.model;

        await ctx.db.patch(args.id, updates);
    },
});

export const deleteConversation = mutation({
    args: {
        id: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const conversation = await ctx.db.get(args.id);
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

        // Delete all messages in the conversation
        const messages = await ctx.db
            .query("messages")
            .withIndex("by_conversation", (q) =>
                q.eq("conversationId", args.id)
            )
            .collect();

        for (const message of messages) {
            await ctx.db.delete(message._id);
        }

        // Delete the conversation
        await ctx.db.delete(args.id);
    },
});
