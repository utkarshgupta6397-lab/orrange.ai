"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhyWeStarted() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const quoteVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const bodyVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-28 lg:py-36 bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* UPPER LABEL */}
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#E8500A] uppercase block mb-10 text-center">
          THE REAL PROBLEM
        </span>

        {/* MEMORABLE CENTERPIECE QUOTE BLOCK */}
        <motion.div
          variants={quoteVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-[6px_1fr] gap-8 items-stretch max-w-3xl mx-auto relative"
        >
          {/* Vertical Orange Accent Line */}
          <div className="hidden md:block w-[4px] bg-[#E8500A] rounded-full" />
          
          <div className="relative pl-2 md:pl-0">
            {/* Quote Mark Graphic */}
            <div className="absolute -top-14 -left-6 font-serif text-[180px] text-[#141412]/[0.03] leading-none pointer-events-none select-none">
              “
            </div>
            
            <h2 className="font-serif text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.2] tracking-[-0.03em] text-[#141412] font-normal relative z-10">
              We saw companies spending millions on SaaS, yet their teams were still drowning in spreadsheets.
            </h2>
          </div>
        </motion.div>

        {/* NARRATIVE LAYOUT */}
        <motion.div
          variants={bodyVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-16 grid sm:grid-cols-2 gap-10 max-w-3xl mx-auto border-t border-[#E8E8E4] pt-12"
        >
          <p className="font-sans text-[16px] leading-relaxed text-[#5A5A54]">
            Before starting XYZ Labs, we worked on systems scaling to millions of users. What surprised us was what happened behind the scenes: even the most successful companies were held together by manual data entry, disconnected tools, and fragile spreadsheets.
          </p>
          <div className="space-y-6">
            <p className="font-sans text-[16px] leading-relaxed text-[#5A5A54]">
              We realized that most software agencies are incentivized to sell hours, not outcomes. They build what they&apos;re told, collect their fees, and leave teams to deal with systems that don&apos;t actually automate the work.
            </p>
            <p className="font-sans text-[16px] leading-relaxed font-semibold text-[#141412]">
              We started XYZ Labs to do the opposite. We act as an extension of your operations team, building bespoke software that entirely eliminates bottlenecks.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
