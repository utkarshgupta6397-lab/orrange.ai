"use client";

import { motion, useInView, useMotionValue, useTransform, useAnimationFrame, MotionValue } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Energy pulse animation state
  const progress = useMotionValue(-0.1);
  const cycleRef = useRef({ start: 0, duration: 4500, nextStart: 0 });

  useAnimationFrame((time) => {
    if (!inView) return;
    
    if (time < cycleRef.current.nextStart) {
      progress.set(-0.1);
      return;
    }
    
    if (cycleRef.current.start === 0 || time > cycleRef.current.start + cycleRef.current.duration) {
      if (cycleRef.current.start !== 0) {
        const pause = 2000 + Math.random() * 6000;
        cycleRef.current.nextStart = time + pause;
        cycleRef.current.start = time + pause;
        progress.set(-0.1);
        return;
      }
      cycleRef.current.start = time;
    }

    const elapsed = time - cycleRef.current.start;
    const p = Math.min(elapsed / cycleRef.current.duration, 1);
    progress.set(p);
  });

  const pulseLeft = useTransform(progress, [0, 1], ["0%", "100%"]);
  const pulseOpacity = useTransform(progress, (p) => (p >= 0 && p <= 1) ? 0.9 : 0);
  const glowLeft = useTransform(progress, [0, 1], ["-10%", "90%"]);

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
          <div className="absolute top-6 left-[10%] right-[10%] z-0 h-[2px]" aria-hidden="true">
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(to right, #E8500A 0%, #E8500A 100%)",
                opacity: 0.25,
              }}
            />
            {/* Energy flow brightened segment */}
            <motion.div
              className="absolute top-0 bottom-0"
              style={{
                width: "20%",
                left: glowLeft,
                opacity: pulseOpacity,
                background: "linear-gradient(90deg, transparent 0%, #E8500A 50%, transparent 100%)",
              }}
            />
            {/* Traveling Pulse Dot */}
            <motion.div
              className="absolute top-1/2 -mt-[4px] -ml-[4px] w-[8px] h-[8px] rounded-full"
              style={{
                left: pulseLeft,
                opacity: pulseOpacity,
                backgroundColor: "#E8500A",
                boxShadow: "0 0 8px 1px rgba(232,80,10,0.8)",
                filter: "blur(0.5px)",
              }}
            />
          </div>

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStepItem key={step.number} step={step} i={i} inView={inView} progress={progress} />
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
        <div className="mt-20 border-t border-[#E8E8E4] pt-12 flex flex-col items-center justify-center text-center">
          <h3 className="font-serif text-[24px] sm:text-[28px] mb-4 text-[#141412]">
            Want to see who's building your systems?
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => scrollTo("#about")}
              className="flex items-center justify-center gap-2 font-sans text-[15px] font-semibold h-13 px-7 rounded-lg cursor-pointer transition-all duration-150 border border-[#E8E8E4] text-[#141412] bg-[#F8F8F6] hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] active:scale-[0.98] whitespace-nowrap"
              style={{
                height: "52px",
                paddingLeft: "28px",
                paddingRight: "28px",
              }}
            >
              Meet The Founders
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center justify-center gap-2 font-sans text-[15px] font-semibold h-13 px-7 rounded-lg cursor-pointer transition-all duration-150 bg-[#E8500A] text-white hover:bg-[#D04508] hover:shadow-[0_4px_16px_rgba(232,80,10,0.2)] active:scale-[0.98] whitespace-nowrap"
              style={{
                height: "52px",
                paddingLeft: "28px",
                paddingRight: "28px",
              }}
            >
              Book A Discovery Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStepItem({ 
  step, 
  i, 
  inView, 
  progress 
}: { 
  step: any; 
  i: number; 
  inView: boolean; 
  progress: MotionValue<number>; 
}) {
  const targetP = i * 0.25;
  const scale = useTransform(progress, [targetP - 0.05, targetP, targetP + 0.05], [1, 1.03, 1]);
  const shadow = useTransform(
    progress,
    [targetP - 0.05, targetP, targetP + 0.05],
    [
      "0 0 12px rgba(232,80,10,0.1)",
      "0 0 20px rgba(232,80,10,0.6)",
      "0 0 12px rgba(232,80,10,0.1)"
    ]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="flex flex-col items-center text-center group"
    >
      {/* Step circle - Pulse Wrapper */}
      <motion.div style={{ scale, boxShadow: shadow }} className="w-12 h-12 mb-6 rounded-full relative">
        <div
          className="w-full h-full rounded-full flex items-center justify-center font-mono text-[14px] font-bold transition-all duration-300 bg-white text-[#E8500A] border border-[#E8500A] group-hover:scale-110 group-hover:bg-[#E8500A] group-hover:text-white"
        >
          {step.number}
        </div>
      </motion.div>

      {/* Structured text container */}
      <div className="bg-white rounded-xl p-5 border border-[#E8E8E4] flex-1 flex flex-col justify-start transition-all duration-300 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] group-hover:-translate-y-1 w-full">
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
  );
}
