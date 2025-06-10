"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User, Shield, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
    const { isLoaded, isSignedIn, signOut } = useAuth();
    const { user } = useUser();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            redirect("/sign-in");
        }
    }, [isLoaded, isSignedIn]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!isSignedIn) {
        return null; // Will redirect
    }

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Manage your account and preferences
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Account Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Account
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                                    {user?.firstName?.[0] ||
                                        user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ||
                                        "U"}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                        {user?.fullName || "User"}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {
                                            user?.emailAddresses?.[0]
                                                ?.emailAddress
                                        }
                                    </p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 mt-1">
                                        Pro
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Appearance Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Palette className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Appearance
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Theme
                                </label>
                                <div className="mt-2 grid grid-cols-3 gap-3">
                                    <button className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Light
                                        </div>
                                    </button>
                                    <button className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Dark
                                        </div>
                                    </button>
                                    <button className="p-3 border border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                            System
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Notifications
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Email notifications
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Receive email updates about your
                                        conversations
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-gray-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform translate-x-1" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Push notifications
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Get notified about important
                                        updates
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform translate-x-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Privacy & Security Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Privacy & Security
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Data retention
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        How long to keep your conversation
                                        history
                                    </div>
                                </div>
                                <select className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                    <option>30 days</option>
                                    <option>90 days</option>
                                    <option>1 year</option>
                                    <option>Forever</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Analytics
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Help improve our service with usage
                                        data
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform translate-x-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
