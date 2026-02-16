"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-surface-darker flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        }>
            <CartContent />
        </Suspense>
    );
}

function CartContent() {
    const { cart, removeItem, cartTotal, clearCart } = useCart();

    return (
        <div className="bg-surface-darker min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">Your Bag</h1>
                    {cart.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                            Clear All
                        </button>
                    )}
                </div>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-8 space-y-6">
                            {cart.map((item: any) => (
                                <div
                                    key={`${item.id}-${item.size}`}
                                    className="bg-surface-dark p-4 md:p-6 rounded-xl border border-white/5 flex gap-6 group relative overflow-hidden"
                                >
                                    <div className="size-24 md:size-32 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-white/5">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.id, item.size)}
                                                    className="size-8 rounded-full hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all flex items-center justify-center -mr-2"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">
                                                Size: <span className="text-white">{item.size}</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-4 bg-black/20 rounded-lg border border-white/5 p-1">
                                                <span className="px-3 text-xs font-bold text-gray-500 uppercase tracking-tighter">Qty: {item.quantity}</span>
                                            </div>
                                            <p className="text-xl font-black text-primary italic">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-4">
                            <div className="bg-surface-dark p-6 rounded-xl border border-white/5 sticky top-24">
                                <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">receipt_long</span>
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-white">₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Calculated at WhatsApp</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Tax</span>
                                        <span className="text-white">₹0.00</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold uppercase tracking-widest text-sm text-gray-300">Total</span>
                                        <span className="text-3xl font-black text-white italic">₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        const phoneNumber = "918848565513";
                                        const cartDetails = cart.map((item: any) => `- ${item.name} (${item.size}) x${item.quantity}`).join("%0A");
                                        const message = `*Order Request from Carnottix*%0A%0A*Items:*%0A${cartDetails}%0A%0A*Total:* ₹${cartTotal.toFixed(2)}`;
                                        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
                                    }}
                                    className="w-full py-4 bg-primary hover:bg-red-600 text-white font-black uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                >
                                    Confirm via WhatsApp
                                    <span className="material-symbols-outlined">send</span>
                                </button>

                                <p className="text-[10px] text-gray-500 text-center mt-4 font-bold uppercase tracking-widest leading-relaxed">
                                    Shipping and taxes will be confirmed by our team on WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-24 text-center bg-surface-dark rounded-2xl border border-dashed border-white/10">
                        <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl text-gray-600">shopping_bag</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Your bag is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm font-medium">Looks like you haven't added any high-performance gear yet.</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-red-600 text-white font-black uppercase tracking-widest px-8 py-3 rounded-lg transition-all"
                        >
                            Start Shopping
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
