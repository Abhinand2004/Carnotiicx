"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import SortBar from "./SortBar";
import { api, Product } from "@/lib/api";

function ProductGridContent() {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type");
  const searchFilter = searchParams.get("search");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 9;

  const fetchProducts = async (pageNum: number, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const response = await api.getProducts({
        type: typeFilter || undefined,
        search: searchFilter || undefined,
        page: pageNum,
        limit: limit
      });

      if (response.success) {
        if (isLoadMore) {
          setProducts(prev => [...prev, ...response.data]);
        } else {
          setProducts(response.data);
        }
        setTotalProducts(response.total);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError("Error fetching products");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(1);
    fetchProducts(1, false);
  }, [typeFilter, searchFilter]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, true);
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
        <button
          onClick={() => fetchProducts(1, false)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Retry
        </button>
      </div>
    );
  }

  const hasMore = products.length < totalProducts;

  const getDisplayTitle = () => {
    if (searchFilter) return `Results for: "${searchFilter}"`;
    if (typeFilter) return `${typeFilter} Gear`;
    return "New Arrivals";
  };

  return (
    <>
      <SortBar title={getDisplayTitle()} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.productName}
            price={`₹${(product.discountedPrice || product.price).toFixed(2)}`}
            originalPrice={product.discountPercentage > 0 ? `₹${product.price.toFixed(2)}` : undefined}
            image={Array.isArray(product.productImage) ? product.productImage[0] : product.productImage}
            badge={product.discountPercentage > 0 ? `${product.discountPercentage}% OFF` : undefined}
            type={product.type}
            color={Array.isArray(product.color) ? product.color.join(", ") : product.color}
            description={product.description}
          />
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-24 bg-surface-dark/50 rounded-2xl border border-dashed border-white/10">
          <span className="material-symbols-outlined text-4xl text-gray-700 mb-4">search_off</span>
          <p className="text-gray-400 font-medium">
            {searchFilter
              ? `No results for "${searchFilter}". Try checking your spelling or use general terms.`
              : `No ${typeFilter} products found in our current collection.`}
          </p>
        </div>
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="border border-white/20 hover:border-primary hover:text-primary px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </>
            ) : "Load More Gear"}
          </button>
        </div>
      )}
    </>
  );
}

export default function ProductGrid() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <ProductGridContent />
    </Suspense>
  );
}
