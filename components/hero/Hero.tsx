"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function Hero() {
  const [backgroundImage, setBackgroundImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuAk_po-iyyHLclTIJ1Xf244Y-DoqmQJbob9XceXnQcnB9BUKIO2Md49OFX02SzAHN4SFKPd9_Rd5XrJYm2tARWveDMGJRB46c9NU9oOQOvRDI7E9XNSPT8Kkl79kweyzY-8MmLHn1nV5wqocLUYH_UReZ1xZfM872zosgHn8J4lsZxCHE6-hLnbmxN33THQlEiUeeUqxGjiUyCfsrlx5Aio7zsGMz8w1VI5q9GwyBzIxWrecxcDREm2vcUnNpzDFb2NBapMXyxIPnA");

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await api.getHeroSettings();
        if (response.success && response.data?.value) {
          setBackgroundImage(response.data.value);
        }
      } catch (err) {
        console.error("Error fetching hero background:", err);
      }
    };
    fetchBackground();
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/30" />

      {/* Content */}
      <div className="relative h-full flex items-center px-6 lg:px-12">
        <div className="max-w-3xl flex flex-col gap-6 pt-20">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              Est. 2025 /// Motorsport Culture
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic">
            Where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">
              FASHION MEETS .
            </span>
            <br />
            PERFORMANCE.
          </h1>

          <p className="text-gray-300 text-lg md:text-xl font-light max-w-xl border-l-4 border-gray-700 pl-4 py-1">
            Premium automotive apparel engineered for the modern enthusiast.
            From the track to the street.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => {
                const shopSection = document.getElementById("shop");
                shopSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary hover:bg-red-600 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-105 text-white"
            >
              Shop Now
            </button>
            <button className="border border-white/30 hover:border-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all text-white">
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
