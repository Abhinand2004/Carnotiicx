"use client";

import { useState } from "react";

export default function SizeSpecs() {
    const [unit, setUnit] = useState<"imperial" | "metric">("metric");

    return (
        <section className="px-6 py-16 lg:px-40">
            <div className="mx-auto max-w-5xl flex flex-col">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div>
                        <h2 className="text-white text-3xl font-bold uppercase tracking-tight">
                            Technical Specifications
                        </h2>
                        <p className="text-text-muted mt-2">
                            Measurements taken flat. Allow +/- 1cm tolerance.
                        </p>
                    </div>
                    {/* Segmented Button */}
                    <div className="flex h-12 items-center justify-center rounded-lg bg-card-dark border border-border-dark p-1">
                        <label className="group flex cursor-pointer h-full items-center justify-center overflow-hidden rounded px-4 transition-all has-[:checked]:bg-[#331a1b] has-[:checked]:text-white text-text-muted hover:text-white">
                            <span className="text-xs font-bold tracking-wider">
                                IMPERIAL (IN)
                            </span>
                            <input
                                className="hidden"
                                name="units"
                                type="radio"
                                value="imperial"
                                checked={unit === "imperial"}
                                onChange={() => setUnit("imperial")}
                            />
                        </label>
                        <label className="group flex cursor-pointer h-full items-center justify-center overflow-hidden rounded px-4 transition-all has-[:checked]:bg-[#331a1b] has-[:checked]:text-white text-text-muted hover:text-white">
                            <span className="text-xs font-bold tracking-wider">
                                METRIC (CM)
                            </span>
                            <input
                                className="hidden"
                                name="units"
                                type="radio"
                                value="metric"
                                checked={unit === "metric"}
                                onChange={() => setUnit("metric")}
                            />
                        </label>
                    </div>
                </div>
                {/* Table */}
                <div className="w-full overflow-x-auto rounded-lg border border-border-dark bg-card-dark shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#2c1617] border-b border-primary/30">
                                <th className="p-4 text-xs font-bold text-white uppercase tracking-wider w-24">
                                    Size
                                </th>
                                <th className="p-4 text-xs font-bold text-white uppercase tracking-wider">
                                    Chest Width
                                </th>
                                <th className="p-4 text-xs font-bold text-white uppercase tracking-wider">
                                    Body Length
                                </th>
                                <th className="p-4 text-xs font-bold text-white uppercase tracking-wider">
                                    Shoulder
                                </th>
                                <th className="p-4 text-xs font-bold text-white uppercase tracking-wider">
                                    Sleeve
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-dark">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <tr
                                    key={size}
                                    className="group hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4 font-bold text-white">{size}</td>
                                    <td className="p-4 text-text-muted font-mono group-hover:text-primary transition-colors">
                                        54
                                    </td>
                                    <td className="p-4 text-text-muted font-mono group-hover:text-primary transition-colors">
                                        70
                                    </td>
                                    <td className="p-4 text-text-muted font-mono group-hover:text-primary transition-colors">
                                        50
                                    </td>
                                    <td className="p-4 text-text-muted font-mono group-hover:text-primary transition-colors">
                                        22
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
