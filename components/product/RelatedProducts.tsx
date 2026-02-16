"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api, Product } from "@/lib/api";

export default function RelatedProducts({ type, currentId }: { type: string; currentId: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                setLoading(true);
                const response = await api.getProductsByType(type);
                if (response.success) {
                    // Filter out the current product from related products
                    const filtered = response.data.filter(p => p._id !== currentId).slice(0, 4);
                    setProducts(filtered);
                }
            } catch (err) {
                console.error("Error fetching related products:", err);
            } finally {
                setLoading(false);
            }
        };

        if (type) fetchRelated();
    }, [type, currentId]);

    if (loading) {
        return <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    }

    if (products.length === 0) return null;

    return (
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold uppercase tracking-tight">
                    You May Also Like
                </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => {
                    const price = `$${product.price.toFixed(2)}`;
                    const image = Array.isArray(product.productImage) ? product.productImage[0] : product.productImage;

                    return (
                        <Link key={product._id} href={`/product/${product._id}`} className="group cursor-pointer block">
                            <div className="aspect-[3/4] bg-surface-dark rounded-lg overflow-hidden relative mb-4 border border-white/5 transition-colors group-hover:border-primary/50">
                                {product.discountPercentage > 0 && (
                                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10">
                                        {product.discountPercentage}% OFF
                                    </div>
                                )}
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${image}')` }}
                                />
                                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <button className="bg-white text-black text-xs font-bold uppercase px-3 py-2 rounded shadow-lg hover:bg-primary hover:text-white transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <h4 className="font-bold text-sm uppercase tracking-wide mb-1 group-hover:text-primary transition-colors truncate">
                                {product.productName}
                            </h4>
                            <div className="flex items-center gap-2">
                                <p className="text-primary font-bold text-sm">
                                    ${(product.discountPercentage > 0 ? product.price * (1 - product.discountPercentage / 100) : product.price).toFixed(2)}
                                </p>
                                {product.discountPercentage > 0 && (
                                    <p className="text-gray-500 text-xs line-through">{price}</p>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
