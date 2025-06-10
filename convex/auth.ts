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
