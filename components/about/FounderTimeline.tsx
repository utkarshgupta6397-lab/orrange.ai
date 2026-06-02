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
    title: "Shared Beginning",
    desc: "Met at BITS Pilani and built a shared foundation in engineering, technology, and problem solving.",
  },
  {
    year: "2022",
    title: "Different Paths",
    desc: "Graduated and entered product, consulting, finance, and software roles across different industries.",
  },
  {
    year: "2024",
    title: "The Idea Takes Shape",
    desc: "Recognized a common pattern: businesses needed software that adapted to operations, not the other way around.",
  },
  {
    year: "2025",
    title: "From Ideas To Experiments",
    desc: "Started validating workflow ideas through small-scale automation systems and real operational use cases.",
  },
  {
    year: "2026",
    title: "Building orrange.ai",
    desc: "Combined collective experience to build AI-powered systems that help businesses operate and scale more effectively.",
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
  const desktopGlowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileDotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileGlowsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      const glows = desktopGlowsRef.current.filter(Boolean) as HTMLDivElement[];
      const line = desktopLineRef.current;
      if (!section || cards.length === 0 || !line) return;

      // Set initial states
      gsap.set(cards, {
        opacity: 0.85,
        scale: 0.95,
      });
      
      gsap.set(glows, { opacity: 0 });
      gsap.set(dots, { scale: 0, opacity: 0 });
      gsap.set(line, { width: "0%" });
      gsap.set(years, { color: "rgba(255,255,255,0.3)" });

      // Master timeline pinned to section scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=1500",
          scrub: 0.8,
        },
      });

      // Animate the connection line stretching across from 0 to 1
      tl.to(line, { width: "100%", duration: 1, ease: "none" }, 0);

      // Stagger each card into focus perfectly synchronized with the line
      cards.forEach((card, i) => {
        // Dot appears exactly when the line reaches its physical center in the grid
        const startTime = (i + 0.5) / cards.length;

        // Dot appears
        tl.to(
          dots[i],
          { scale: 1, opacity: 1, duration: 0.05, ease: "back.out(2)" },
          startTime
        );

        // Card snaps into focus and dispatches event
        tl.to(
          card,
          {
            opacity: 1,
            scale: 1.04,
            borderColor: "rgba(255,90,31,0.5)",
            duration: 0.15,
            ease: "power2.out",
            onStart: () => {
              window.dispatchEvent(new CustomEvent("journey-step", { detail: TIMELINE_EVENTS[i].year }));
            },
            onReverseComplete: () => {
              if (i > 0) {
                window.dispatchEvent(new CustomEvent("journey-step", { detail: TIMELINE_EVENTS[i - 1].year }));
              } else {
                window.dispatchEvent(new CustomEvent("journey-step", { detail: "Journey" }));
              }
            }
          },
          startTime
        );

        // Reveal radial glow
        if (glows[i]) {
          tl.to(glows[i], { opacity: 1, duration: 0.15, ease: "power2.out" }, startTime);
        }

        // Year becomes bright orange
        if (years[i]) {
          tl.to(years[i], { color: "#FF5A1F", duration: 0.1, ease: "none" }, startTime);
        }

        // Dim previous card (but keep it visible, no blur)
        if (i > 0) {
          tl.to(
            cards[i - 1],
            {
              opacity: 0.9,
              scale: 0.95,
              borderColor: "rgba(255,255,255,0.2)",
              duration: 0.15,
              ease: "power2.out",
            },
            startTime
          );

          if (glows[i - 1]) {
            tl.to(glows[i - 1], { opacity: 0, duration: 0.15, ease: "power2.out" }, startTime);
          }

          if (years[i - 1]) {
            tl.to(years[i - 1], { color: "rgba(255,90,31,0.5)", duration: 0.1, ease: "none" }, startTime);
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
      const glows = mobileGlowsRef.current.filter(Boolean) as HTMLDivElement[];
      const line = mobileLineRef.current;
      if (cards.length === 0 || !line) return;

      gsap.set(cards, { opacity: 0.85, y: 20, scale: 0.96, filter: "blur(4px)" });
      gsap.set(glows, { opacity: 0 });
      gsap.set(dots, { scale: 0, opacity: 0 });
      gsap.set(line, { height: "0%" });

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

      cards.forEach((card, i) => {
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.5,
          },
        });

        cardTl.to(dots[i], { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0);
        
        cardTl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            window.dispatchEvent(new CustomEvent("journey-step", { detail: TIMELINE_EVENTS[i].year }));
          },
          onReverseComplete: () => {
            if (i > 0) {
              window.dispatchEvent(new CustomEvent("journey-step", { detail: TIMELINE_EVENTS[i - 1].year }));
            }
          }
        }, 0.1);

        if (glows[i]) {
          cardTl.to(glows[i], { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.1);
        }
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      data-theme="dark"
      className="py-8 lg:py-12 relative overflow-hidden select-none"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Background launchpad grid overlay */}
      <div className="absolute inset-0 launchpad-grid opacity-[0.04] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="mb-[100px] text-center">
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#FF5A1F] uppercase block mb-3">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] leading-tight text-white max-w-xl mx-auto font-normal">
            The Journey From <span className="text-[#FF5A1F]">BITS Pilani</span> To orrange.ai
          </h2>
        </div>

        {/* ── DESKTOP HORIZONTAL TIMELINE ── */}
        <div ref={desktopWrapRef} className="hidden md:block relative w-full h-[380px] lg:h-[460px]">
          {/* Horizontal connection line track */}
          <div className="absolute left-[4%] right-[4%] top-[190px] lg:top-[230px] h-[2px] bg-white/20 z-0">
            <div
              ref={desktopLineRef}
              className="h-full bg-gradient-to-r from-[#E8500A] via-[#FF5A1F] to-[#E8500A] opacity-70"
              style={{
                width: "0%",
                boxShadow: "0 0 8px rgba(232,80,10,0.3)",
              }}
            />
            {/* Energy particles flowing along the line */}
            <EnergyParticles direction="horizontal" />
          </div>

          <div className="grid grid-cols-5 gap-4 lg:gap-6 relative z-10 w-full h-full">
            {TIMELINE_EVENTS.map((event, index) => {
              // Exact positioning: Top row = 2018, 2024, 2026. Bottom row = 2022, 2025.
              const isHigher = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className="relative flex flex-col items-center justify-center h-full"
                >
                  {/* Glowing dot on the timeline */}
                  <div className="absolute top-[190px] lg:top-[230px] -translate-y-1/2 z-20">
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
                    className={`absolute w-full px-1 ${
                      isHigher ? "bottom-[210px] lg:bottom-[250px]" : "top-[210px] lg:top-[250px]"
                    }`}
                    style={{
                      opacity: 0.85,
                      transform: "scale(0.95)",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div
                      className="relative p-4 lg:p-5 rounded-2xl border border-white/20 backdrop-blur-sm transition-colors duration-300 overflow-hidden"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    >
                      {/* Radial Soft Glow (instead of box-shadow) */}
                      <div
                        ref={(el) => { desktopGlowsRef.current[index] = el; }}
                        className="absolute inset-0 z-0 pointer-events-none opacity-0 mix-blend-screen"
                        style={{
                          background: "radial-gradient(circle at 50% 50%, rgba(232,80,10,0.2) 0%, transparent 70%)",
                          filter: "blur(20px)"
                        }}
                      />

                      {/* Edge accent bar */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 h-0.5 w-8 bg-[#E8500A] rounded-full opacity-40 z-10"
                        style={{ [isHigher ? "bottom" : "top"]: 0 }}
                      />

                      <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Year */}
                        <span
                          ref={(el) => { desktopYearsRef.current[index] = el; }}
                          className="font-mono text-[11px] font-bold tracking-widest uppercase block mb-1.5"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          {event.year}
                        </span>

                        {/* Title */}
                        <h3 className="font-serif text-[16px] lg:text-[17px] font-bold text-white mb-2 leading-snug">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-[11.5px] lg:text-[12px] text-white/90 leading-relaxed font-normal opacity-90">
                          {event.desc}
                        </p>
                      </div>
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
                  className="relative p-6 rounded-2xl border border-white/20 backdrop-blur-sm overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    opacity: 0.85,
                    filter: "blur(4px)",
                    transform: "translateY(20px) scale(0.96)",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <div
                    ref={(el) => { mobileGlowsRef.current[index] = el; }}
                    className="absolute inset-0 z-0 pointer-events-none opacity-0 mix-blend-screen"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, rgba(232,80,10,0.2) 0%, transparent 70%)",
                      filter: "blur(20px)"
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="font-mono text-[12px] font-bold tracking-widest text-[#FF5A1F] uppercase block mb-1">
                      {event.year}
                    </span>
                    <h3 className="font-serif text-[18px] font-bold text-white mb-2 leading-snug">
                      {event.title}
                    </h3>
                    <p className="font-sans text-[13px] text-white/90 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM STATEMENT ── */}
        <div className="mt-10 md:mt-12 text-center">
          <p className="font-sans text-[14px] lg:text-[15px] text-white/60 font-medium tracking-wide">
            Built on friendship, shaped by experience, driven by execution.
          </p>
        </div>
      </div>
    </section>
  );
}

