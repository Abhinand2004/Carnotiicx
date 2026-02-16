"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi, setUserToken } from "@/lib/api";

export default function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    });
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("password", formData.password);
            if (profilePhoto) {
                data.append("profilePhoto", profilePhoto);
            }

            const response = await authApi.register(data);
            if (response.success) {
                setUserToken(response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                router.push("/");
            } else {
                const errorMessage = response.errors
                    ? response.errors.map((err: any) => err.msg).join(", ")
                    : response.message || "Registration failed";
                setError(errorMessage);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:col-span-7 bg-surface-dark border border-border-dark rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden h-full min-h-[700px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 max-w-lg mx-auto w-full">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2 text-white">
                        Create Account
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">Already a member?</span>
                        <Link
                            href="/login"
                            className="text-primary font-bold hover:text-white transition-colors uppercase tracking-wider"
                        >
                            Log In
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center gap-2 mb-8">
                    <div className="h-1 flex-1 bg-primary rounded-full"></div>
                    <div className="h-1 flex-1 bg-border-dark rounded-full"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">
                        Step 1 of 2
                    </span>
                </div>

                {/* Profile Photo Upload */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="relative group cursor-pointer" onClick={() => document.getElementById('profilePhoto')?.click()}>
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-border-dark group-hover:border-primary transition-colors overflow-hidden flex items-center justify-center bg-background-dark">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-gray-600 text-4xl">add_a_photo</span>
                            )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-white text-sm">upload</span>
                        </div>
                    </div>
                    <input
                        type="file"
                        id="profilePhoto"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-3">Profile Photo (Optional)</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                className="text-xs font-bold uppercase tracking-wider text-gray-400"
                                htmlFor="firstName"
                            >
                                First Name
                            </label>
                            <input
                                className="w-full h-12 bg-background-dark border border-border-dark rounded px-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-700"
                                id="firstName"
                                placeholder="ALEX"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-xs font-bold uppercase tracking-wider text-gray-400"
                                htmlFor="lastName"
                            >
                                Last Name
                            </label>
                            <input
                                className="w-full h-12 bg-background-dark border border-border-dark rounded px-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-700"
                                id="lastName"
                                placeholder="KNIGHT"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-xs font-bold uppercase tracking-wider text-gray-400"
                            htmlFor="email"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]">
                                mail
                            </span>
                            <input
                                className="w-full h-12 bg-background-dark border border-border-dark rounded pl-11 pr-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-700"
                                id="email"
                                placeholder="ALEX@EXAMPLE.COM"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label
                                className="text-xs font-bold uppercase tracking-wider text-gray-400"
                                htmlFor="phone"
                            >
                                Phone Number
                            </label>
                            <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wider bg-[#1e1e1e] px-2 py-0.5 rounded border border-border-dark">
                                Optional
                            </span>
                        </div>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]">
                                smartphone
                            </span>
                            <input
                                className="w-full h-12 bg-background-dark border border-border-dark rounded pl-11 pr-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-700"
                                id="phone"
                                placeholder="+1 (555) 000-0000"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">
                            Add your number for exclusive SMS drop alerts.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-xs font-bold uppercase tracking-wider text-gray-400"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]">
                                lock
                            </span>
                            <input
                                className="w-full h-12 bg-background-dark border border-border-dark rounded pl-11 pr-12 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-700"
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button
                        className="w-full h-14 bg-primary hover:bg-red-600 text-white font-extrabold uppercase tracking-widest text-sm rounded-lg shadow-[0_4px_14px_0_rgba(234,42,51,0.39)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-4 disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        <span>{loading ? "Igniting..." : "Create Account"}</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </button>
                    <p className="text-[10px] text-center text-gray-600 mt-4">
                        By creating an account, you agree to our{" "}
                        <Link href="#" className="underline hover:text-gray-400">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline hover:text-gray-400">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </form>
            </div>
        </div>
    );
}
