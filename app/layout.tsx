import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "../lib/convex-client-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Simple Chat - Modern AI Chat Application",
    description:
        "A modern AI chat application built with Next.js, TypeScript, Tailwind CSS, Convex, and Clerk Auth. Chat with multiple AI models including GPT-4, Claude, and Gemini.",
    keywords: [
        "AI chat",
        "GPT-4",
        "Claude",
        "Gemini",
        "Next.js",
        "TypeScript",
        "Convex",
        "Clerk",
    ],
    authors: [{ name: "Simple Chat Team" }],
    openGraph: {
        title: "Simple Chat",
        description:
            "Modern AI chat application with multiple model support",
        type: "website",
        url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
    twitter: {
        card: "summary_large_image",
        title: "Simple Chat",
        description:
            "Modern AI chat application with multiple model support",
    },
    robots: "index, follow",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ClerkProvider
                    publishableKey={
                        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
                    }
                >
                    <ConvexClientProvider>
                        <div className="min-h-screen bg-white dark:bg-slate-900">
                            {children}
                        </div>
                    </ConvexClientProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
