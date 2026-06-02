"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const CREDENTIALS = [
  "Built core systems at high-scale SaaS platforms",
  "10+ years of production software engineering experience",
  "Shipped 30+ custom automation and database systems",
  "Specialized in resilient background architectures & APIs",
];

export default function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      aria-labelledby="founder-heading"
      style={{ backgroundColor: "#FFFFFF" }}
      className="py-24 lg:py-32 border-t border-[#E8E8E4]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-start">
          
          {/* ── Left Column: Editorial Trust Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col gap-6"
          >
            <div>
              <SectionLabel label="ENGINEERING LEADERSHIP" />
              <h2
                id="founder-heading"
                className="font-serif text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.025em] mb-6"
                style={{ color: "#141412", maxWidth: "600px" }}
              >
                Systems Built by Seasoned Product Engineers
              </h2>
              <p
                className="font-sans text-[16px] sm:text-[18px] leading-relaxed text-text-secondary max-w-[540px]"
              >
                orrange.ai was founded by engineers who spent years scaling software at high-growth startups and enterprise operations. We saw how much efficiency is lost in manual bottlenecks — and built a studio dedicated to solving them.
              </p>
            </div>

            {/* Credentials - Clean, list layout (No generic bullets, clean typography check) */}
            <div className="space-y-4 my-4" aria-label="Founder credentials">
              <p className="text-[11px] font-bold tracking-[0.12em] text-[#E8500A] uppercase">
                ENGINEERING CREDENTIALS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CREDENTIALS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="border-l-2 border-[#E8500A]/30 pl-4 py-1"
                  >
                    <p className="font-sans text-[13.5px] leading-snug text-text-secondary font-medium">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Heavy Editorial Quote Block */}
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative pl-6 py-2 border-l-4 border-[#E8500A] bg-[#F8F8F6] rounded-r-xl p-5"
            >
              <p
                className="font-sans text-[16px] sm:text-[18px] italic leading-relaxed text-text-primary font-medium mb-3"
              >
                &ldquo;We don&rsquo;t sell slides, plans, or consulting packages. We deliver running software systems that automate manual overhead, reduce data entry errors, and give teams their time back.&rdquo;
              </p>
              <footer className="font-sans text-[13px] font-bold text-text-secondary">
                — [PLACEHOLDER — FOUNDER NAME], Lead Engineer &amp; Founder
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* ── Right Column: High-End Portrait Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex justify-center lg:justify-end w-full"
          >
            <div className="w-full max-w-[360px] flex flex-col gap-4">
              
              {/* Premium Editorial Photo Placeholder Frame */}
              <div
                className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-[#E8E8E4] aspect-[4/5] bg-gradient-to-br from-[#FFFFFF] to-[#F8F8F6]"
                aria-label="Founder photo frame"
              >
                {/* Visual design element: Technical target scope */}
                <div className="absolute inset-4 border border-dashed border-[#D0D0CA]/50 rounded-xl pointer-events-none" />
                
                {/* Silhouette avatar styled inside the frame */}
                <div className="flex flex-col items-center gap-4 text-center p-6 relative z-10">
                  <div
                    className="w-24 h-24 rounded-full border-2 border-dashed border-[#E8500A]/30 bg-white flex items-center justify-center shadow-inner"
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E8500A" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#E8500A] font-bold uppercase block mb-1">
                      VERIFIED ENGINEER
                    </span>
                    <p className="font-sans text-[18px] font-bold text-text-primary">
                      [FOUNDER NAME]
                    </p>
                    <p className="font-sans text-[13px] text-text-muted mt-0.5">
                      Founder &amp; Principal
                    </p>
                  </div>
                </div>

                {/* Developer tag label */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <span
                    className="font-sans text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-lg bg-white border border-[#E8E8E4] shadow-sm text-text-secondary"
                  >
                    [PLACEHOLDER — FOUNDER PHOTO]
                  </span>
                </div>
              </div>

              {/* Founder Meta Details */}
              <div className="text-center sm:text-left flex flex-col sm:flex-row sm:justify-between items-center px-2">
                <div>
                  <p className="font-sans text-[14px] text-text-muted">
                    Based in Bangalore, India
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 font-sans text-[13px] font-bold text-[#E8500A] hover:text-[#D04508] transition-colors mt-2 sm:mt-0"
                  aria-label="Connect on LinkedIn"
                >
                  Connect on LinkedIn
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
