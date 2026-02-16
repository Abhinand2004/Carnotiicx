"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("carnotix_cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save cart to localStorage on changes
    useEffect(() => {
        localStorage.setItem("carnotix_cart", JSON.stringify(cart));
    }, [cart]);

    const addItem = (newItem: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === newItem.id && item.size === newItem.size
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === newItem.id && item.size === newItem.size
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }

            return [...prevCart, newItem];
        });
    };

    const removeItem = (id: string, size: string) => {
        setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
