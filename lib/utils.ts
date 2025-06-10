import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | number): string {
    const d = typeof date === "number" ? new Date(date) : date;

    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const diffInHours = diff / (1000 * 60 * 60);
    const diffInDays = diff / (1000 * 60 * 60 * 24);

    if (diffInHours < 1) {
        return "Just now";
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
        return `${Math.floor(diffInDays)}d ago`;
    } else {
        return d.toLocaleDateString();
    }
}

export function generateTitle(content: string): string {
    // Generate a conversation title from the first message
    const words = content.trim().split(" ").slice(0, 6);
    return (
        words.join(" ") +
        (content.length > words.join(" ").length ? "..." : "")
    );
}

export function truncateText(
    text: string,
    maxLength: number = 50
): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}
