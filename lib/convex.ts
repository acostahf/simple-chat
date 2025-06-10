import { ConvexProvider, ConvexReactClient } from "convex/react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error(
        "Missing NEXT_PUBLIC_CONVEX_URL environment variable.\n" +
            "Set it in your .env.local file.\n" +
            "You can get the URL from https://dashboard.convex.dev"
    );
}

export const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL
);

export { ConvexProvider };
