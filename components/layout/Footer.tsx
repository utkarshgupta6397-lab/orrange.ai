"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const FOOTER_COLUMNS = [
  {
    heading: "OUTCOMES",
    links: [
      { label: "Receivables & Collections", href: "#services" },
      { label: "Inventory & Dispatch", href: "#services" },
      { label: "Internal Operations", href: "#services" },
      { label: "Workflow Automation", href: "#services" },
      { label: "Executive Reporting", href: "#services" },
      { label: "Customer Support Systems", href: "#services" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Work", href: "#work" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "CONTACT",
    links: [
      { label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
      { label: "Book a call →", href: SITE_CONFIG.calendlyUrl },
    ],
  },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer style={{ backgroundColor: "#F8F8F6", borderTop: "1px solid #E8E8E4" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center">
                <span
                  className="absolute w-2 h-2 bg-orange rotate-45 rounded-[1px]"
                  aria-hidden="true"
                />
                <span
                  className="absolute w-0.5 h-0.5 bg-white rotate-45"
                  aria-hidden="true"
                />
              </div>
              <span
                className="font-sans text-[16px] font-bold tracking-[-0.02em]"
                style={{ color: "#141412" }}
              >
                {SITE_CONFIG.name}
              </span>
            </div>
            <p
              className="font-sans text-[13px] leading-relaxed mb-5 max-w-[200px]"
              style={{ color: "#9A9A93" }}
            >
              Building software systems that create measurable business outcomes.
            </p>
            <div className="flex gap-3">
              {/* LinkedIn */}
              <a
                href={SITE_CONFIG.linkedIn}
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-orange hover:text-white"
                style={{ backgroundColor: "#F2F2EF" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href={SITE_CONFIG.github}
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-orange hover:text-white"
                style={{ backgroundColor: "#F2F2EF" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p
                className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase mb-5"
                style={{ color: "#E8500A" }}
              >
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[14px] transition-colors duration-150 text-[#5A5A54] hover:text-[#E8500A]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #E8E8E4" }}
        >
          <p className="font-sans text-[12px]" style={{ color: "#9A9A93" }}>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href="#"
                className="font-sans text-[12px] transition-colors hover:opacity-100"
                style={{ color: "#9A9A93" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
