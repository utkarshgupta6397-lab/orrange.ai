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

  const bgX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [40, -40]);
  const bgY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [40, -40]);
  const particlesX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]);
  const particlesY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [20, -20]);

  useGSAP(
    () => {
      if (!headlineRef.current || !containerRef.current) return;

      // Initial state
      gsap.set([headlineRef.current, subContentRef.current], {
        opacity: 0,
        y: 20,
      });

      // Initial state for gradient sweep words (background positioned to show the white part of the gradient)
      gsap.set(".hero-hl-word", {
        backgroundPosition: "100% 0",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // ── Step 1: Reveal normal text ──
      tl.to([headlineRef.current, subContentRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // ── Step 2: Sequentially highlight key words ──
      const words = [".hl-built", ".hl-xyz", ".hl-good-teams", ".hl-ai", ".hl-learn", ".hl-scale"];
      words.forEach((cls) => {
        tl.to(cls, {
          backgroundPosition: "0% 0",
          textShadow: "0 0 16px rgba(232,80,10,0.25)",
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3");
      });

      // ── Intelligence Flow Effect (Every 8s) ──
      gsap.to(".intelligence-flow", {
        left: "100%",
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 6.5, // 1.5 + 6.5 = 8s
        keyframes: {
          "0%": { opacity: 0, left: "-100%" },
          "50%": { opacity: 0.15, left: "0%" },
          "100%": { opacity: 0, left: "100%" }
        }
      });

      // ── AI Signal Animation (Every 5s) ──
      gsap.to(".hl-ai-signal", {
        opacity: 0.85,
        scale: 1.02,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        repeatDelay: 4, // 0.5 * 2 + 4 = 5s
        ease: "sine.inOut"
      });

      // ── Cleanup ──
      return () => {
        tl.kill();
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
        className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(232,80,10,0.03) 0%, transparent 70%)",
          filter: "blur(120px)",
          x: bgX,
          y: bgY
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.02) 0%, transparent 70%)",
          filter: "blur(100px)",
          x: bgX,
          y: bgY
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />

      {/* ── AI Background Particles & Lines (Parallax) ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.07]"
        style={{ x: particlesX, y: particlesY }}
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Connection Lines (Sparse) */}
          <path d="M 20% 30% L 40% 25% L 60% 45%" fill="none" stroke="#E8500A" strokeWidth="0.5" className="opacity-10" />
          <path d="M 30% 65% L 55% 70%" fill="none" stroke="#60A5FA" strokeWidth="0.5" className="opacity-10" />
          
          {/* Floating Particles (Fewer, smaller) */}
          {[...Array(12)].map((_, i) => (
            <motion.circle 
              key={i}
              cx={`${10 + (i * 7)}%`} 
              cy={`${20 + ((i * 19) % 60)}%`} 
              r={i % 3 === 0 ? 1.5 : 1} 
              fill={i % 4 === 0 ? "#E8500A" : "#60A5FA"}
              animate={{ 
                y: [0, -15, 0], 
                opacity: [0.05, 0.2, 0.05] 
              }}
              transition={{ 
                duration: 6 + (i % 5), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.4
              }}
              className="opacity-10"
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
          className="font-serif text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] mb-12 relative"
          style={{ color: "#FFFFFF" }}
        >
          We <span className="hero-hl-word hl-built inline-block bg-clip-text text-transparent bg-[length:250%_100%] bg-[100%_0] transition-none" style={{ backgroundImage: "linear-gradient(90deg, #FF8A55 0%, #E8500A 40%, #FFFFFF 60%, #FFFFFF 100%)", WebkitTextFillColor: "transparent" }}>built</span>{" "}
          <span className="relative inline-block">
            <span className="hero-hl-word hl-xyz inline-block bg-clip-text text-transparent bg-[length:250%_100%] bg-[100%_0] transition-none" style={{ backgroundImage: "linear-gradient(90deg, #FF8A55 0%, #E8500A 40%, #FFFFFF 60%, #FFFFFF 100%)", WebkitTextFillColor: "transparent" }}>XYZ Labs</span>
            <span className="intelligence-flow absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-[#E8500A] to-transparent mix-blend-screen pointer-events-none opacity-0" />
          </span>{" "}
          because we hated seeing <span className="hero-hl-word hl-good-teams inline-block bg-clip-text text-transparent bg-[length:250%_100%] bg-[100%_0] transition-none" style={{ backgroundImage: "linear-gradient(90deg, #FF8A55 0%, #E8500A 40%, #FFFFFF 60%, #FFFFFF 100%)", WebkitTextFillColor: "transparent" }}>good teams</span> held back by bad systems.
        </h1>

        {/* ── Sub-content ── */}
        <div ref={subContentRef} className="relative z-20">
          {/* Subheadline with AI Highlight */}
          <p className="font-sans text-[18px] sm:text-[20px] leading-relaxed max-w-2xl mx-auto text-white/70">
            We combine software engineering, operational expertise, and{" "}
            <span className="hl-ai-signal inline-block">
              <span className="hero-hl-word hl-ai inline-block font-semibold bg-clip-text text-transparent bg-[length:250%_100%] bg-[100%_0] transition-none mx-1" style={{ backgroundImage: "linear-gradient(90deg, #FF8A55 0%, #E8500A 40%, #FFFFFF 60%, #FFFFFF 100%)", WebkitTextFillColor: "transparent" }}>
                AI
              </span>
            </span>{" "}
            to create systems that <span className="hero-hl-word hl-learn inline-block bg-clip-text text-transparent bg-[length:250%_100%] bg-[100%_0] transition-none" style={{ backgroundImage: "linear-gradient(90deg, #FF8A55 0%, #E8500A 40%, #FFFFFF 60%, #FFFFFF 100%)", WebkitTextFillColor: "transparent" }}>learn</span>, adapt, and <span className="hero-hl-word hl-scale inline-block bg-clip-text text-transparent bg-[length:250%_100%] bg-[100%_0] transition-none" style={{ backgroundImage: "linear-gradient(90deg, #FF8A55 0%, #E8500A 40%, #FFFFFF 60%, #FFFFFF 100%)", WebkitTextFillColor: "transparent" }}>scale</span> alongside your business.
          </p>

          {/* Timeline preview breadcrumbs */}
          <div className="mt-20 flex items-center justify-center gap-4 text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">
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
