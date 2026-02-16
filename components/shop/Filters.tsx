"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type");

  const handleTypeSelect = (type: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`/?${params.toString()}#shop`);
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-8 p-6 bg-surface-dark rounded-xl border border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold uppercase tracking-wider">Filters</h3>
          {(currentType) && (
            <button
              onClick={() => handleTypeSelect(null)}
              className="text-[10px] font-bold uppercase text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase text-gray-400">Category</h4>
          <div className="space-y-2">
            {[
              { id: "all", label: "All Gear" },
              { id: "car", label: "Cars" },
              { id: "bike", label: "Bikes" },
              { id: "f1", label: "F1" }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id === "all" ? null : type.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-widest border ${(currentType === type.id || (currentType === null && type.id === "all"))
                    ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(234,42,51,0.2)]"
                    : "border-white/5 text-gray-500 hover:border-white/20 hover:text-white bg-black/20"
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase text-gray-400">Size</h4>
          <div className="grid grid-cols-4 gap-2">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                className={`h-8 border rounded text-[10px] font-bold transition-all ${s === "L"
                    ? "bg-primary text-white border-primary"
                    : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Filters() {
  return (
    <Suspense fallback={
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="h-96 bg-surface-dark animate-pulse rounded-xl border border-white/5" />
      </aside>
    }>
      <FiltersContent />
    </Suspense>
  );
}
