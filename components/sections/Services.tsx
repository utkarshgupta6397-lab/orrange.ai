"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { SERVICES } from "@/lib/constants";

// ─── Icons ───────────────────────────────────────────────────────────────────
const icons: Record<string, React.ReactNode> = {
  receivables: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  inventory: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  operations: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  automation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  reporting: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const capabilityLabels: Record<string, string> = {
  receivables: "Real-Time Data",
  inventory: "Integration Friendly",
  operations: "Workflow Driven",
  automation: "Automation Ready",
  reporting: "AI Compatible",
  support: "Built For Scale",
};

const headerVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {},
};

const nodes = [
  { id: 1, label: "AI Assistants", x: 40, y: 30, textY: 15, textAnchor: "middle" as const, delay: 1.4 },
  { id: 2, label: "Document Processing", x: 150, y: 85, textY: 100, textAnchor: "middle" as const, delay: 1.9 },
  { id: 3, label: "Workflow Agents", x: 220, y: 25, textY: 10, textAnchor: "middle" as const, delay: 2.3 },
  { id: 4, label: "Predictive Analytics", x: 300, y: 50, textY: 65, textAnchor: "middle" as const, delay: 2.7 },
  { id: 5, label: "Decision Support", x: 390, y: 25, textY: 10, textAnchor: "middle" as const, delay: 3.1 },
  { id: 6, label: "Automation Engine", x: 470, y: 75, textY: 90, textAnchor: "end" as const, delay: 3.5 },
];

const AISignalWave = ({ inView }: { inView: boolean }) => {
  const pathD = "M 0,60 C 15,60 25,30 40,30 C 70,30 110,85 150,85 C 190,85 200,25 220,25 C 250,25 270,50 300,50 C 330,50 360,25 390,25 C 425,25 440,75 470,75 C 485,75 495,90 500,90";

  return (
    <div className="w-full h-[100px] relative">
      <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
        {/* Base Path (Organic Architect Sketch) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#141412"
          strokeOpacity="0.12"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Initial Signal Pulse */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#E8500A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="40 1000"
          initial={{ strokeDashoffset: 40, opacity: 0 }}
          animate={inView ? { 
            strokeDashoffset: [-50, -650], 
            opacity: [0, 1, 1, 0] 
          } : {}}
          transition={{ 
            delay: 1.2, 
            duration: 2.5, 
            ease: "linear"
          }}
          style={{ filter: "drop-shadow(0 0 3px rgba(232,80,10,0.5))" }}
        />

        {/* Continuous Subtle Pulse */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#E8500A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="30 1000"
          initial={{ strokeDashoffset: 40, opacity: 0 }}
          animate={inView ? { 
            strokeDashoffset: [-50, -650],
            opacity: [0, 0.35, 0.35, 0]
          } : {}}
          transition={{ 
            delay: 8, 
            duration: 3, 
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 8
          }}
        />

        {/* Nodes and Labels */}
        {nodes.map((node) => (
          <g key={node.id}>
            <motion.text
              x={node.x}
              y={node.textY}
              textAnchor={node.textAnchor}
              fontSize="11"
              fontWeight="500"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1, fill: ["#E8500A", "#8A8A85"] } : { opacity: 0 }}
              transition={{ delay: node.delay, duration: 1.2 }}
              className="font-sans select-none pointer-events-none"
            >
              {node.label}
            </motion.text>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3.5"
              initial={{ opacity: 0, scale: 0, fill: "#FF5A1F" }}
              animate={inView ? { 
                opacity: 1, 
                scale: [0, 1.2, 1],
                fill: ["#FF5A1F", "#E8500A"]
              } : { opacity: 0, scale: 0 }}
              transition={{ delay: node.delay, duration: 0.6 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Trigger when approximately 40% of the section enters the viewport. Run only once.
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="services"
      ref={ref}
      aria-labelledby="services-heading"
      style={{ backgroundColor: "#FFFFFF" }}
      className="py-12 lg:py-10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Top Section: Header + AI Signal Wave */}
        <div className="mb-8 lg:mb-12 flex flex-col xl:flex-row xl:items-center justify-between gap-6 xl:gap-12">
          {/* Header */}
          <div className="w-full xl:max-w-[500px]">
            <SectionLabel label="SYSTEM CAPABILITIES" />
            <motion.h2
              id="services-heading"
              variants={headerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-serif text-[28px] sm:text-[42px] leading-[1.12] tracking-[-0.015em] mb-3"
              style={{ color: "#141412" }}
            >
              Software Systems Tailored to Your Workflows
            </motion.h2>
            <motion.p
              variants={descriptionVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-sans text-[16px] leading-snug"
              style={{ color: "#5A5A54" }}
            >
              We build systems around the specific operational outcomes your business needs — not static off-the-shelf software.
            </motion.p>
          </div>

          {/* AI Signal Wave (Desktop/Tablet) */}
          <div className="hidden md:block flex-1 max-w-[600px] w-full mt-4 xl:mt-0">
             <AISignalWave inView={inView} />
          </div>

          {/* AI Signal Mobile List */}
          <div className="block md:hidden w-full mt-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col gap-2"
            >
              {nodes.map(node => (
                <div key={node.id} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8500A]" />
                  <span className="font-sans text-[13px] font-medium text-text-secondary/80">
                    {node.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"
        >
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.id}
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.02)",
                transition: { duration: 0.2 },
              }}
              className="group rounded-2xl p-4 lg:p-5 cursor-default border border-[#E8E8E4]/50 bg-[#F8F8F6]/20 transition-all duration-200 hover:border-[#E8500A]/40 flex flex-col h-full"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
              }}
            >
              <div className="flex-grow">
                {/* Icon Container with background glow and scale on hover */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-200 bg-[#FFF0E8] text-[#E8500A] group-hover:scale-110 group-hover:bg-[#FFD4C2] group-hover:shadow-[0_0_20px_rgba(232,80,10,0.2)]">
                  {icons[service.icon]}
                </div>

                {/* Content */}
                <h3 className="font-sans text-[17px] font-bold leading-snug mb-1 text-text-primary">
                  {service.title}
                </h3>
                <p className="font-sans text-[13px] leading-[1.4] mb-3 text-text-secondary/80">
                  {service.description}
                </p>
              </div>

              {/* Capability Indicator Pill */}
              <div className="mt-auto pt-3 border-t border-black/5">
                <span className="inline-block px-3 py-1 bg-[#FFF0E8] text-[#E8500A] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-full w-fit">
                  {capabilityLabels[service.id] || "System Ready"}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
