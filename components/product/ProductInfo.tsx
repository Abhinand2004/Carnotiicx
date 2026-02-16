"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductInfo({ product }: { product: any }) {
    const [selectedSize, setSelectedSize] = useState("L");
    const { addItem } = useCart();

    if (!product) return null;

    const discountedPrice = product.discountPercentage > 0
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;

    const handleAddToCart = () => {
        addItem({
            id: product._id,
            name: product.productName,
            price: discountedPrice,
            image: Array.isArray(product.productImage) ? product.productImage[0] : product.productImage,
            size: selectedSize,
            quantity: 1
        });
        // Optional: show a toast or feedback
    };

    const handleWhatsAppBuy = () => {
        const phoneNumber = "8848565513";
        const productImage = Array.isArray(product.productImage) ? product.productImage[0] : product.productImage;
        const message = `*Buy Request from Carnotix*%0A%0A*Product:* ${product.productName}%0A*Size:* ${selectedSize}%0A*Price:* $${discountedPrice.toFixed(2)}%0A*Reference:* ${productImage}`;

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <div className="flex flex-col h-full sticky top-24">
            {/* Title & Price */}
            <div className="border-b border-white/10 pb-6 mb-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight">
                        {product.productName}
                    </h1>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">favorite</span>
                    </button>
                </div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
                    {product.type} Series Collection
                </p>
                <div className="flex items-end justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-primary">${discountedPrice.toFixed(2)}</h2>
                        {product.discountPercentage > 0 && (
                            <span className="text-lg text-gray-500 line-through font-medium">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex text-primary text-sm">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span
                                    key={i}
                                    className="material-symbols-outlined text-[18px] filled"
                                    style={{ fontVariationSettings: i <= Math.round(product.rating || 0) ? "'FILL' 1" : "'FILL' 0" }}
                                >
                                    {i <= Math.round(product.rating || 0) ? 'star' : 'star_outline'}
                                </span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-400 underline decoration-gray-600 underline-offset-4 cursor-pointer hover:text-white transition-colors">
                            {product.numReviews || 0} Reviews
                        </span>
                    </div>
                </div>
            </div>

            {/* Selectors */}
            <div className="mb-8 space-y-6">
                {/* Size */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold uppercase tracking-wider text-gray-300">
                            Select Size
                        </span>
                        <button className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
                            <span className="material-symbols-outlined text-[14px]">
                                straighten
                            </span>{" "}
                            Size Guide
                        </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                disabled={size === "XXL"}
                                className={`h-12 border rounded text-sm font-bold transition-all ${size === "XXL"
                                    ? "border-white/5 bg-surface-dark text-gray-600 cursor-not-allowed opacity-50"
                                    : selectedSize === size
                                        ? "border-2 border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(234,42,51,0.3)]"
                                        : "border-white/10 bg-surface-dark hover:border-gray-500 text-gray-300"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <p className="mt-2 text-xs text-primary font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">bolt</span>{" "}
                        Selling fast! Only a few left in stock.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-3 mb-8">
                <button
                    onClick={handleWhatsAppBuy}
                    className="w-full h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold uppercase tracking-widest text-lg rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>Buy Request</span>
                </button>
                <button
                    onClick={handleAddToCart}
                    className="w-full h-14 bg-primary hover:bg-red-600 text-white font-extrabold uppercase tracking-widest text-lg rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                    <span>Add to Cart</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        shopping_bag
                    </span>
                </button>
            </div>

            {/* Details Accordion */}
            <div className="border-t border-white/10">
                <details className="group py-4 border-b border-white/10 cursor-pointer" open>
                    <summary className="flex items-center justify-between font-bold uppercase text-sm tracking-wider list-none text-gray-300 group-hover:text-white transition-colors">
                        Description
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                            expand_more
                        </span>
                    </summary>
                    <div className="pt-4 text-gray-400 text-sm leading-relaxed">
                        <p>{product.description}</p>
                        <div className="mt-4">
                            <h4 className="font-bold text-white mb-2 uppercase text-xs">Available Colors:</h4>
                            <div className="flex gap-2">
                                {Array.isArray(product.color) ? product.color.map((c: string) => (
                                    <span key={c} className="px-3 py-1 bg-surface-dark border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {c}
                                    </span>
                                )) : product.color}
                            </div>
                        </div>
                    </div>
                </details>
                <details className="group py-4 border-b border-white/10 cursor-pointer">
                    <summary className="flex items-center justify-between font-bold uppercase text-sm tracking-wider list-none text-gray-300 group-hover:text-white transition-colors">
                        Shipping & Returns
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                            expand_more
                        </span>
                    </summary>
                    <div className="pt-4 text-gray-400 text-sm leading-relaxed">
                        <p>
                            Free standard shipping on orders over $150. Returns accepted
                            within 30 days of delivery. Items must be unworn and in original
                            packaging.
                        </p>
                    </div>
                </details>
            </div>
        </div>
    );
}
