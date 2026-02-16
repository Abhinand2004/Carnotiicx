"use client";

export default function SortBar({ title = "New Arrivals" }: { title?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        {title} <span className="text-primary">{"///"}</span>
      </h2>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span>Sort by:</span>
        <select className="bg-transparent border-none text-white font-semibold focus:ring-0 cursor-pointer outline-none">
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
