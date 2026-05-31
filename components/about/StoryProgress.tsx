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
  const [journeyYear, setJourneyYear] = useState("");

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

  useEffect(() => {
    const handleJourneyStep = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setJourneyYear(customEvent.detail);
    };

    window.addEventListener("journey-step", handleJourneyStep);
    return () => window.removeEventListener("journey-step", handleJourneyStep);
  }, []);

  return (
    <div className="fixed left-6 lg:left-12 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 pointer-events-none mix-blend-difference">
      {SECTIONS.map((sec, i) => {
        const isActive = activeId === sec.id;
        
        // Dynamically change the journey label if a year is active
        const displayLabel = (sec.id === "journey" && isActive && journeyYear && journeyYear !== "Journey")
          ? journeyYear
          : sec.label;

        return (
          <div key={sec.id} className="flex items-center gap-3 transition-all duration-300">
            <div className={`h-[2px] bg-white/10 relative transition-all duration-500 ease-out ${isActive ? "w-8" : "w-4"}`}>
              <div
                className={`absolute inset-0 bg-[#E8500A] transition-all duration-700 ease-out ${
                  isActive ? "w-full opacity-100 shadow-[0_0_8px_rgba(232,80,10,0.4)]" : "w-0 opacity-0"
                }`}
              />
            </div>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-500 ${
                isActive ? "text-[#E8500A]" : "text-white/30"
              }`}
            >
              0{i + 1} {displayLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
