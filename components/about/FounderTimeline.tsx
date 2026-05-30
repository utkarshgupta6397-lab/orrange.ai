"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export default function FounderTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger animations when section enters viewport
  const inView = useInView(ref, { once: true, margin: "-120px" });

  // Alternate card height variants
  const cardVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      y: index % 2 === 0 ? -40 : 40,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: index % 2 === 0 ? -12 : 12,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.4 + 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  });

  // Milestone glowing dot animation variants
  const dotVariants = (index: number) => ({
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.4 + 0.1,
        type: "spring" as const,
        stiffness: 120,
      },
    },
  });

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="py-24 lg:py-36 relative overflow-hidden select-none"
      style={{ backgroundColor: "#141412" }}
    >
      {/* Background launchpad pattern */}
      <div className="absolute inset-0 launchpad-grid opacity-[0.04] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Title / Section Header */}
        <div className="mb-20 text-center">
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#E8500A] uppercase block mb-3">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] leading-tight text-white max-w-xl mx-auto font-normal">
            How BITS Pilani computer labs led to building XYZ Labs.
          </h2>
        </div>

        {/* ── DESKTOP HORIZONTAL TIMELINE ── */}
        <div className="hidden md:block relative w-full h-[520px]">
          
          {/* Main Horizontal Timeline connection Line */}
          <div className="absolute left-[6%] right-[6%] top-[260px] h-[2px] bg-white/5 z-0">
            <motion.div
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-[#E8500A] via-[#FF5A1F] to-[#E8500A]"
              style={{ boxShadow: "0 0 12px rgba(232,80,10,0.4)" }}
            />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10 w-full h-full">
            {TIMELINE_EVENTS.map((event, index) => {
              const isHigher = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className="relative flex flex-col items-center justify-center h-full group"
                >
                  {/* Glowing Dot on the center connection line */}
                  <div className="absolute top-[260px] -translate-y-1/2 z-20">
                    <motion.div
                      variants={dotVariants(index)}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                      className="w-4 h-4 rounded-full bg-[#141412] border-2 border-[#E8500A] relative flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-125"
                      style={{ boxShadow: "0 0 10px rgba(232,80,10,0.5)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A] group-hover:bg-[#FF5A1F] transition-colors" />
                      <span className="absolute -inset-2 rounded-full bg-[#E8500A]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>

                  {/* Journey Card floating above or below line */}
                  <motion.div
                    variants={cardVariants(index)}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className={`absolute w-full px-2 ${
                      isHigher ? "bottom-[280px]" : "top-[280px]"
                    }`}
                  >
                    <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-[#E8500A]/40 hover:bg-white/[0.04] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)] group-hover:shadow-[0_12px_40px_rgba(232,80,10,0.06)] cursor-default">
                      {/* Interactive edge gradient marker */}
                      <div className="absolute left-1/2 -translate-x-1/2 h-0.5 w-8 bg-[#E8500A] rounded-full transition-all duration-300 opacity-30 group-hover:w-16 group-hover:opacity-100" 
                        style={{ [isHigher ? "bottom" : "top"]: 0 }}
                      />
                      
                      <span className="font-mono text-[12px] font-bold tracking-widest text-[#E8500A] uppercase block mb-2">
                        {event.year}
                      </span>
                      <h3 className="font-serif text-[18px] font-bold text-white mb-3 leading-snug group-hover:text-[#FF5A1F] transition-colors">
                        {event.title}
                      </h3>
                      <p className="font-sans text-[13px] text-white/60 leading-relaxed font-normal">
                        {event.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE VERTICAL TIMELINE ── */}
        <div className="md:hidden relative pl-8 select-none">
          {/* Main Vertical Timeline connection Line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-white/5 z-0">
            <motion.div
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[#E8500A] via-[#FF5A1F] to-[#E8500A]"
              style={{ boxShadow: "0 0 10px rgba(232,80,10,0.4)" }}
            />
          </div>

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={event.year} className="relative group">
                {/* Milestone Node */}
                <div className="absolute -left-[23px] top-2.5 z-10">
                  <motion.div
                    variants={dotVariants(index)}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="w-3.5 h-3.5 rounded-full bg-[#141412] border-2 border-[#E8500A] flex items-center justify-center"
                    style={{ boxShadow: "0 0 8px rgba(232,80,10,0.5)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
                  </motion.div>
                </div>

                {/* Milestone Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                  className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-[#E8500A]/30 transition-colors shadow-lg"
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
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
