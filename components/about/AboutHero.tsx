"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lagging effect
  const springConfig = { damping: 45, stiffness: 120, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const glowOpacity = useSpring(isHovered ? 0.12 : 0, { damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const bgGlowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 0.08,
      scale: 1,
      transition: {
        duration: 1.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-36 overflow-hidden select-none cursor-default"
      style={{ backgroundColor: "#0F1115" }}
    >
      {/* Dynamic Cursor Light Beam (Orange Spotlight) */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none mix-blend-screen z-20"
        style={{
          left: cursorX,
          top: cursorY,
          opacity: glowOpacity,
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, rgba(255,90,31,0.25) 0%, rgba(255,90,31,0.08) 35%, rgba(255,90,31,0) 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Layered background static glow */}
      <motion.div
        variants={bgGlowVariants}
        initial="hidden"
        animate="show"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#E8500A] blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Label entry */}
          <motion.span
            variants={itemVariants}
            className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#E8500A] uppercase block mb-6"
          >
            THE STORY OF XYZ LABS
          </motion.span>

          {/* Headline entry */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ color: "#FFFFFF" }}
          >
            We built XYZ Labs because we hated seeing good teams held back by bad systems.
          </motion.h1>

          {/* Subheadline/description entry */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[18px] sm:text-[20px] leading-relaxed max-w-2xl mx-auto text-white/70"
          >
            We are a team of product engineers who specialize in turning manual operations into automated software systems that scale effortlessly.
          </motion.p>

          {/* Timeline preview entry */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex items-center justify-center gap-4 text-white/20 font-mono text-[10px] tracking-[0.2em] uppercase"
          >
            <span>2018 BITS Pilani</span>
            <span className="w-6 h-[1px] bg-white/10" />
            <span>2020 Industry</span>
            <span className="w-6 h-[1px] bg-white/10" />
            <span>2022 Bottleneck</span>
            <span className="w-6 h-[1px] bg-white/10" />
            <span>2024 Reunion</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
