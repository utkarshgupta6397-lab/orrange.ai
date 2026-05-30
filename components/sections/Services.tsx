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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      aria-labelledby="services-heading"
      style={{ backgroundColor: "#FFFFFF" }}
      className="py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <SectionLabel label="SYSTEM CAPABILITIES" />
          <h2
            id="services-heading"
            className="font-serif text-[32px] sm:text-[48px] leading-[1.12] tracking-[-0.015em] mb-4"
            style={{ color: "#141412", maxWidth: "640px" }}
          >
            Software Systems Tailored to Your Workflows
          </h2>
          <p
            className="font-sans text-[17px] leading-relaxed"
            style={{ color: "#5A5A54", maxWidth: "520px" }}
          >
            We build systems around the specific operational outcomes your business needs — not static off-the-shelf software.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.id}
              custom={i}
              variants={cardVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.01)",
              }}
              className="rounded-2xl p-7 cursor-default border border-[#E8E8E4]/50 bg-[#F8F8F6]/20 transition-all duration-300 flex flex-col justify-between"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
              }}
            >
              <div>
                {/* Icon Container with subtle scaling animation on hover */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 bg-[#FFF0E8] text-[#E8500A]"
                >
                  {icons[service.icon]}
                </div>

                {/* Content */}
                <h3
                  className="font-sans text-[17px] font-bold leading-snug mb-3 text-text-primary"
                >
                  {service.title}
                </h3>
                <p
                  className="font-sans text-[14px] leading-relaxed mb-6 text-text-secondary"
                >
                  {service.description}
                </p>
              </div>

              {/* Learn more link */}
              <div>
                <button
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-1.5 font-sans text-[13px] font-bold cursor-pointer transition-colors text-[#E8500A] hover:text-[#D04508] group"
                >
                  Explore system capability
                  <span
                    className="transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
