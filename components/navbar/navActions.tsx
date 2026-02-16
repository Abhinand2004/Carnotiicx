"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartIcon from "./cartIcon";
import { getUserToken } from "@/lib/api";

export default function NavActions() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!getUserToken());
    }, []);

    return (
        <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden md:flex items-center gap-4">
                <Link
                    href={isLoggedIn ? "/profile" : "/login"}
                    className="text-sm font-black uppercase tracking-widest text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    {isLoggedIn ? "Garage" : "Login"}
                </Link>
            </div>
            <div className="h-4 w-[1px] bg-gray-700 hidden md:block" />
            <CartIcon />
        </div>
    );
}
