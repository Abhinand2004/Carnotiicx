"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserToken } from "@/lib/api";

function MobileNavContent() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoggedIn(!!getUserToken());
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("search", searchQuery.trim());
            params.delete("page");
            router.push(`/?${params.toString()}#shop`);
            setIsOpen(false);
        }
    };

    const links = [
        { name: "Shop Gear", href: "/#shop", icon: "shopping_bag" },
        { name: "Collections", href: "#", icon: "grid_view" },
        { name: "About Story", href: "#", icon: "info" },
        { name: "Help Center (FAQ)", href: "/faq", icon: "help" },
        { name: "Size Guide", href: "/size-guide", icon: "straighten" },
        { name: "Contact Us", href: "/contact", icon: "mail" },
    ];

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-[70] p-2 text-white hover:text-primary transition-all active:scale-95 flex items-center justify-center"
                aria-label="Toggle menu"
            >
                <span className="material-symbols-outlined text-3xl transition-transform duration-300">
                    {isOpen ? "close" : "menu"}
                </span>
            </button>

            <div
                className={`fixed inset-0 bg-black z-50 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setIsOpen(false)}
            />

            <div
                className={`fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-black border-l border-white/5 z-60 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col h-full pt-24 px-6 pb-10">
                    <form onSubmit={handleSearch} className="mb-10 relative group">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find gear..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-5 pr-12 text-sm text-white focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder-gray-500 transition-all outline-none"
                        />
                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined uppercase">search</span>
                        </button>
                    </form>

                    <nav className="flex flex-col gap-2">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">Navigation</p>
                        {links.map((item, idx) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center gap-4 py-3.5 px-3 rounded-xl hover:bg-white/5 transition-all"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    transitionDelay: isOpen ? `${idx * 50}ms` : '0ms',
                                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                                    opacity: isOpen ? 1 : 0
                                }}
                            >
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-2xl">
                                    {item.icon}
                                </span>
                                <span className="text-base font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-widest leading-none pt-0.5">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-8 border-t border-white/5">
                        <Link
                            href={isLoggedIn ? "/profile" : "/login"}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between group p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-primary/30 transition-all active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-3xl text-primary">
                                    {isLoggedIn ? "garage" : "account_circle"}
                                </span>
                                <div className="text-left">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{isLoggedIn ? "Welcome back" : "Guest Mode"}</p>
                                    <p className="text-base font-black uppercase text-white tracking-widest">{isLoggedIn ? "My Garage" : "Login / Join"}</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                arrow_forward_ios
                            </span>
                        </Link>

                        <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-8">
                            © Carnottix MOTORSPORT 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MobileNav() {
    return (
        <Suspense fallback={<div className="p-2 w-10 h-10"></div>}>
            <MobileNavContent />
        </Suspense>
    );
}
