"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionLabel from "@/components/ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BELIEFS = [
  {
    title: "Outcomes Over Deliverables",
    desc: "We don't sell hours, story points, or slide decks. We sell systems that run reliably and save your team time.",
  },
  {
    title: "Systems Over Ad-Hoc Scripts",
    desc: "A script works today; a system works tomorrow. We build robust, resilient architectures that can scale with your business.",
  },
  {
    title: "Velocity Through Simplicity",
    desc: "Complexity is a liability. We avoid over-engineering and focus on shipping the simplest solution that perfectly solves the bottleneck.",
  },
  {
    title: "Engineers, Not Middlemen",
    desc: "When you work with us, you speak directly to the engineers building your systems. No project managers playing telephone.",
  },
];

export default function WhatWeBelieve() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headlineRef.current || !cardsRef.current) return;

    // Headline entrance
    gsap.from(headlineRef.current, {
      opacity: 0.75,
      x: -30,
      filter: "blur(4px)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headlineRef.current,
        start: "top 80%",
        once: true,
      },
    });

    // Cards: slide up + border draw effect
    const cards = cardsRef.current.querySelectorAll(".belief-card");
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0.5,
        y: 40,
        filter: "blur(4px)",
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Border draw: animate the SVG rect
      const borderSvg = card.querySelector(".border-draw-rect") as SVGRectElement;
      if (borderSvg) {
        const perimeter = 2 * (borderSvg.getBBox().width + borderSvg.getBBox().height);
        gsap.set(borderSvg, { strokeDasharray: perimeter, strokeDashoffset: perimeter });
        gsap.to(borderSvg, {
          strokeDashoffset: 0,
          duration: 1.2,
          delay: i * 0.15 + 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-[40fr_60fr] gap-16 lg:gap-20 items-start">

          {/* Headline Left */}
          <div ref={headlineRef}>
            <SectionLabel label="OUR TENETS" />
            <h2 className="font-serif text-[36px] sm:text-[44px] leading-[1.1] tracking-[-0.02em] text-white mt-4 mb-6 font-normal">
              How We Build.
            </h2>
            <p className="font-sans text-[16px] text-white/50 leading-relaxed max-w-sm">
              We operate as a technical studio with strong opinions on how software should be built and delivered.
            </p>
          </div>

          {/* Tenets Cards Right */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
            {BELIEFS.map((belief, i) => (
              <div
                key={i}
                className="belief-card relative p-8 rounded-xl bg-white/[0.03] backdrop-blur-sm cursor-default group overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                {/* SVG Border Draw */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" preserveAspectRatio="none">
                  <rect
                    className="border-draw-rect"
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    rx="12"
                    fill="none"
                    stroke="rgba(232,80,10,0.3)"
                    strokeWidth="1"
                  />
                </svg>

                {/* Static border fallback */}
                <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />

                {/* Hover energy gradient on border */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(232,80,10,0.15) 0%, transparent 50%, rgba(232,80,10,0.08) 100%)",
                  }}
                />

                {/* Clean left accent stripe */}
                <span className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#E8500A] opacity-20 group-hover:opacity-100 transition-opacity duration-300 rounded-l-xl" />

                <h3 className="font-sans text-[18px] font-bold text-white mb-3 tracking-tight group-hover:text-[#FF5A1F] transition-colors duration-200 relative z-10">
                  {belief.title}
                </h3>

                <p className="font-sans text-[14px] text-white/50 leading-relaxed relative z-10">
                  {belief.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
