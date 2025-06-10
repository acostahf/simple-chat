import Link from "next/link";
import {
    MessageCircle,
    Zap,
    Shield,
    Globe,
    ArrowRight,
    Github,
} from "lucide-react";
import { Button } from "../features/ui/components/Button";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                Simple Chat
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="https://github.com"
                                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="/sign-in">
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Simple Chat
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
                        Experience the power of GPT-4, Claude, Gemini, and
                        more in one beautiful interface. Built with modern
                        web technologies for the best chat experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/sign-up">
                            <Button
                                size="lg"
                                className="flex items-center gap-2"
                            >
                                Start Chatting
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg">
                                Try Demo
                            </Button>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Multiple AI Models
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Access GPT-4, Claude 3.5, Gemini Pro, and
                                more models in one place
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Secure & Private
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Your conversations are encrypted and synced
                                securely across devices
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Browser Friendly
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Works perfectly on all modern browsers with
                                responsive design
                            </p>
                        </div>
                    </div>

                    {/* Model Showcase */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 mb-20">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Supported AI Models
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                {
                                    name: "GPT-4 Omni",
                                    provider: "OpenAI",
                                    color: "bg-green-500",
                                },
                                {
                                    name: "Claude 3.5 Sonnet",
                                    provider: "Anthropic",
                                    color: "bg-orange-500",
                                },
                                {
                                    name: "Gemini Pro 1.5",
                                    provider: "Google",
                                    color: "bg-blue-500",
                                },
                                {
                                    name: "Llama 3.1 70B",
                                    provider: "Meta",
                                    color: "bg-purple-500",
                                },
                            ].map((model) => (
                                <div
                                    key={model.name}
                                    className="text-center"
                                >
                                    <div
                                        className={`w-3 h-3 ${model.color} rounded-full mx-auto mb-2`}
                                    />
                                    <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                                        {model.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {model.provider}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Ready to start chatting?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            Join thousands of users already using Simple
                            Chat for their AI conversations.
                        </p>
                        <Link href="/sign-up">
                            <Button
                                size="lg"
                                className="flex items-center gap-2 mx-auto"
                            >
                                Get Started for Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-slate-600 dark:text-slate-400">
                        <p>
                            &copy; 2024 Simple Chat. Built for the modern
                            world.
                        </p>
                        <p className="mt-2 text-sm">
                            Made with Next.js, TypeScript, Tailwind CSS,
                            Convex, and Clerk Auth
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
