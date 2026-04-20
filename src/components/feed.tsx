"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ConverterConfig } from "@/converters/types";
import ConverterCard from "./converter-card";
import { getRecents } from "@/lib/recents";

interface FeedProps {
  converters: ConverterConfig[];
  lang: string;
}

export default function Feed({ converters, lang }: FeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 2]);

  // Reorder converters based on recent usage
  const orderedConverters = useMemo(() => {
    if (typeof window === "undefined") return converters;
    const recents = getRecents();
    if (recents.length === 0) return converters;

    const recentSet = new Set(recents);
    const recentConverters = recents
      .map((slug) => converters.find((c) => c.slug === slug))
      .filter((c): c is ConverterConfig => c !== undefined);
    const nonRecent = converters.filter((c) => !recentSet.has(c.slug));
    return [...recentConverters, ...nonRecent];
  }, [converters]);

  // Track active card via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-card-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number((entry.target as HTMLElement).dataset.cardIndex);
            setActiveIndex(index);
            setVisibleRange([Math.max(0, index - 1), Math.min(orderedConverters.length - 1, index + 1)]);
          }
        }
      },
      { root: container, threshold: 0.5 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [orderedConverters.length]);

  return (
    <div className="relative">
      {/* Feed container */}
      <div ref={containerRef} className="feed-container">
        {orderedConverters.map((converter, index) => (
          <div key={converter.slug} data-card-index={index}>
            {index >= visibleRange[0] && index <= visibleRange[1] ? (
              <ConverterCard
                converter={converter}
                lang={lang}
              />
            ) : (
              <div className="feed-card" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1.5">
        {orderedConverters.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const card = container.querySelector(`[data-card-index="${index}"]`);
                card?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-1.5 bg-accent"
                : Math.abs(index - activeIndex) <= 2
                ? "w-1.5 bg-text-tertiary/50"
                : "w-1 bg-text-tertiary/20"
            }`}
            aria-label={`Go to converter ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
