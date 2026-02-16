"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi, setUserToken } from "@/lib/api";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await authApi.login({ email, password });
            if (response.success) {
                setUserToken(response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                router.push("/");
            } else {
                const errorMessage = response.errors
                    ? response.errors.map((err: any) => err.msg).join(", ")
                    : response.message || "Login failed";
                setError(errorMessage);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                    {error}
                </div>
            )}
            <label className="flex flex-col gap-2">
                <span className="text-white text-sm font-bold tracking-wide uppercase">
                    Email Address
                </span>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input
                        className="w-full h-14 pl-12 pr-4 bg-input-dark text-white rounded-lg border border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-text-muted/50 transition-all duration-300 ease-out font-medium"
                        placeholder="driver@Carnottix.com"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </label>
            <label className="flex flex-col gap-2">
                <span className="text-white text-sm font-bold tracking-wide uppercase">
                    Password
                </span>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input
                        className="w-full h-14 pl-12 pr-4 bg-input-dark text-white rounded-lg border border-transparent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-text-muted/50 transition-all duration-300 ease-out font-medium"
                        placeholder="••••••••"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <a
                        className="text-xs font-bold text-text-muted hover:text-primary transition-colors uppercase tracking-wide"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
            </label>
            <button
                className="mt-2 w-full h-14 bg-primary hover:bg-red-600 text-white text-base font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50"
                type="submit"
                disabled={loading}
            >
                <span>{loading ? "Igniting..." : "Ignite Engine"}</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                </span>
            </button>
        </form>
    );
}
