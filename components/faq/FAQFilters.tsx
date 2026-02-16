"use client";

import { useState } from "react";

const categories = [
    { id: "all", name: "All", icon: "grid_view" },
    { id: "shipping", name: "Shipping", icon: "local_shipping" },
    { id: "returns", name: "Returns", icon: "assignment_return" },
    { id: "product", name: "Product", icon: "checkroom" },
    { id: "care", name: "Care", icon: "water_drop" },
];

export default function FAQFilters() {
    const [activeRange, setActiveRange] = useState("all");

    return (
        <div className="w-full max-w-[960px] px-4 -mt-8 relative z-30 mb-12">
            <div className="bg-white dark:bg-surface-dark border border-neutral-200 dark:border-white/10 p-2 rounded-xl shadow-2xl flex overflow-x-auto no-scrollbar gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveRange(cat.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all shrink-0 hover:scale-[1.02] ${activeRange === cat.id
                                ? "bg-primary text-white"
                                : "bg-transparent hover:bg-neutral-100 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400 dark:hover:text-white"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {cat.icon}
                        </span>
                        <span
                            className={`text-sm font-medium uppercase tracking-wide ${activeRange === cat.id ? "font-bold" : ""
                                }`}
                        >
                            {cat.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
