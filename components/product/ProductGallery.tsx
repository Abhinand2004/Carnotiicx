"use client";

import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-[3/4] bg-surface-dark flex items-center justify-center rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-gray-700 text-6xl">image_not_supported</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 h-full">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] no-scrollbar shrink-0 pb-2 lg:pb-0">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`size-20 lg:size-24 rounded-lg overflow-hidden border shrink-0 transition-all ${activeImage === index
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-white/10 opacity-60 hover:opacity-100 hover:border-gray-400"
                            }`}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${img}')` }}
                            role="img"
                            aria-label={`Product image ${index + 1}`}
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative group rounded-xl overflow-hidden bg-surface-dark border border-white/5 aspect-[3/4] lg:aspect-auto lg:h-[700px]">
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider z-10">
                    High Performance
                </div>
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${images[activeImage]}')` }}
                    role="img"
                    aria-label="Active product image"
                />
                {/* Zoom Icon Overlay */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="material-symbols-outlined">zoom_in</span>
                </div>
            </div>
        </div>
    );
}
