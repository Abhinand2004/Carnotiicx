"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import ReviewsSection from "@/components/product/ReviewsSection";
import { api, Product } from "@/lib/api";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      const response = await api.getProduct(slug);
      if (response.success && response.data) {
        setProduct(response.data);
      } else {
        setError(response.message || "Product not found");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Error loading product details");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-darker flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-surface-darker flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center px-6">
          <h2 className="text-2xl font-bold text-white mb-4">{error || "Product Not Found"}</h2>
          <button
            onClick={() => window.location.href = '/shop'}
            className="bg-primary text-white px-6 py-2 rounded font-bold uppercase text-sm"
          >
            Back to Shop
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-surface-darker min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 py-8">
        <Breadcrumbs productName={product.productName} type={product.type} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <ProductGallery images={Array.isArray(product.productImage) ? product.productImage : [product.productImage]} />
          </div>
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        <ReviewsSection product={product} onReviewAdded={fetchProduct} />
        <RelatedProducts type={product.type} currentId={product._id} />
      </main>
      <Footer />
    </div>
  );
}
