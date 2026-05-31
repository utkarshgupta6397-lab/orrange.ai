"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current || !containerRef.current) return;

      // ── Split headline into lines ──
      const split = new SplitType(headlineRef.current, { types: "lines" });

      if (!split.lines || split.lines.length === 0) return;

      // ── Initial state: dimmed, blurred, slightly scaled down ──
      gsap.set(split.lines, {
        opacity: 0.75,
        filter: "blur(4px)",
        scale: 0.97,
        y: 15,
        willChange: "transform, opacity, filter",
      });

      // ── Scroll-driven line-by-line reveal ──
      gsap.to(split.lines, {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.8,
        },
        onComplete: () => {
          gsap.set(split.lines, { clearProps: "filter" });
          gsap.to(".hero-highlight", {
            textShadow: "0 0 24px rgba(255,90,31,0.5)",
            color: "#FF5A1F",
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });

      // ── Subheadline + timeline preview: fade in after headline ──
      if (subContentRef.current) {
        gsap.set(subContentRef.current, {
          opacity: 0,
          y: 30,
          filter: "blur(4px)",
        });

        gsap.to(subContentRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subContentRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.8,
          },
        });
      }

      // ── Cleanup SplitType on unmount ──
      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      data-theme="dark"
      className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden select-none cursor-default"
      style={{ backgroundColor: "transparent" }}
    >
      {/* ── Breathing background glow (Framer Motion continuous) ── */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(232,80,10,0.12) 0%, rgba(232,80,10,0.05) 50%, transparent 70%)",
          filter: "blur(140px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        {/* ── Label ── */}
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#E8500A] uppercase block mb-6">
          THE STORY OF XYZ LABS
        </span>

        {/* ── Headline (GSAP scroll-driven reveal) ── */}
        <h1
          ref={headlineRef}
          className="font-serif text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] mb-8"
          style={{ color: "#FFFFFF" }}
        >
          We built XYZ Labs because we hated seeing good teams held back by <span className="hero-highlight transition-colors">bad systems.</span>
        </h1>

        {/* ── Sub-content: fades in after headline ── */}
        <div ref={subContentRef}>
          {/* Subheadline */}
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed max-w-2xl mx-auto text-white/70">
            We are a team of product engineers who specialize in turning manual
            operations into automated software systems that scale effortlessly.
          </p>

          {/* Timeline preview breadcrumbs */}
          <div className="mt-16 flex items-center justify-center gap-4 text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">
            <span>2018 BITS Pilani</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span>2020 Industry</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span>2022 Bottleneck</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span>2024 Reunion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
