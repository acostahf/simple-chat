"use client";

import { ReactNode, useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api } from "../convex/_generated/api";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
        },
    },
});

// User sync component that runs after authentication
function UserSync() {
    const { isSignedIn, isLoaded } = useAuth();
    const syncUser = useMutation(api.users.syncUser);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            syncUser().catch(console.error);
        }
    }, [isLoaded, isSignedIn, syncUser]);

    return null;
}

export default function ConvexClientProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <UserSync />
                {children}
            </ConvexProviderWithClerk>
        </QueryClientProvider>
    );
}
