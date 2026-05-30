"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionLabel from "@/components/ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITIES = [
  "Custom Internal Tools",
  "Automated Workflows",
  "API Integrations",
  "Data Pipelines",
  "Executive Dashboards",
  "Legacy System Upgrades",
];

export default function WhatWeBuild() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for magnetic effect
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useGSAP(() => {
    if (!pillsRef.current) return;

    const pills = pillsRef.current.querySelectorAll(".cap-pill");
    pills.forEach((pill, i) => {
      gsap.from(pill, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillsRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });
  }, { scope: sectionRef });

  // Calculate magnetic drift for each pill
  const getMagneticStyle = (index: number) => {
    if (!pillsRef.current) return {};
    const pill = pillsRef.current.children[index] as HTMLElement;
    if (!pill) return {};

    const rect = pill.getBoundingClientRect();
    const pillCenterX = rect.left + rect.width / 2;
    const pillCenterY = rect.top + rect.height / 2;
    const dx = mousePos.x - pillCenterX;
    const dy = mousePos.y - pillCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 250) return {};

    const strength = Math.max(0, (250 - distance) / 250) * 4;
    return {
      transform: `translate(${dx * strength * 0.02}px, ${dy * strength * 0.02}px)`,
    };
  };

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

        {/* Title & Description */}
        <div>
          <SectionLabel label="OUR FOCUS" />
          <h2 className="font-serif text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] text-white mt-4 mb-6 font-normal">
            Software that does the heavy lifting.
          </h2>
          <p className="font-sans text-[17px] text-white/50 leading-relaxed max-w-2xl mx-auto mb-16">
            We don&apos;t build generic marketing sites or write SEO articles. We build the operational engines that power businesses behind the scenes.
          </p>
        </div>

        {/* Floating Capability Pills */}
        <div
          ref={pillsRef}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 max-w-3xl mx-auto"
        >
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className="cap-pill px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-white font-sans text-[14px] font-semibold tracking-tight cursor-default select-none transition-all duration-500 hover:bg-[#E8500A]/10 hover:border-[#E8500A]/40 hover:text-[#FF5A1F] hover:shadow-[0_8px_30px_rgba(232,80,10,0.12)] hover:-translate-y-1 hover:scale-105"
              style={{
                ...getMagneticStyle(i),
                animation: `float-drift ${6 + i * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {cap}
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <div>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-sans text-[15px] font-bold text-[#E8500A] hover:text-[#FF5A1F] transition-colors group"
          >
            See our recent work
            <span className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>

      {/* CSS for floating drift */}
      <style jsx>{`
        @keyframes float-drift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-4px) translateX(2px); }
          50% { transform: translateY(-2px) translateX(-3px); }
          75% { transform: translateY(-5px) translateX(1px); }
        }
      `}</style>
    </section>
  );
}
