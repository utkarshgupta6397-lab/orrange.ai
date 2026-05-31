"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Origin" },
  { id: "journey", label: "Journey" },
  { id: "founders", label: "Founders" },
  { id: "philosophy", label: "Philosophy" },
  { id: "beliefs", label: "How We Build" },
  { id: "contact", label: "Contact" },
];

export default function StoryProgress() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    // We observe sections to see which one is currently intersecting
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section that takes up the most space
        // or just the first one intersecting
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-6 lg:left-12 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 pointer-events-none mix-blend-difference">
      {SECTIONS.map((sec, i) => {
        const isActive = activeId === sec.id;
        return (
          <div key={sec.id} className="flex items-center gap-3 transition-all duration-300">
            <div className="w-4 h-[2px] bg-white/20 relative">
              <div
                className={`absolute inset-0 bg-[#FF5A1F] transition-all duration-500 ${
                  isActive ? "w-full opacity-100 shadow-[0_0_8px_#FF5A1F]" : "w-0 opacity-0"
                }`}
              />
            </div>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-500 ${
                isActive ? "text-[#FF5A1F]" : "text-white/30"
              }`}
            >
              0{i + 1} {sec.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
