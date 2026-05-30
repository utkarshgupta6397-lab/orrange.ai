"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionLabel from "@/components/ui/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FOUNDERS = [
  {
    name: "[Founder Name]",
    role: "Lead Systems Engineer",
    credentials: "Built core systems at high-scale SaaS platforms",
    background: "Ex-Stripe",
    image: "/images/founder1.png",
  },
  {
    name: "[Founder Name]",
    role: "Product Architect",
    credentials: "10+ years of frontend infrastructure experience",
    background: "Ex-Linear",
    image: "/images/founder2.png",
  },
  {
    name: "[Founder Name]",
    role: "Operations Automation",
    credentials: "Shipped 30+ custom automation and database systems",
    background: "Ex-Scale AI",
    image: "/images/founder3.png",
  },
];

export default function MeetTheFounders() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgPathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Sequential card reveal: each card 300ms apart
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

      // SVG connecting path animation
      if (svgPathRef.current) {
        const pathLength = svgPathRef.current.getTotalLength();
        gsap.set(svgPathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        gsap.to(svgPathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative py-28 lg:py-36 bg-transparent overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <div className="flex justify-center">
            <SectionLabel label="WHO WE ARE" />
          </div>
          <h2 className="font-serif text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] text-white max-w-xl mx-auto mt-4 font-normal">
            Meet the engineers building your systems.
          </h2>
        </div>

        {/* Connecting SVG Path */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 600"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={svgPathRef}
              d="M200,300 C300,100 500,100 600,300 C700,500 900,500 1000,300"
              stroke="rgba(232,80,10,0.4)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Founder Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto relative z-10">
          {FOUNDERS.map((founder, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative opacity-0"
            >
              {/* Orange glow beneath card */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-full bg-[#E8500A] opacity-[0.05] blur-[40px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Card */}
              <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-2xl p-10 flex flex-col items-center text-center transition-transform duration-500 hover:rotate-[3deg] cursor-default select-none">
                {/* Profile Image with floating ring */}
                <div className="relative w-[140px] h-[140px] mb-8">
                  {/* Floating orange ring */}
                  <div
                    className="absolute -inset-3 rounded-full border border-[#FF5A1F]/30 pointer-events-none"
                    style={{ animation: "founderRingSpin 20s linear infinite" }}
                    aria-hidden="true"
                  />
                  {/* Image circle */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={140}
                      height={140}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Role label */}
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#E8500A] font-bold uppercase block mb-3">
                  {founder.role}
                </span>

                {/* Name */}
                <h3 className="font-sans text-[22px] font-bold text-white mb-1 tracking-tight">
                  {founder.name}
                </h3>

                {/* Background */}
                <p className="font-sans text-[13px] font-semibold text-white/50 mb-5">
                  {founder.background}
                </p>

                {/* Separator */}
                <div className="w-8 h-px bg-white/10 mb-5" aria-hidden="true" />

                {/* Credentials */}
                <p className="font-sans text-[14px] text-white/70 leading-relaxed max-w-[260px]">
                  {founder.credentials}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global keyframes for ring rotation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes founderRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
}
