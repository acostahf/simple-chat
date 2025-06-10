import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
        preferences: v.object({
            theme: v.union(v.literal("light"), v.literal("dark")),
            defaultModel: v.string(),
        }),
    }).index("by_clerk_id", ["clerkId"]),

    conversations: defineTable({
        userId: v.id("users"),
        title: v.string(),
        model: v.string(),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_user", ["userId"]),

    messages: defineTable({
        conversationId: v.id("conversations"),
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
        timestamp: v.number(),
    }).index("by_conversation", ["conversationId"]),
});
