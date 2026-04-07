"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

const fallbackItems = [
  "TOP DEALS",
  "FREE SHIPPING ON ORDERS OVER 150",
  "NEW DROP: MIDNIGHT RUNNER",
  "LIMITED EDITION",
];

export default function Ticker() {
  const [items, setItems] = useState<string[]>(fallbackItems);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const response = await api.getTickerSettings();
        if (response.success && response.data?.items?.length) {
          setItems(response.data.items);
        }
      } catch (err) {
        console.error("Error fetching ticker settings:", err);
      }
    };

    fetchTicker();
  }, []);

  const scrollingItems = useMemo(() => {
    const baseItems = items.length > 0 ? items : fallbackItems;
    const repeatCount = Math.max(3, Math.ceil(12 / baseItems.length));
    return Array.from({ length: repeatCount }, () => baseItems).flat();
  }, [items]);

  return (
    <div className="bg-primary w-full overflow-hidden py-3 transform -skew-y-1 origin-left relative z-10 border-y-4 border-black">
      <div className="ticker-shell overflow-hidden">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="ticker-group flex w-max shrink-0 items-center gap-10 whitespace-nowrap font-black italic tracking-tighter text-lg text-black sm:text-xl"
            >
              {scrollingItems.map((text, index) => (
                <span key={`${group}-${text}-${index}`} className="shrink-0">
                  {`/// ${text}`}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-shell {
          min-height: 1.75rem;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 24s linear infinite;
          will-change: transform;
        }

        .ticker-group {
          padding-right: 2.5rem;
          will-change: transform;
        }

        @keyframes ticker-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
