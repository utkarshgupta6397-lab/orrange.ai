"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      style={{ backgroundColor: "#F8F8F6" }}
      className="py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <SectionLabel label="ENGAGEMENT PLAYBOOK" />
          <h2
            id="process-heading"
            className="font-serif text-[32px] sm:text-[48px] leading-[1.12] tracking-[-0.015em] mb-4"
            style={{ color: "#141412", maxWidth: "640px" }}
          >
            A Structured, Proven Pathway to Launch
          </h2>
          <p
            className="font-sans text-[17px] leading-relaxed"
            style={{ color: "#5A5A54", maxWidth: "520px" }}
          >
            We eliminate ambiguity. You will know exactly what we are building, when it ships, and how it will perform.
          </p>
        </div>

        {/* ── Desktop Timeline ── */}
        <div ref={ref} className="hidden lg:block mb-20 relative">
          
          {/* Connector line - Thicker and prominent orange shade */}
          <div className="absolute top-6 left-[8%] right-[8%] z-0" aria-hidden="true">
            <div
              className="w-full h-[2px]"
              style={{
                background: "linear-gradient(to right, #E8500A 0%, #E8500A 100%)",
                opacity: 0.25,
              }}
            />
          </div>

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step circle - Large & High Contrast */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 font-mono text-[14px] font-bold transition-all duration-300 bg-white text-[#E8500A] border border-[#E8500A] shadow-[0_0_12px_rgba(232,80,10,0.1)] group-hover:scale-110 group-hover:bg-[#E8500A] group-hover:text-white"
                >
                  {step.number}
                </div>

                {/* Structured text container */}
                <div className="bg-white rounded-xl p-5 border border-[#E8E8E4] flex-1 flex flex-col justify-start transition-all duration-300 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] group-hover:-translate-y-1">
                  <h3
                    className="font-sans text-[15px] font-bold mb-2.5 leading-snug"
                    style={{ color: "#141412" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans text-[13px] leading-relaxed"
                    style={{ color: "#5A5A54" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile Timeline ── */}
        <div className="lg:hidden mb-16">
          <div className="relative pl-8">
            {/* Vertical connector - Thicker orange gradient dash */}
            <div
              className="absolute left-4 top-6 bottom-6 w-[2px]"
              style={{
                background: "linear-gradient(to bottom, #E8500A 0%, #E8500A 100%)",
                opacity: 0.25,
              }}
              aria-hidden="true"
            />

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className="relative flex gap-5"
                >
                  {/* Step circle */}
                  <div
                    className="absolute -left-12 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[12px] font-bold bg-white text-[#E8500A] border border-[#E8500A] shadow-sm"
                  >
                    {step.number}
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-[#E8E8E4] flex-1">
                    <h3
                      className="font-sans text-[16px] font-bold mb-2 leading-snug"
                      style={{ color: "#141412" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-sans text-[14px] leading-relaxed"
                      style={{ color: "#5A5A54" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Inline CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: 0.5, 
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
          }}
          className="flex flex-col items-center justify-center gap-5 pt-10"
          style={{ borderTop: "1px solid #E8E8E4" }}
        >
          <p className="font-sans text-[16px] font-bold text-center" style={{ color: "#141412" }}>
            Want to see who&apos;s building your systems?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="/about#founders"
              className="flex justify-center items-center gap-2 font-sans text-[13px] font-bold h-11 px-6 rounded-lg cursor-pointer transition-all active:scale-[0.98] bg-[#141412] border border-[#2A2A28] text-white hover:bg-[#2A2A28] w-full sm:w-auto"
            >
              Meet The Founders
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex justify-center items-center gap-2 font-sans text-[13px] font-bold h-11 px-6 rounded-lg cursor-pointer transition-all active:scale-[0.98] bg-[#E8500A] text-white hover:bg-[#D04508] shadow-[0_4px_14px_rgba(232,80,10,0.25)] w-full sm:w-auto"
            >
              Book A Discovery Call
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
