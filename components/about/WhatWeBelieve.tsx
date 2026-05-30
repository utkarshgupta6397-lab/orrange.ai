"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      } 
    },
  };

  return (
    <section 
      ref={ref}
      className="py-28 lg:py-36 bg-[#F8F8F6] border-t border-[#E8E8E4]"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-[40fr_60fr] gap-16 lg:gap-20 items-start">
          
          {/* Headline Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel label="OUR TENETS" />
            <h2 className="font-serif text-[36px] sm:text-[44px] leading-[1.1] tracking-[-0.02em] text-[#141412] mt-4 mb-6 font-normal">
              How We Build.
            </h2>
            <p className="font-sans text-[16px] text-[#5A5A54] leading-relaxed max-w-sm">
              We operate as a technical studio with strong opinions on how software should be built and delivered.
            </p>
          </motion.div>

          {/* Tenets Cards Right */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid sm:grid-cols-2 gap-6"
          >
            {BELIEFS.map((belief, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                className="bg-gradient-to-b from-white to-white/[0.8] p-8 rounded-xl border border-[#E8E8E4]/60 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_16px_40px_rgba(232,80,10,0.04)] transition-all duration-500 relative overflow-hidden select-none cursor-default group"
              >
                {/* Clean left accent stripe */}
                <span className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#E8500A] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                
                <h3 className="font-sans text-[18px] font-bold text-[#141412] mb-3 tracking-tight group-hover:text-[#E8500A] transition-colors duration-200">
                  {belief.title}
                </h3>
                
                <p className="font-sans text-[14px] text-[#5A5A54] leading-relaxed">
                  {belief.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
