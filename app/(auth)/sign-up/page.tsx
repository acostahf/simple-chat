import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Join thousands of users chatting with AI
                    </p>
                </div>

                <div className="flex justify-center">
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "mx-auto",
                                card: "shadow-lg border border-slate-200 dark:border-slate-700",
                            },
                        }}
                        redirectUrl="/dashboard"
                    />
                </div>
            </div>
        </div>
    );
}
