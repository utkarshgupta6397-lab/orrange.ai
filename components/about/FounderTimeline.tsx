"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE_EVENTS = [
  {
    year: "2018",
    title: "Met at BITS Pilani",
    desc: "We met in the computer labs at BITS Pilani. While other students were building basic projects, we spent our nights writing automation scripts for campus workflows and building early SaaS prototypes together.",
  },
  {
    year: "2020",
    title: "Separate Paths, Similar Problems",
    desc: "After graduation, we went separate ways — joining high-growth startups like Stripe and Linear, or consulting for large enterprises. No matter where we worked, we kept seeing the exact same pattern.",
  },
  {
    year: "2022",
    title: "The Enterprise Bottleneck",
    desc: "We realized that most companies aren't held back by a lack of ideas. They are held back by operational drag: spreadsheets that don't sync, manual data entry, and off-the-shelf software that doesn't fit their actual workflows.",
  },
  {
    year: "2024",
    title: "Reunited to Build XYZ",
    desc: "We quit our jobs and reunited to start XYZ Labs. We wanted to build a different kind of company — a software studio that acts as a technical partner, building bespoke systems that eliminate bottlenecks and give teams their time back.",
  },
];

/* ── Energy Particle SVG ─────────────────────────────────────────────── */
function EnergyParticles({ direction = "horizontal" }: { direction?: "horizontal" | "vertical" }) {
  const isHorizontal = direction === "horizontal";
  const pathD = isHorizontal
    ? "M 0,1 L 1200,1"
    : "M 1,0 L 1,800";
  const viewBox = isHorizontal ? "0 0 1200 2" : "0 0 2 800";

  const particles = [
    { delay: "0s", dur: "4s", r: 3, opacity: 1 },
    { delay: "1s", dur: "5s", r: 2.5, opacity: 0.85 },
    { delay: "2.2s", dur: "4.5s", r: 2, opacity: 0.95 },
    { delay: "3.4s", dur: "6s", r: 2.5, opacity: 0.8 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="particleGlow">
          <stop offset="0%" stopColor="#FF5A1F" stopOpacity="1" />
          <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path id={`energyPath-${direction}`} d={pathD} fill="none" />
      {particles.map((p, i) => (
        <circle key={i} r={p.r} fill="#FF5A1F" opacity={p.opacity}>
          <animateMotion
            dur={p.dur}
            begin={p.delay}
            repeatCount="indefinite"
            path={pathD}
          />
        </circle>
      ))}
    </svg>
  );
}

/* ── Main Component ──────────────────────────────────────────────────── */
export default function FounderTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopWrapRef = useRef<HTMLDivElement>(null);
  const desktopLineRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopDotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopYearsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileDotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Desktop GSAP ScrollTrigger ──────────────────────────────────── */
  useGSAP(
    () => {
      if (isMobile) return;
      const section = sectionRef.current;
      const cards = desktopCardsRef.current.filter(Boolean) as HTMLDivElement[];
      const dots = desktopDotsRef.current.filter(Boolean) as HTMLDivElement[];
      const years = desktopYearsRef.current.filter(Boolean) as HTMLSpanElement[];
      const line = desktopLineRef.current;
      if (!section || cards.length === 0 || !line) return;

      // Set initial states
      gsap.set(cards, {
        opacity: 0.5,
        scale: 0.95,
        filter: "blur(4px)",
      });

      gsap.set(dots, {
        scale: 0,
        opacity: 0,
      });

      gsap.set(line, {
        width: "0%",
      });

      gsap.set(years, {
        color: "rgba(255,255,255,0.3)",
      });

      // Master timeline pinned to section scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "bottom 10%",
          scrub: 0.8,
        },
      });

      // Animate the connection line first
      tl.to(
        line,
        {
          width: "100%",
          duration: 0.5,
          ease: "none",
        },
        0
      );

      // Stagger each card into focus
      cards.forEach((card, i) => {
        const startTime = 0.1 + i * (1 / cards.length);

        // Dot appears
        tl.to(
          dots[i],
          {
            scale: 1,
            opacity: 1,
            duration: 0.08,
            ease: "back.out(2)",
          },
          startTime
        );

        // Card snaps into focus
        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            boxShadow: "0 0 40px rgba(255,90,31,0.15), 0 0 80px rgba(255,90,31,0.05)",
            duration: 0.15,
            ease: "power2.out",
          },
          startTime
        );

        // Year becomes bright orange
        if (years[i]) {
          tl.to(
            years[i],
            {
              color: "#FF5A1F",
              duration: 0.1,
              ease: "none",
            },
            startTime
          );
        }

        // Dim previous card (but keep it visible, no blur)
        if (i > 0) {
          tl.to(
            cards[i - 1],
            {
              opacity: 0.65,
              boxShadow: "0 0 0px rgba(255,90,31,0)",
              duration: 0.15,
              ease: "power2.out",
            },
            startTime
          );

          // Dim previous year
          if (years[i - 1]) {
            tl.to(
              years[i - 1],
              {
                color: "rgba(255,90,31,0.5)",
                duration: 0.1,
                ease: "none",
              },
              startTime
            );
          }
        }
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  /* ── Mobile GSAP ScrollTrigger ───────────────────────────────────── */
  useGSAP(
    () => {
      if (!isMobile) return;
      const cards = mobileCardsRef.current.filter(Boolean) as HTMLDivElement[];
      const dots = mobileDotsRef.current.filter(Boolean) as HTMLDivElement[];
      const line = mobileLineRef.current;
      if (cards.length === 0 || !line) return;

      // Initial states
      gsap.set(cards, {
        opacity: 0.5,
        y: 20,
        scale: 0.96,
        filter: "blur(4px)",
      });

      gsap.set(dots, {
        scale: 0,
        opacity: 0,
      });

      gsap.set(line, {
        height: "0%",
      });

      // Animate line on section entry
      gsap.to(line, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: mobileWrapRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });

      // Each card reveals as you scroll past it
      cards.forEach((card, i) => {
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.5,
          },
        });

        cardTl.to(dots[i], {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(2)",
        }, 0);

        cardTl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        }, 0.1);
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="py-24 lg:py-36 relative overflow-hidden select-none"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Background launchpad grid overlay */}
      <div className="absolute inset-0 launchpad-grid opacity-[0.04] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="mb-20 text-center">
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#E8500A] uppercase block mb-3">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] leading-tight text-white max-w-xl mx-auto font-normal opacity-90">
            How BITS Pilani computer labs led to building XYZ Labs.
          </h2>
        </div>

        {/* ── DESKTOP HORIZONTAL TIMELINE ── */}
        <div ref={desktopWrapRef} className="hidden md:block relative w-full h-[900px]">
          {/* Horizontal connection line track */}
          <div className="absolute left-[6%] right-[6%] top-[450px] h-[2px] bg-white/10 z-0">
            <div
              ref={desktopLineRef}
              className="h-full bg-gradient-to-r from-[#E8500A] via-[#FF5A1F] to-[#E8500A]"
              style={{
                width: "0%",
                boxShadow: "0 0 20px rgba(232,80,10,0.6)",
              }}
            />
            {/* Energy particles flowing along the line */}
            <EnergyParticles direction="horizontal" />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10 w-full h-full">
            {TIMELINE_EVENTS.map((event, index) => {
              const isHigher = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className="relative flex flex-col items-center justify-center h-full"
                >
                  {/* Glowing dot on the timeline */}
                  <div className="absolute top-[450px] -translate-y-1/2 z-20">
                    <div
                      ref={(el) => { desktopDotsRef.current[index] = el; }}
                      className="w-4 h-4 rounded-full bg-[#141412] border-2 border-[#E8500A] relative flex items-center justify-center"
                      style={{
                        boxShadow: "0 0 10px rgba(232,80,10,0.5)",
                        transform: "scale(0)",
                        opacity: 0,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
                      <span className="absolute -inset-2 rounded-full bg-[#E8500A]/10 animate-pulse" />
                    </div>
                  </div>

                  {/* Timeline card */}
                  <div
                    ref={(el) => { desktopCardsRef.current[index] = el; }}
                    className={`absolute w-full px-2 ${
                      isHigher ? "bottom-[480px]" : "top-[480px]"
                    }`}
                    style={{
                      opacity: 0.5,
                      filter: "blur(4px)",
                      transform: "scale(0.95)",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    <div
                      className="relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm transition-colors duration-300"
                      style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    >
                      {/* Edge accent bar */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 h-0.5 w-8 bg-[#E8500A] rounded-full opacity-40"
                        style={{ [isHigher ? "bottom" : "top"]: 0 }}
                      />

                      {/* Year */}
                      <span
                        ref={(el) => { desktopYearsRef.current[index] = el; }}
                        className="font-mono text-[12px] font-bold tracking-widest uppercase block mb-2"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {event.year}
                      </span>

                      {/* Title */}
                      <h3 className="font-serif text-[18px] font-bold text-white mb-3 leading-snug">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-[13px] text-white/60 leading-relaxed font-normal">
                        {event.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE VERTICAL TIMELINE ── */}
        <div ref={mobileWrapRef} className="md:hidden relative pl-8 select-none">
          {/* Vertical connection line track */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-white/5 z-0">
            <div
              ref={mobileLineRef}
              className="w-full bg-gradient-to-b from-[#E8500A] via-[#FF5A1F] to-[#E8500A]"
              style={{
                height: "0%",
                boxShadow: "0 0 10px rgba(232,80,10,0.4)",
              }}
            />
            {/* Energy particles flowing vertically */}
            <EnergyParticles direction="vertical" />
          </div>

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={event.year} className="relative">
                {/* Milestone dot */}
                <div className="absolute -left-[23px] top-2.5 z-10">
                  <div
                    ref={(el) => { mobileDotsRef.current[index] = el; }}
                    className="w-3.5 h-3.5 rounded-full bg-[#141412] border-2 border-[#E8500A] flex items-center justify-center"
                    style={{
                      boxShadow: "0 0 8px rgba(232,80,10,0.5)",
                      transform: "scale(0)",
                      opacity: 0,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
                  </div>
                </div>

                {/* Card */}
                <div
                  ref={(el) => { mobileCardsRef.current[index] = el; }}
                  className="relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    opacity: 0.5,
                    filter: "blur(4px)",
                    transform: "translateY(20px) scale(0.96)",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <span className="font-mono text-[12px] font-bold tracking-widest text-[#E8500A] uppercase block mb-1">
                    {event.year}
                  </span>
                  <h3 className="font-serif text-[18px] font-bold text-white mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="font-sans text-[13px] text-white/60 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
