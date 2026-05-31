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
    name: "Utkarsh Gupta",
    role: "Product Head",
    credentials: "Built operational systems, ERP workflows, automation engines and scalable internal platforms for growing businesses.",
    background: "",
    image: "/images/founder1.png",
  },
  {
    name: "Sourabh Gupta",
    role: "Technical Head",
    credentials: "10+ years of experience designing software architecture, backend systems and engineering platforms.",
    background: "",
    image: "/images/founder2.png",
  },
  {
    name: "Saksham Aggarwal",
    role: "Consultation & Finance Head",
    credentials: "Specialized in business operations, finance workflows and translating business challenges into software solutions.",
    background: "",
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
          { opacity: 0.75, y: 30, filter: "blur(4px)" },
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
            opacity: 0.7,
            y: 40,
            filter: "blur(4px)",
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
      id="founders"
      ref={sectionRef}
      data-theme="dark"
      className="relative py-16 lg:py-24 bg-transparent overflow-hidden"
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
              id="founderPath"
              ref={svgPathRef}
              d="M200,300 C300,100 500,100 600,300 C700,500 900,500 1000,300"
              stroke="rgba(232,80,10,0.4)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Particles traveling along the path */}
            <circle r="3" fill="#FF5A1F" filter="blur(1px)">
              <animateMotion dur="8s" repeatCount="indefinite" path="M200,300 C300,100 500,100 600,300 C700,500 900,500 1000,300" />
            </circle>
            <circle r="2" fill="#FF5A1F" opacity="0.6">
              <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path="M200,300 C300,100 500,100 600,300 C700,500 900,500 1000,300" />
            </circle>
            <circle r="4" fill="#E8500A" opacity="0.4" filter="blur(2px)">
              <animateMotion dur="10s" begin="1s" repeatCount="indefinite" path="M200,300 C300,100 500,100 600,300 C700,500 900,500 1000,300" />
            </circle>
          </svg>
        </div>

        {/* Founder Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto relative z-10 items-center">
          {FOUNDERS.map((founder, i) => {
            const isMiddle = i === 1;
            return (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="group relative opacity-0"
              >
                {/* Orange glow beneath card */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none blur-[50px] transition-opacity duration-500 ${
                    isMiddle ? "w-[120%] h-40 bg-[#FF5A1F] opacity-[0.15] -bottom-10 group-hover:opacity-[0.3]" : "w-full h-32 bg-[#E8500A] opacity-[0.08] -bottom-8 group-hover:opacity-[0.15]"
                  }`}
                  aria-hidden="true"
                />

                {/* Card */}
                <div 
                  className={`relative bg-white/[0.04] border backdrop-blur-sm rounded-2xl p-10 flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-4 cursor-default select-none group-hover:shadow-[0_20px_40px_rgba(255,90,31,0.1)] ${
                    isMiddle ? "md:scale-[1.08] z-20 border-white/20 group-hover:border-[#FF5A1F]/40" : "md:scale-[0.96] z-10 border-white/10 group-hover:border-white/20"
                  }`}
                  style={{ perspective: "1000px" }}
                >
                {/* Profile Image with floating ring */}
                <div className="relative w-[160px] h-[160px] mb-8 transition-transform duration-700 group-hover:rotate-[-5deg] group-hover:scale-105">
                  {/* Floating orange ring */}
                  <div
                    className="absolute -inset-3 rounded-full border-2 border-[#FF5A1F]/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ animation: "founderRingSpin 10s linear infinite" }}
                    aria-hidden="true"
                  />
                  {/* Image circle */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 contrast-125 group-hover:shadow-[0_0_30px_rgba(255,90,31,0.4)] transition-shadow duration-500">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Role label */}
                <span className="font-mono text-[11px] tracking-[0.18em] text-[#FF5A1F] font-bold uppercase block mb-3">
                  {founder.role}
                </span>

                {/* Name */}
                <h3 className="font-sans text-[22px] font-bold text-white mb-4 tracking-tight">
                  {founder.name}
                </h3>

                {/* Background */}
                {founder.background && (
                  <p className="font-sans text-[13px] font-semibold text-white/72 mb-5">
                    {founder.background}
                  </p>
                )}

                {/* Separator */}
                <div className="w-8 h-px bg-white/20 mb-5" aria-hidden="true" />

                <p className="font-sans text-[14px] text-white/72 leading-relaxed max-w-[260px]">
                  {founder.credentials}
                </p>
              </div>
            </div>
            );
          })}
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
