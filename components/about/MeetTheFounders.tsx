"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.96 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      } 
    },
  };

  // Image rotation hover variant: 0° -> +4° -> -2° -> 0° over 500ms
  const imageHoverVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: [0, 4, -2, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
        times: [0, 0.3, 0.7, 1]
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-28 lg:py-36 bg-[#F8F8F6] border-t border-[#E8E8E4]"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <SectionLabel label="WHO WE ARE" />
          <h2 className="font-serif text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#141412] max-w-xl mx-auto mt-4 font-normal">
            Meet the engineers building your systems.
          </h2>
        </motion.div>

        {/* Founder Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto"
        >
          {FOUNDERS.map((founder, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-gradient-to-b from-white to-white/[0.8] rounded-2xl p-10 border border-[#E8E8E4]/60 shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-500 flex flex-col items-center text-center relative overflow-hidden group select-none cursor-default"
            >
              {/* Subtle top edge gradient bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-[#E8500A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Profile Image - Target 120px-160px (Used 140px) */}
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden mb-8 border border-[#E8E8E4] group-hover:border-[#E8500A]/30 transition-colors duration-300 shadow-md">
                <motion.img
                  src={founder.image}
                  alt={founder.name}
                  variants={imageHoverVariants}
                  initial="initial"
                  whileHover="hover"
                  className="w-full h-full object-cover origin-bottom"
                />
              </div>
              
              {/* Card Meta Content */}
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#E8500A] font-bold uppercase block mb-3">
                {founder.role}
              </span>
              
              <h3 className="font-sans text-[22px] font-bold text-[#141412] mb-1 tracking-tight">
                {founder.name}
              </h3>
              
              <p className="font-sans text-[13px] font-semibold text-[#8C8C85] mb-5">
                {founder.background}
              </p>
              
              {/* Subtle separator line */}
              <div className="w-8 h-px bg-[#E8E8E4] mb-5" />
              
              {/* Credentials / Details */}
              <p className="font-sans text-[14px] text-[#5A5A54] leading-relaxed max-w-[260px]">
                {founder.credentials}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
