"use client";

import React from "react";
import { cn } from "../../../lib/utils";

interface LoadingProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({
    className,
    size = "md",
    text,
}) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div className="flex flex-col items-center space-y-2">
                <div
                    className={cn(
                        "animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 dark:border-slate-600 dark:border-t-slate-100",
                        sizeClasses[size]
                    )}
                />
                {text && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
};

export { Loading };
