import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        return user;
    },
});

export const syncUser = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        // Check if user already exists
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", identity.subject)
            )
            .unique();

        if (existingUser) return existingUser._id;

        // Create new user
        const userId = await ctx.db.insert("users", {
            clerkId: identity.subject,
            email: identity.email ?? "",
            name: identity.name ?? identity.email ?? "User",
            preferences: {
                theme: "light",
                defaultModel: "gpt-4",
            },
        });

        return userId;
    },
});

export const createUser = mutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (existingUser) return existingUser._id;

        return await ctx.db.insert("users", {
            ...args,
            preferences: {
                theme: "light",
                defaultModel: "gpt-4",
            },
        });
    },
});

export const updateUserPreferences = mutation({
    args: {
        theme: v.optional(v.union(v.literal("light"), v.literal("dark"))),
        defaultModel: v.optional(v.string()),
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

        await ctx.db.patch(user._id, {
            preferences: {
                ...user.preferences,
                ...args,
            },
        });
    },
});

export const getUserById = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.userId);
    },
});

export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        return await ctx.db.query("users").collect();
    },
});
