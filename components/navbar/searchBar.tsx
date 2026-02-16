"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", query.trim());
      params.delete("page"); // Reset pagination on new search
      router.push(`/?${params.toString()}#shop`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`/?${params.toString()}#shop`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative hidden md:flex items-center"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search gear..."
        className="bg-[#222] border-none rounded-full py-2 pl-4 pr-10 text-sm text-white focus:ring-1 focus:ring-primary placeholder-gray-500 w-64 outline-none"
      />
      <button
        type="submit"
        className="absolute right-3 text-gray-400 hover:text-primary"
      >
        <span className="material-symbols-outlined text-[20px]">search</span>
      </button>
    </form>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={
      <div className="relative hidden md:flex items-center">
        <div className="bg-[#222] rounded-full py-2 pl-4 pr-10 w-64 h-9 animate-pulse"></div>
      </div>
    }>
      <SearchInput />
    </Suspense>
  );
}
