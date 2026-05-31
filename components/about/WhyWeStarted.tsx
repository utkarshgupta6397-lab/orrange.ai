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
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const para3Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!quoteRef.current || !para1Ref.current || !para2Ref.current || !para3Ref.current) return;

    // Split all text elements into words
    const quoteSplit = new SplitType(quoteRef.current, { types: "words" });
    const p1Split = new SplitType(para1Ref.current, { types: "words" });
    const p2Split = new SplitType(para2Ref.current, { types: "words" });
    const p3Split = new SplitType(para3Ref.current, { types: "words" });

    // Set all words to dim
    const allWords = [
      ...(quoteSplit.words || []),
      ...(p1Split.words || []),
      ...(p2Split.words || []),
      ...(p3Split.words || []),
    ];
    gsap.set(allWords, { opacity: 0.75, filter: "blur(2px)" });

    // Helper: mark emphasis words with orange flash
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

    // Quote reveal
    if (quoteSplit.words) {
      revealWords(quoteSplit.words, quoteRef.current, "top 85%", "top 45%");
    }

    // Paragraph 1
    if (p1Split.words) {
      revealWords(p1Split.words, para1Ref.current, "top 85%", "top 50%");
    }

    // Paragraph 2
    if (p2Split.words) {
      revealWords(p2Split.words, para2Ref.current, "top 85%", "top 50%");
    }

    // Paragraph 3
    if (p3Split.words) {
      revealWords(p3Split.words, para3Ref.current, "top 85%", "top 50%");
    }

    return () => {
      quoteSplit.revert();
      p1Split.revert();
      p2Split.revert();
      p3Split.revert();
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
          <p
            ref={para1Ref}
            className="font-sans text-[16px] leading-relaxed text-[rgba(255,255,255,0.72)]"
          >
            Before starting XYZ Labs, we worked on systems scaling to millions of users. What surprised us was what happened behind the scenes: even the most successful companies were held together by manual data entry, disconnected tools, and fragile spreadsheets.
          </p>
          <div className="space-y-6">
            <p
              ref={para2Ref}
              className="font-sans text-[16px] leading-relaxed text-[rgba(255,255,255,0.72)]"
            >
              We realized that most software agencies are incentivized to sell hours, not outcomes. They build what they&apos;re told, collect their fees, and leave teams to deal with systems that don&apos;t actually automate the work.
            </p>
            <p
              ref={para3Ref}
              className="font-sans text-[16px] leading-relaxed font-semibold text-white"
            >
              We started XYZ Labs to do the opposite. We act as an extension of your operations team, building bespoke software that entirely eliminates bottlenecks.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
