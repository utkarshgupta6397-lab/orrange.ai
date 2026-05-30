"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

interface DashboardPlaceholderProps {
  variant: "receivables" | "operations" | "automation";
  label: string;
}

function DashboardPlaceholder({ variant, label }: DashboardPlaceholderProps) {
  const activeColor = "#E8500A";
  
  return (
    <div
      className="w-full rounded-xl overflow-hidden relative border border-[#E8E8E4] bg-white transition-all duration-300"
      style={{ height: "260px", boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}
      aria-label={label}
    >
      {/* 1. Fake Browser Chrome */}
      <div className="h-8 border-b border-[#E8E8E4] bg-[#F8F8F6] flex items-center px-4 justify-between">
        <div className="flex gap-1.5">
          {["#FF5F57", "#FFBD2E", "#28CA40"].map((c) => (
            <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="h-4 w-40 rounded bg-white border border-[#E8E8E4] flex items-center justify-center">
          <span className="text-[8px] font-mono text-text-muted">app.xyzlabs.io/workspace</span>
        </div>
        <div className="w-8" />
      </div>

      {/* 2. Realistic Product Mockup Layout */}
      <div className="flex h-[calc(260px-32px)] text-[10px] text-text-primary">
        
        {/* Sidebar */}
        <div className="w-14 border-r border-[#E8E8E4] bg-[#F8F8F6] p-2 flex flex-col gap-2 flex-shrink-0">
          <div className="w-full h-4 rounded bg-[#E8500A]/10 flex items-center justify-center text-[#E8500A] font-bold text-[8px]">
            XYZ
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: i === 0 ? "#E8500A15" : "transparent" }}
            >
              <span
                className="w-2 h-2 rounded-[2px]"
                style={{ backgroundColor: i === 0 ? activeColor : "#D0D0CA" }}
              />
            </div>
          ))}
        </div>

        {/* Workspace Main Area */}
        <div className="flex-1 bg-white p-3 flex flex-col gap-2.5 overflow-hidden">
          
          {/* Header Row */}
          <div className="flex justify-between items-center pb-2 border-b border-[#E8E8E4]/60">
            <div>
              <p className="font-bold text-text-primary capitalize leading-none text-[11px]">
                {variant === "receivables" ? "Receivables Hub" : variant === "operations" ? "Operations Control" : "Automation Canvas"}
              </p>
              <p className="text-[8px] text-text-muted mt-0.5">Instance: Live Prod</p>
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-[8px] text-text-secondary font-semibold">Active Sync</span>
            </div>
          </div>

          {/* Render Dashboard based on Variant */}
          {variant === "receivables" && (
            <div className="flex-1 flex flex-col gap-2">
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-[#E8E8E4] p-2 bg-[#F8F8F6]/40">
                  <p className="text-[8px] text-text-muted leading-none">Net Balance</p>
                  <p className="text-[12px] font-bold text-text-primary mt-1">₹4.2M</p>
                </div>
                <div className="rounded-lg border border-[#E8E8E4] p-2 bg-[#F8F8F6]/40">
                  <p className="text-[8px] text-text-muted leading-none">Recovery Rate</p>
                  <p className="text-[12px] font-bold text-[#16A34A] mt-1">94.8%</p>
                </div>
                <div className="rounded-lg border border-[#E8E8E4] p-2 bg-[#E8500A]/5 border-[#E8500A]/20">
                  <p className="text-[8px] text-[#E8500A] leading-none font-semibold">Days Overdue</p>
                  <p className="text-[12px] font-bold text-[#E8500A] mt-1">11d avg</p>
                </div>
              </div>

              {/* Chart & Table */}
              <div className="grid grid-cols-2 gap-2 flex-1 items-stretch">
                <div className="border border-[#E8E8E4] rounded-lg p-2 flex flex-col justify-between">
                  <p className="text-[7px] font-bold text-text-secondary uppercase">Collections Timeline</p>
                  <div className="flex items-end gap-1 h-12 pt-2">
                    {[35, 60, 40, 85, 70, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{ height: `${h}%`, backgroundColor: i === 5 ? activeColor : "#D0D0CA" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="border border-[#E8E8E4] rounded-lg p-2 flex flex-col justify-between overflow-hidden">
                  <p className="text-[7px] font-bold text-text-secondary uppercase mb-1">Recent Reminders</p>
                  <div className="space-y-1">
                    {[
                      { client: "Starlight Corp", val: "₹180k", status: "Sent" },
                      { client: "Acme India", val: "₹450k", status: "Paid" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-[#E8E8E4]/40 pb-0.5 last:border-0">
                        <span className="text-[8px] font-semibold truncate max-w-[50px]">{row.client}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] text-text-secondary">{row.val}</span>
                          <span className={`text-[7px] px-1 rounded-full ${row.status === "Paid" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FFF0E8] text-[#E8500A]"}`}>{row.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {variant === "operations" && (
            <div className="flex-1 flex flex-col gap-2">
              {/* Main table list */}
              <div className="border border-[#E8E8E4] rounded-lg overflow-hidden flex-1 flex flex-col bg-[#F8F8F6]/20">
                <div className="bg-[#F8F8F6] border-b border-[#E8E8E4] px-2 py-1 flex justify-between font-bold text-[8px] text-text-secondary">
                  <span>DISPATCH PIPELINE</span>
                  <span>STATUS</span>
                </div>
                <div className="p-1.5 flex-1 flex flex-col gap-1.5 justify-center">
                  {[
                    { id: "ORD-9428", status: "Routed to Hub A", time: "1m ago", color: "#16A34A" },
                    { id: "ORD-9427", status: "Label Printed", time: "5m ago", color: "#E8500A" },
                    { id: "ORD-9426", status: "Carrier Assigned", time: "12m ago", color: "#3B82F6" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-[8.5px] border-b border-[#E8E8E4]/30 pb-1 last:border-0 last:pb-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-text-muted">{row.id}</span>
                        <span className="font-semibold text-text-primary">{row.status}</span>
                      </div>
                      <span className="text-[7.5px] text-text-muted">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {variant === "automation" && (
            <div className="flex-1 flex flex-col gap-2">
              {/* Nodes layout */}
              <div className="border border-[#E8E8E4] rounded-lg p-2.5 flex-1 flex items-center justify-between bg-[#F8F8F6]/30 relative overflow-hidden">
                
                {/* Node 1 */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded border border-[#E8E8E4] bg-white flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8500A" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <span className="text-[7px] text-text-muted">Inbound Mail</span>
                </div>

                {/* Arrow */}
                <div className="flex-1 border-t border-dashed border-[#E8500A]/50 mx-2 relative">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#E8500A]" style={{ transform: "rotate(45deg) translateY(-50%)" }} />
                </div>

                {/* Node 2 (XYZ Engine Core) */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded border border-[#E8500A] bg-[#141412] flex items-center justify-center shadow-md relative">
                    <span className="absolute inset-0 bg-[#E8500A]/10 animate-pulse rounded" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8500A" strokeWidth="2">
                      <polygon points="12,2 2,22 22,22" />
                    </svg>
                  </div>
                  <span className="text-[7px] font-bold text-text-primary">XYZ Classify</span>
                </div>

                {/* Arrow */}
                <div className="flex-1 border-t border-dashed border-[#16A34A]/50 mx-2 relative">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#16A34A]" style={{ transform: "rotate(45deg) translateY(-50%)" }} />
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded border border-[#86EFAC] bg-[#F0FDF4] flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-[7px] text-text-muted">Post ERP</span>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Subtle overlay badge (labeled clearly as placeholder screenshot but extremely sleek) */}
      <div className="absolute bottom-2 right-2 z-10">
        <span
          className="font-mono text-[7px] font-bold tracking-wider px-2 py-0.5 rounded bg-[#141412] text-white/95"
        >
          [DEMO PREVIEW]
        </span>
      </div>
    </div>
  );
}

const BUILT_ITEMS = [
  {
    variant: "receivables" as const,
    title: "Receivables Management Platform",
    description: "Track collections, customer balances and recovery performance automatically.",
    tag: "FINTECH",
  },
  {
    variant: "operations" as const,
    title: "Operations Dashboard",
    description: "Centralised real-time visibility across critical fulfillment & logistics workflows.",
    tag: "OPERATIONS",
  },
  {
    variant: "automation" as const,
    title: "Workflow Automation Engine",
    description: "Replace manual, repetitive document parsing and API postings with resilient code pipelines.",
    tag: "AUTOMATION",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

// ─── 3D Hover Tilt Product Card ───
function ProductCard({ item, index, inView }: { item: typeof BUILT_ITEMS[0]; index: number; inView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 10, y: y * -10 });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(${hovered ? -5 : 0}px)`,
        transformStyle: "preserve-3d",
        transition: hovered ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
        boxShadow: hovered 
          ? "0 20px 48px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.02)" 
          : "0 4px 20px rgba(0,0,0,0.02)",
      }}
      className="rounded-2xl overflow-hidden cursor-default transition-all duration-200 border border-[#E8E8E4] bg-white flex flex-col justify-between"
    >
      {/* Dashboard visual */}
      <div className="p-4 pb-0 bg-[#F8F8F6]/30" style={{ transform: "translateZ(20px)" }}>
        <DashboardPlaceholder
          variant={item.variant}
          label={`Realistic UI dashboard rendering for ${item.title}`}
        />
      </div>

      {/* Card body */}
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          <span
            className="inline-block font-sans text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded bg-[#FFF0E8] text-[#E8500A] mb-4"
          >
            {item.tag}
          </span>
          <h3
            className="font-sans text-[16px] font-bold leading-snug mb-2"
            style={{ color: "#141412" }}
          >
            {item.title}
          </h3>
          <p
            className="font-sans text-[13.5px] leading-relaxed"
            style={{ color: "#5A5A54" }}
          >
            {item.description}
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-[#E8E8E4]/60 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[#16A34A] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            In Production
          </span>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[11px] font-bold text-[#E8500A] hover:text-[#D04508] transition-colors"
          >
            Details →
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function WhatWeBuilt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  return (
    <section
      id="work"
      ref={ref}
      aria-labelledby="built-heading"
      style={{ backgroundColor: "#F8F8F6" }}
      className="py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <SectionLabel label="WHAT WE'VE BUILT" />
            <h2
              id="built-heading"
              className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em]"
              style={{ color: "#141412", maxWidth: "600px" }}
            >
              Software Shipped to Production
            </h2>
            <p
              className="font-sans text-[16px] sm:text-[18px] leading-relaxed mt-4"
              style={{ color: "#5A5A54", maxWidth: "520px" }}
            >
              Real products, tools, and systems built to optimize core business processes.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-shrink-0 font-sans text-[14px] font-bold flex items-center gap-1.5 transition-colors text-[#E8500A] hover:text-[#D04508] group"
          >
            Request a custom demo
            <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Cards grid with Stagger Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {BUILT_ITEMS.map((item, i) => (
            <ProductCard 
              key={item.title}
              item={item}
              index={i}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
