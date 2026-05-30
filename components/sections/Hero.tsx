"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import SectionLabel from "@/components/ui/SectionLabel";
import LivingOperationsGraph from "@/components/ui/LivingOperationsGraph";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useGSAP(() => {
    if (!headlineRef.current) return;

    // Split the headline into characters
    const split = new SplitType(headlineRef.current, { types: "lines,words,chars" });
    const chars = split.chars;

    // Initial states for Hero Text (only headline characters get GSAP initialization, rest render immediately)
    gsap.set(chars, { opacity: 0, filter: "blur(4px)", color: "transparent" });
    
    // Initial states for Living Operations Graph elements
    gsap.set('.graph-input', { opacity: 0, x: -20 });
    gsap.set('.graph-outcome', { opacity: 0, x: 20 });
    gsap.set('.graph-path', { strokeDashoffset: 1000 });
    gsap.set('.graph-particles', { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // 1. Headline Wash Animation
    tl.to(chars, {
      keyframes: [
        { opacity: 1, filter: "blur(0px)", color: "#FF5722", duration: 0.1, ease: "power2.out" },
        { 
          color: (index: number, target: Element) => target.closest('.orange-text') ? "#ff5a1f" : "#111111", 
          duration: 0.2, 
          ease: "power2.inOut" 
        }
      ],
      stagger: 0.02,
      duration: 1.2,
    }, 0)

    // 2. Input and Output Nodes (150ms)
    .to(['.graph-input', '.graph-outcome'], {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    }, 0.15)

    // 3. SVG Paths Draw (300ms)
    .to('.graph-path', {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "power2.inOut"
    }, 0.3)

    // 4. Particles Fade In (500ms)
    .to('.graph-particles', {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut"
    }, 0.5);

    // Cleanup split on unmount
    return () => {
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[55vh] lg:min-h-[60vh] flex items-center pt-[100px] overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Launchpad Grid overlay */}
      <div
        className="absolute inset-0 launchpad-grid pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Blurred orange bubble */}
      <div
        className="absolute top-[5%] right-[2%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E8500A]/12 to-transparent blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Warm secondary glow */}
      <div
        className="absolute top-[20%] right-[18%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#FFBD2E]/8 to-transparent blur-[90px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-8 w-full py-6 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left Column ── */}
          <div className="z-10">
            <SectionLabel label="WHAT WE DO" />

            <h1
              ref={headlineRef}
              id="hero-heading"
              className="font-serif text-[32px] sm:text-[39px] lg:text-[46px] leading-[1.15] tracking-[-0.025em] mb-6"
              style={{ maxWidth: "700px" }}
            >
              <span className="block main-text text-[#141412]">AI-Powered Systems</span>
              <span className="block main-text text-[#141412]">That Adapt To Your Business.</span>
              <span className="block orange-text text-[#ff5a1f]">Not The Other Way Around.</span>
            </h1>

            <p
              ref={subheadRef}
              className="font-sans text-[17px] sm:text-[19px] leading-[1.65] mb-10"
              style={{ color: "#5A5A54", maxWidth: "540px" }}
            >
              Instead of forcing your team into rigid ERP systems and disconnected tools, we build AI-powered software around the way your business already operates.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex items-start sm:items-center gap-4 mb-6">
              <button
                onClick={() => scrollTo("#work")}
                className="flex items-center gap-2 font-sans text-[15px] font-semibold h-13 px-7 rounded-lg cursor-pointer transition-all duration-150 bg-[#E8500A] text-white hover:bg-[#D04508] hover:shadow-[0_4px_16px_rgba(232,80,10,0.2)] active:scale-[0.98] whitespace-nowrap"
                style={{
                  height: "52px",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                }}
                id="hero-cta-primary"
              >
                See Our Work
                <span className="transition-transform duration-150 group-hover:translate-y-0.5" aria-hidden="true">
                  ↓
                </span>
              </button>
            </div>

            {/* Trust microcopy */}
            <p ref={trustRef} className="font-sans text-[13px]" style={{ color: "#9A9A93" }}>
              No retainers required to start. We respond within 24 hours.
            </p>
          </div>

          {/* ── Right Column: Living Operations Graph ── */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last z-10 w-full">
            <motion.div
              animate={
                typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? {}
                  : { y: [0, -6, 0] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full"
              style={{ maxWidth: "860px" }}
            >
              <LivingOperationsGraph />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,1))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
