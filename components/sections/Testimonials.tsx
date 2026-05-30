"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { TESTIMONIALS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      aria-labelledby="testimonials-heading"
      style={{ backgroundColor: "#F8F8F6" }}
      className="py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center">
            <SectionLabel label="CLIENT RESULTS" />
          </div>
          <h2
            id="testimonials-heading"
            className="font-serif text-[32px] sm:text-[48px] leading-[1.12] tracking-[-0.015em] mb-4 mx-auto"
            style={{ color: "#141412", maxWidth: "560px" }}
          >
            What Clients Say After We Ship
          </h2>
          <p
            className="font-sans text-[17px] mx-auto text-text-secondary"
            style={{ maxWidth: "440px" }}
          >
            From the people who worked with us, in their own words.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={i}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="relative rounded-2xl p-8 bg-white border border-[#E8E8E4]/40 flex flex-col justify-between"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              }}
              aria-label={`Testimonial from ${t.name}`}
            >
              <div>
                {/* Quotation Icon and Placeholder Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className="font-serif text-[60px] leading-none -mt-4 text-[#E8500A]/30 select-none"
                    style={{ fontFamily: "Georgia, serif" }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  {t.isPlaceholder && (
                    <span
                      className="font-mono text-[7.5px] font-bold tracking-wider px-2 py-0.5 rounded bg-[#F8F8F6] border border-dashed border-[#D0D0CA] text-text-muted"
                    >
                      [CLIENT QUOTE]
                    </span>
                  )}
                </div>

                {/* Quote */}
                <p
                  className="font-sans text-[14.5px] leading-relaxed mb-6 text-text-primary"
                >
                  {t.quote}
                </p>
              </div>

              <div>
                {/* Divider */}
                <div
                  className="mb-5 border-t border-[#E8E8E4]/60"
                  aria-hidden="true"
                />

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-sans text-[13px] font-bold bg-[#FFF0E8] text-[#E8500A]"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>

                  <div>
                    <p
                      className="font-sans text-[14px] font-bold leading-none mb-1 text-text-primary"
                    >
                      {t.name}
                    </p>
                    <p
                      className="font-sans text-[12px] leading-none text-text-muted"
                    >
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
