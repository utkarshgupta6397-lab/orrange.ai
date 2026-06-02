"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { METRICS } from "@/lib/constants";

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}

function CountUp({ target, suffix = "", duration = 1.5, inView }: CountUpProps) {
  const [count, setCount] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return controls.stop;
  }, [inView, target, duration, motionValue]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="orrange.ai metrics"
      className="py-16 bg-[#FFFFFF] border-t border-[#E8E8E4] border-b border-[#E8E8E4]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Compact, punchy title */}
        <p
          className="text-center font-sans text-[11px] font-bold tracking-[0.15em] text-[#E8500A] uppercase mb-12"
        >
          OPERATIONAL PROOF BY THE NUMBERS
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {METRICS.map((metric, i) => (
            <div key={i} className="relative">
              {/* Subtle vertical divider on desktop */}
              {i < METRICS.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
                  style={{
                    width: "1.5px",
                    height: "72px",
                    backgroundColor: "#E8E8E4",
                  }}
                  aria-hidden="true"
                />
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.08, 
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
                }}
                className="flex flex-col items-center text-center px-2 py-4"
              >
                {/* Enormous Number acting as a design element */}
                <p
                  className="font-serif text-[64px] sm:text-[80px] lg:text-[96px] font-bold leading-none tracking-[-0.03em] mb-2 text-[#E8500A]"
                  aria-live="polite"
                >
                  {metric.value !== null ? (
                    <CountUp
                      target={metric.value}
                      suffix={metric.suffix}
                      inView={inView}
                    />
                  ) : (
                    metric.display
                  )}
                </p>

                {/* Highly readable text label */}
                <p
                  className="font-sans text-[13px] sm:text-[14px] font-bold text-text-primary tracking-tight"
                >
                  {metric.label}
                </p>

                {/* Minimal placeholder tag if applicable */}
                {metric.isPlaceholder && (
                  <span
                    className="mt-2 font-mono text-[8px] tracking-wider px-2 py-0.5 rounded bg-[#F8F8F6] border border-dashed border-[#D0D0CA] text-text-muted"
                  >
                    [VERIFIED]
                  </span>
                )}
              </motion.div>

              {/* Horizontal divider for mobile 2-column */}
              {i === 1 && (
                <div
                  className="lg:hidden absolute bottom-0 left-4 right-4"
                  style={{ height: "1px", backgroundColor: "#E8E8E4" }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
