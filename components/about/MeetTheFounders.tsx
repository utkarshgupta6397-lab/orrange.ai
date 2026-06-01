"use client";

import { useRef, useState, useEffect } from "react";
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
    role: "Product • Operations • Systems",
    background: "BITS Pilani • Product Manager at DealShare",
    credentials: "Built and scaled internal business systems across procurement, finance, warehousing, dispatch, inventory, invoicing, and ERP workflows. Brings deep experience translating operational bottlenecks into software that teams actually use.",
    image: "/images/founder1.png",
  },
  {
    name: "Sourabh Gupta",
    role: "Engineering • Architecture • Platform",
    background: "BITS Pilani • Software Engineer (Tekion, Aspora)",
    credentials: "Experienced in designing and building large-scale software platforms, backend systems, distributed architectures, and developer infrastructure. Focused on creating reliable systems that scale with business growth.",
    image: "/images/founder2.png",
  },
  {
    name: "Saksham Aggarwal",
    role: "Finance • Consulting • Strategy",
    background: "BITS Pilani • MBA, IIM Kozhikode • CFA",
    credentials: "Brings expertise across consulting, enterprise operations, financial analysis, and business transformation. Helps bridge the gap between business strategy, operational execution, and technology implementation.",
    image: "/images/founder3.png",
  },
];

export default function MeetTheFounders() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgPathRef = useRef<SVGPathElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updateNodes = () => {
      if (!svgContainerRef.current) return;
      const svgRect = svgContainerRef.current.getBoundingClientRect();
      const newNodes: { x: number; y: number }[] = [];
      
      for (let i = 0; i < 3; i++) {
        const imgEl = imageRefs.current[i];
        if (imgEl) {
          const imgRect = imgEl.getBoundingClientRect();
          newNodes.push({
            x: imgRect.left + imgRect.width / 2 - svgRect.left,
            y: imgRect.top + imgRect.height / 2 - svgRect.top,
          });
        }
      }
      setNodes(newNodes);
    };

    updateNodes();
    window.addEventListener("resize", updateNodes);
    const timer = setTimeout(updateNodes, 500); // Re-run after fonts/layout settle
    return () => {
      window.removeEventListener("resize", updateNodes);
      clearTimeout(timer);
    };
  }, []);

  const generatePath = () => {
    if (nodes.length !== 3) return "";
    const p1 = nodes[0];
    const p2 = nodes[1];
    const p3 = nodes[2];

    const amplitude = 80;
    const cx1 = p1.x + (p2.x - p1.x) / 3;
    const cy1 = p1.y - amplitude;
    const cx2 = p2.x - (p2.x - p1.x) / 3;
    const cy2 = p1.y - amplitude;
    
    const cx3 = p2.x + (p3.x - p2.x) / 3;
    const cy3 = p2.y + amplitude;
    const cx4 = p3.x - (p3.x - p2.x) / 3;
    const cy4 = p3.y + amplitude;

    return `M ${p1.x},${p1.y} C ${cx1},${cy1} ${cx2},${cy2} ${p2.x},${p2.y} C ${cx3},${cy3} ${cx4},${cy4} ${p3.x},${p3.y}`;
  };

  useGSAP(
    () => {
      if (!svgPathRef.current || nodes.length < 3) return;
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
    },
    { scope: sectionRef, dependencies: [nodes] }
  );

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
        <div ref={headerRef} className="mb-14 lg:mb-16 text-center opacity-0">
          <div className="flex justify-center">
            <SectionLabel label="WHO WE ARE" />
          </div>
          <h2 className="font-serif text-[32px] sm:text-[42px] leading-tight text-white max-w-xl mx-auto mt-4 font-normal">
            Meet The Founders
          </h2>
        </div>

        {/* Connecting SVG Path */}
        <div ref={svgContainerRef} className="absolute inset-0 pointer-events-none hidden md:block z-0" aria-hidden="true">
          {nodes.length === 3 && (
            <svg
              className="w-full h-full"
              fill="none"
            >
              <path
                id="founderPath"
                ref={svgPathRef}
                d={generatePath()}
                stroke="rgba(232,80,10,0.4)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Particles traveling along the path */}
              <circle r="3" fill="#FF5A1F" filter="blur(1px)">
                <animateMotion dur="8s" repeatCount="indefinite" path={generatePath()} />
              </circle>
              <circle r="2" fill="#FF5A1F" opacity="0.6">
                <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path={generatePath()} />
              </circle>
              <circle r="4" fill="#E8500A" opacity="0.4" filter="blur(2px)">
                <animateMotion dur="10s" begin="1s" repeatCount="indefinite" path={generatePath()} />
              </circle>
              
              {/* Founder Nodes */}
              {nodes.map((node, idx) => (
                <g key={idx}>
                  <circle cx={node.x} cy={node.y} r="4" fill="#E8500A" />
                  <circle cx={node.x} cy={node.y} r="16" fill="#FF5A1F" opacity="0.3" filter="blur(3px)" />
                </g>
              ))}
            </svg>
          )}
        </div>

        {/* Founder Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto relative z-10 items-stretch">
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
                  className={`relative h-full bg-white/[0.04] border backdrop-blur-sm rounded-2xl p-8 lg:p-10 flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-4 cursor-default select-none group-hover:shadow-[0_20px_40px_rgba(255,90,31,0.1)] ${
                    isMiddle ? "md:scale-[1.05] z-20 border-white/20 group-hover:border-[#FF5A1F]/40" : "md:scale-[0.96] z-10 border-white/10 group-hover:border-white/20"
                  }`}
                  style={{ perspective: "1000px" }}
                >
                  {/* Profile Image with floating ring */}
                  <div 
                    ref={(el) => { imageRefs.current[i] = el; }}
                    className="relative w-[140px] h-[140px] lg:w-[150px] lg:h-[150px] mb-8 transition-transform duration-700 group-hover:rotate-[-5deg] group-hover:scale-105 shrink-0"
                  >
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
                        className="w-full h-full object-cover object-[center_60%]"
                      />
                    </div>
                  </div>

                  {/* Role label */}
                  <span className="font-mono text-[10.5px] tracking-wide text-[#FF5A1F] font-semibold block mb-3 whitespace-nowrap shrink-0">
                    {founder.role}
                  </span>

                  {/* Name */}
                  <h3 className="font-sans text-[22px] font-bold text-white mb-2 tracking-tight shrink-0">
                    {founder.name}
                  </h3>

                  {/* Credentials */}
                  {founder.background && (
                    <div className="min-h-[44px] flex items-center justify-center mb-6 shrink-0">
                      <p className="font-sans text-[13px] font-medium text-white/70 leading-relaxed max-w-[240px]">
                        {founder.background}
                      </p>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="w-8 h-px bg-white/20 mb-6 shrink-0" aria-hidden="true" />

                  {/* Description */}
                  <p className="font-sans text-[13px] text-white/70 leading-[1.7] max-w-[260px] grow">
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
