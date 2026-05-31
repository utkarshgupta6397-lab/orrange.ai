"use client";

import { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
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

  // ── Parallax State ──
  const mouseX = useSpring(typeof window !== 'undefined' ? window.innerWidth / 2 : 500, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(typeof window !== 'undefined' ? window.innerHeight / 2 : 500, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const bgX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);
  const bgY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [20, -20]);
  const particlesX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [15, -15]);
  const particlesY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [15, -15]);

  useGSAP(
    () => {
      if (!headlineRef.current || !containerRef.current) return;

      // ── Split headline into lines ──
      const split = new SplitType(headlineRef.current, { types: "lines" });

      if (!split.lines || split.lines.length === 0) return;

      // ── Initial state: 35% opacity, blurred ──
      gsap.set(split.lines, {
        opacity: 0.35,
        filter: "blur(8px)",
        willChange: "transform, opacity, filter, text-shadow",
      });

      // Set initial state for the highlighted phrase
      gsap.set(".hero-highlight", {
        filter: "blur(12px)",
        color: "transparent",
        textShadow: "0 0 16px rgba(255,255,255,0.1)",
        display: "inline-block" // required for transforms/filters on span
      });

      // Initial state for subcontent
      gsap.set(subContentRef.current, {
        opacity: 0,
        y: 20,
      });

      // Initial state for AI underline
      gsap.set(".ai-underline", { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.8,
        }
      });

      // ── Scanning Light Reveal ──
      split.lines.forEach((line, index) => {
        tl.to(line, {
          opacity: 1,
          filter: "blur(0px)",
          textShadow: "0 0 24px rgba(232,80,10,0.5)",
          duration: 0.4,
          ease: "power2.out",
        }, index * 0.2)
        .to(line, {
          textShadow: "0 0 0px rgba(232,80,10,0)",
          duration: 0.3,
          ease: "power2.inOut",
        }, (index * 0.2) + 0.3);
      });

      // ── "bad systems." Snap ──
      tl.to(".hero-highlight", {
        filter: "blur(0px)",
        color: "#FF5A1F",
        textShadow: "0 0 24px rgba(255,90,31,0.5)",
        duration: 0.2, // fast snap
        ease: "power4.out"
      }, "+=0.3"); // 300ms delay after scanning completes

      // ── Subheadline Reveal ──
      tl.to(subContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.2");

      // ── AI Underline Sweep ──
      tl.to(".ai-underline", {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4");

      // ── Cleanup ──
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
      onMouseMove={handleMouseMove}
      data-theme="dark"
      className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden select-none cursor-default"
      style={{ backgroundColor: "transparent" }}
    >
      {/* ── Subtle Ambient Glows (Parallax) ── */}
      <motion.div
        className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(232,80,10,0.06) 0%, transparent 70%)",
          filter: "blur(120px)",
          x: bgX,
          y: bgY
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
          x: bgX,
          y: bgY
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />

      {/* ── AI Background Particles & Lines (Parallax) ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{ x: particlesX, y: particlesY }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <radialGradient id="ai-glow-orange">
              <stop offset="0%" stopColor="#E8500A" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          
          {/* Connection Lines */}
          <path d="M 15% 30% L 35% 20% L 55% 45% L 85% 30%" fill="none" stroke="#E8500A" strokeWidth="0.5" className="opacity-10" />
          <path d="M 25% 60% L 45% 75% L 75% 50%" fill="none" stroke="#60A5FA" strokeWidth="0.5" className="opacity-10" />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.circle 
              key={i}
              cx={`${5 + (i * 4.5)}%`} 
              cy={`${15 + ((i * 17) % 70)}%`} 
              r={i % 3 === 0 ? 1.5 : 1} 
              fill={i % 4 === 0 ? "#E8500A" : "#60A5FA"}
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.1, 0.5, 0.1] 
              }}
              transition={{ 
                duration: 5 + (i % 4), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.3
              }}
              className="opacity-20"
            />
          ))}
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        {/* ── Label ── */}
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#E8500A] uppercase block mb-6">
          THE STORY OF XYZ LABS
        </span>

        {/* ── Headline ── */}
        <h1
          ref={headlineRef}
          className="font-serif text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] mb-8"
          style={{ color: "#FFFFFF" }}
        >
          We built XYZ Labs because we hated seeing good teams held back by{" "}
          <span className="hero-highlight transition-colors relative">bad systems.</span>
        </h1>

        {/* ── Sub-content ── */}
        <div ref={subContentRef} className="relative z-20">
          {/* Subheadline with AI Highlight */}
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed max-w-2xl mx-auto text-white/70">
            We combine software engineering, workflow automation, and{" "}
            <span className="relative inline-block font-semibold mx-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF8A55] to-[#E8500A] drop-shadow-[0_0_8px_rgba(255,90,31,0.5)]">
                AI
              </span>
              <span className="ai-underline absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF8A55] to-[#E8500A] rounded-full shadow-[0_0_8px_rgba(255,90,31,0.6)]" />
            </span>{" "}
            to build systems that think, adapt, and scale with the way your business actually operates.
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
