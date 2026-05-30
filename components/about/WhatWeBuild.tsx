"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const CAPABILITIES = [
  "Custom Internal Tools",
  "Automated Workflows",
  "API Integrations",
  "Data Pipelines",
  "Executive Dashboards",
  "Legacy System Upgrades",
];

export default function WhatWeBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-28 lg:py-36 bg-white border-t border-[#E8E8E4]"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel label="OUR FOCUS" />
          <h2 className="font-serif text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#141412] mt-4 mb-6 font-normal">
            Software that does the heavy lifting.
          </h2>
          <p className="font-sans text-[17px] text-[#5A5A54] leading-relaxed max-w-2xl mx-auto mb-16">
            We don&apos;t build generic marketing sites or write SEO articles. We build the operational engines that power businesses behind the scenes.
          </p>
        </motion.div>

        {/* Cascading Capability Pills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 max-w-3xl mx-auto"
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              className="px-6 py-3 rounded-full border border-[#E8E8E4] bg-[#F8F8F6] text-[#141412] font-sans text-[14px] font-semibold tracking-tight cursor-default select-none transition-all duration-300 hover:bg-white hover:border-[#E8500A]/30 hover:text-[#E8500A] hover:shadow-[0_8px_20px_rgba(232,80,10,0.06)]"
            >
              {cap}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-sans text-[15px] font-bold text-[#E8500A] hover:text-[#D04508] transition-colors group"
          >
            See our recent work
            <span className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
