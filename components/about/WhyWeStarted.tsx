"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EMPHASIS_WORDS = ["systems", "operations", "outcomes", "software", "ownership", "bottlenecks", "automate", "automated", "bespoke"];

export default function WhyWeStarted() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const parasRef = useRef<HTMLParagraphElement[]>([]);

  useGSAP(() => {
    if (!quoteRef.current || parasRef.current.length === 0) return;

    const quoteSplit = new SplitType(quoteRef.current, { types: "words" });
    const splits: SplitType[] = [];
    
    const allWords = [...(quoteSplit.words || [])];

    parasRef.current.forEach(para => {
      const split = new SplitType(para, { types: "words" });
      splits.push(split);
      if (split.words) {
        allWords.push(...split.words);
      }
    });

    gsap.set(allWords, { opacity: 0.75, filter: "blur(2px)" });

    const revealWords = (words: HTMLElement[], triggerEl: HTMLElement, start: string, end: string) => {
      words.forEach((word, i) => {
        const text = word.textContent?.toLowerCase().replace(/[^a-z]/g, "") || "";
        const isEmphasis = EMPHASIS_WORDS.some(e => text.includes(e));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start,
            end,
            scrub: 0.6,
          },
        });

        tl.to(word, {
          opacity: 1,
          filter: "blur(0px)",
          color: isEmphasis ? "#FF5A1F" : undefined,
          duration: 0.1,
          delay: i * 0.02,
        });

        if (isEmphasis) {
          tl.to(word, {
            color: "rgba(255,255,255,0.95)",
            duration: 0.3,
            delay: 0.1,
          });
        }
      });
    };

    if (quoteSplit.words) {
      revealWords(quoteSplit.words, quoteRef.current, "top 85%", "top 45%");
    }

    parasRef.current.forEach((para, idx) => {
      if (splits[idx].words) {
        revealWords(splits[idx].words, para, "top 85%", "top 50%");
      }
    });

    return () => {
      quoteSplit.revert();
      splits.forEach(split => split.revert());
    };
  }, { scope: sectionRef });

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      data-theme="dark"
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">

        {/* UPPER LABEL */}
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#FF5A1F] uppercase block mb-3">
          THE REAL PROBLEM
        </span>

        {/* MEMORABLE CENTERPIECE QUOTE BLOCK */}
        <div className="grid md:grid-cols-[8px_1fr] gap-8 items-stretch max-w-3xl mx-auto relative mt-16 mb-24">
          
          {/* Subtle emotional background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-[#FF5A1F] opacity-[0.03] blur-[60px] pointer-events-none rounded-full" aria-hidden="true" />

          {/* Vertical Orange Accent Line */}
          <div className="hidden md:block w-[6px] bg-gradient-to-b from-[#FF5A1F] to-[#E8500A] rounded-full shadow-[0_0_15px_rgba(255,90,31,0.4)]" />

          <div className="relative pl-6 md:pl-2">
            {/* Quote Mark Graphic */}
            <div className="absolute -top-16 -left-6 font-serif text-[240px] text-white/[0.08] leading-none pointer-events-none select-none drop-shadow-md">
              &ldquo;
            </div>

            <h2
              ref={quoteRef}
              className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] text-white font-normal relative z-10 drop-shadow-md"
            >
              We saw companies spending millions on SaaS, yet their teams were still drowning in spreadsheets.
            </h2>
          </div>
        </div>

        {/* NARRATIVE LAYOUT */}
        <div className="grid sm:grid-cols-2 gap-10 max-w-3xl mx-auto border-t border-white/20 pt-12 relative z-10">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <p
              ref={(el) => { if (el) parasRef.current[0] = el; }}
              className="font-sans text-[16px] leading-relaxed text-[rgba(255,255,255,0.72)]"
            >
              Before starting orrange.ai, we worked on products and systems serving millions of users. The technology was impressive, but what stood out was something else: behind many successful businesses were teams still relying on spreadsheets, manual coordination, and disconnected software to keep operations running.
            </p>
            <p
              ref={(el) => { if (el) parasRef.current[1] = el; }}
              className="font-sans text-[16px] leading-relaxed text-[rgba(255,255,255,0.72)]"
            >
              We repeatedly saw companies invest heavily in large ERP platforms, only to use a small fraction of what they paid for. The software dictated how teams should work, while the actual operational challenges that made each business unique were left unsolved.
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <p
              ref={(el) => { if (el) parasRef.current[2] = el; }}
              className="font-sans text-[16px] leading-relaxed text-[rgba(255,255,255,0.72)]"
            >
              Traditional enterprise software was built around standardization. Modern businesses need adaptability.
            </p>
            <p
              ref={(el) => { if (el) parasRef.current[3] = el; }}
              className="font-sans text-[16px] leading-relaxed text-[rgba(255,255,255,0.72)]"
            >
              Most businesses pay for 100% of an ERP but actively use less than 20% of it. The remaining 80% adds complexity, training overhead, and rigid processes that teams learn to work around rather than benefit from.
            </p>
            <p
              ref={(el) => { if (el) parasRef.current[4] = el; }}
              className="font-sans text-[16px] leading-relaxed font-semibold text-[#FF5A1F]"
            >
              AI is only as powerful as the workflows beneath it.
            </p>
            <p
              ref={(el) => { if (el) parasRef.current[5] = el; }}
              className="font-sans text-[16px] leading-relaxed font-semibold text-white"
            >
              That&apos;s why we build AI-native operational systems that connect data, automate decisions, and remove repetitive work—so businesses can scale without increasing complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
