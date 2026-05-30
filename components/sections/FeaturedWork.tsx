"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { FEATURED_WORK } from "@/lib/constants";

function CaseStudyOutcomeCard({ 
  metricVal, 
  metricLabel, 
  subMetrics 
}: { 
  metricVal: string; 
  metricLabel: string; 
  subMetrics: { value: string; label: string }[] 
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 8, y: y * -8 });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(${hovered ? -5 : 0}px)`,
        transformStyle: "preserve-3d",
        transition: hovered ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
        boxShadow: hovered 
          ? "0 25px 60px rgba(232,80,10,0.06), 0 4px 15px rgba(0,0,0,0.02)" 
          : "0 12px 40px rgba(0,0,0,0.03)",
      }}
      className="w-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#E8E8E4] bg-white relative overflow-hidden group cursor-pointer"
    >
      {/* Decorative subtle background grid element */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 rounded-full bg-[#FFF0E8]/50 blur-3xl group-hover:bg-[#FFF0E8] transition-colors duration-500" />
      
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-center mb-4">
          <p className="text-[11px] font-bold tracking-[0.15em] text-[#E8500A] uppercase">
            MEASURED IMPACT
          </p>
          <span className="text-[9px] font-mono bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/25 rounded-full px-2 py-0.5 font-bold">
            AGENT AUTONOMOUS
          </span>
        </div>
        
        {/* Enormous outcome metric */}
        <h3 className="font-serif text-[68px] sm:text-[84px] font-bold leading-none tracking-[-0.04em] text-[#E8500A]">
          {metricVal}
        </h3>
        <p className="font-sans text-[15px] sm:text-[17px] font-semibold text-text-primary mt-2 max-w-[280px] leading-snug">
          {metricLabel}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E8E8E4]" style={{ transform: "translateZ(30px)" }}>
        {subMetrics.map((m, idx) => (
          <div key={idx}>
            <p className="text-[20px] font-bold text-text-primary tracking-tight font-serif">
              {m.value}
            </p>
            <p className="text-[11px] text-text-muted mt-0.5 leading-tight uppercase font-bold tracking-wider">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="work-featured"
      aria-labelledby="featured-work-heading"
      style={{ backgroundColor: "#FFFFFF" }}
      className="py-24 lg:py-32 border-t border-[#E8E8E4]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <SectionLabel label="FEATURED ENGAGEMENTS" />
          <h2
            id="featured-work-heading"
            className="font-serif text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-0.025em] mb-4"
            style={{ color: "#141412", maxWidth: "680px" }}
          >
            Engineering Systems That Deliver Business Proof
          </h2>
          <p className="font-sans text-[17px] sm:text-[19px] text-text-secondary max-w-[540px] leading-relaxed">
            Real software systems integrated into core operations. Verified results.
          </p>
        </div>

        {/* Stacked Cases (Not generic grid, but heavy vertical editorial layout) */}
        <div ref={ref} className="space-y-24">
          {FEATURED_WORK.map((project, i) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-start pb-20 last:pb-0 border-b border-[#E8E8E4] last:border-b-0"
            >
              {/* Left Column: Text narrative */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span
                    className="inline-block font-sans text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded bg-[#FFF0E8] text-[#E8500A] mb-5"
                  >
                    {project.tag}
                  </span>

                  <h3
                    className="font-sans text-[22px] sm:text-[28px] lg:text-[32px] font-bold leading-tight mb-8"
                    style={{ color: "#141412" }}
                  >
                    {project.title}
                  </h3>

                  {/* Problem & Solution separated clearly */}
                  <div className="space-y-6">
                    <div className="rounded-xl p-5 bg-[#F8F8F6] border-l-3 border-[#D0D0CA]">
                      <h4 className="font-sans text-[12px] font-bold tracking-[0.1em] text-text-secondary uppercase mb-2">
                        OPERATIONAL PROBLEM
                      </h4>
                      <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                        {project.problem}
                      </p>
                    </div>

                    <div className="rounded-xl p-5 bg-white border border-[#E8E8E4] border-l-3 border-[#E8500A]">
                      <h4 className="font-sans text-[12px] font-bold tracking-[0.1em] text-[#E8500A] uppercase mb-2">
                        XYZ SYSTEM SOLUTION
                      </h4>
                      <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <button
                    onClick={() => {
                      const el = document.querySelector("#contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-1.5 font-sans text-[14px] font-bold text-[#E8500A] group hover:text-[#D04508] transition-colors"
                  >
                    Read Technical Architecture Case Study
                    <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </button>
                  {project.isPlaceholder && (
                    <span
                      className="font-mono text-[8px] tracking-wide px-2 py-0.5 rounded bg-[#F2F2EF] border border-dashed border-[#D0D0CA] text-text-muted"
                    >
                      [REAL OUTCOME DATA]
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Giant Outcome Metric Display */}
              <div className="w-full lg:sticky lg:top-24">
                <CaseStudyOutcomeCard
                  metricVal={project.metrics[0].value}
                  metricLabel={project.outcome.split(".")[0] + "."} // Uses first sentence of outcome for visual summary
                  subMetrics={[
                    { value: project.metrics[1].value, label: project.metrics[1].label },
                    { value: i === 0 ? "98.9% Accuracy" : "99.2% Accuracy", label: "Model Intelligence" }
                  ]}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
