"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function WorkflowVisualization() {
  const [activeStep, setActiveStep] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Auto loop through workflow steps to show movement
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 12, y: y * -12 });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div 
      className="w-full select-none font-sans relative cursor-pointer" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: hovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      aria-label="Interactive 3D AI workflow system layout"
    >
      {/* ── Outer 3D Glow Card Layer ── */}
      <div 
        className="rounded-2xl p-6 sm:p-7 border border-[#E8E8E4] bg-white/90 backdrop-blur-sm relative"
        style={{
          boxShadow: hovered 
            ? "0 30px 60px rgba(232,80,10,0.08), 0 4px 20px rgba(0,0,0,0.02)" 
            : "0 10px 40px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.01)",
          transition: "box-shadow 0.3s ease",
          transform: "translateZ(10px)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* System Header */}
        <div className="flex justify-between items-center mb-6" style={{ transform: "translateZ(20px)" }}>
          <div>
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#E8500A] uppercase block">
              Agent Orchestrator
            </span>
            <p className="text-[12px] font-bold text-text-primary mt-0.5">
              xyz-routing-model-v2
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#FFF0E8] border border-[#E8500A]/20 rounded-full px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-[9px] font-mono text-[#E8500A] font-bold">99.8% ACCURACY</span>
          </div>
        </div>

        {/* ── Main Layout Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_160px] items-center gap-4 lg:gap-5" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          
          {/* Column 1: Inputs */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[9px] font-bold tracking-[0.1em] text-text-muted uppercase">
              DATA SOURCES
            </p>

            {/* Input Card 1 */}
            <div
              className={`rounded-xl p-3 border transition-all duration-300 bg-white ${
                activeStep === 0 ? "border-[#E8500A] shadow-[0_2px_12px_rgba(232,80,10,0.06)]" : "border-[#E8E8E4]"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-text-primary">PDF Invoice</span>
                <span className="text-[8px] font-mono text-text-muted">ID: 9482</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 bg-[#F8F8F6] rounded px-1.5 py-0.5 w-max">
                <span className="w-1 h-1 rounded-full bg-[#E8500A]" />
                <span className="text-[8px] font-mono text-text-secondary">Classified: Bills</span>
              </div>
            </div>

            {/* Input Card 2 */}
            <div
              className={`rounded-xl p-3 border transition-all duration-300 bg-white ${
                activeStep === 1 ? "border-[#E8500A] shadow-[0_2px_12px_rgba(232,80,10,0.06)]" : "border-[#E8E8E4]"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-text-primary">Support Mail</span>
                <span className="text-[8px] font-mono text-text-muted">ID: 8527</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 bg-[#F8F8F6] rounded px-1.5 py-0.5 w-max">
                <span className="w-1 h-1 rounded-full bg-[#E8500A]" />
                <span className="text-[8px] font-mono text-text-secondary">Intent: Refund</span>
              </div>
            </div>

            {/* Input Card 3 */}
            <div
              className={`rounded-xl p-3 border transition-all duration-300 bg-white ${
                activeStep === 2 ? "border-[#E8500A] shadow-[0_2px_12px_rgba(232,80,10,0.06)]" : "border-[#E8E8E4]"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-text-primary">Inventory CSV</span>
                <span className="text-[8px] font-mono text-text-muted">ID: 2901</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 bg-[#F8F8F6] rounded px-1.5 py-0.5 w-max">
                <span className="w-1 h-1 rounded-full bg-[#E8500A]" />
                <span className="text-[8px] font-mono text-text-secondary">State: Out-of-Sync</span>
              </div>
            </div>
          </div>

          {/* Central AI Processor Engine */}
          <div className="flex flex-col items-center justify-center relative">
            
            {/* SVG Flow Lines */}
            <svg className="w-full h-24 hidden md:block" viewBox="0 0 160 96" fill="none">
              <path d="M 10,24 C 60,24 50,48 80,48" stroke={activeStep === 0 ? "#E8500A" : "#E8E8E4"} strokeWidth={activeStep === 0 ? "2" : "1"} className="transition-colors duration-300" />
              <path d="M 10,48 L 80,48" stroke={activeStep === 1 ? "#E8500A" : "#E8E8E4"} strokeWidth={activeStep === 1 ? "2" : "1"} className="transition-colors duration-300" />
              <path d="M 10,72 C 60,72 50,48 80,48" stroke={activeStep === 2 ? "#E8500A" : "#E8E8E4"} strokeWidth={activeStep === 2 ? "2" : "1"} className="transition-colors duration-300" />
              <path d="M 80,48 C 110,48 100,24 150,24" stroke={activeStep === 0 ? "#16A34A" : "#E8E8E4"} strokeWidth={activeStep === 0 ? "2" : "1"} className="transition-colors duration-300" />
              <path d="M 80,48 L 150,48" stroke={activeStep === 1 ? "#16A34A" : "#E8E8E4"} strokeWidth={activeStep === 1 ? "2" : "1"} className="transition-colors duration-300" />
              <path d="M 80,48 C 110,48 100,72 150,72" stroke={activeStep === 2 ? "#16A34A" : "#E8E8E4"} strokeWidth={activeStep === 2 ? "2" : "1"} className="transition-colors duration-300" />

              {/* Glowing signal balls */}
              {activeStep === 0 && (
                <>
                  <motion.circle r="2.5" fill="#E8500A" animate={{ offsetDistance: ["0%", "100%"] }}>
                    <animateMotion path="M 10,24 C 60,24 50,48 80,48" dur="1.4s" repeatCount="indefinite" />
                  </motion.circle>
                  <motion.circle r="2.5" fill="#16A34A" animate={{ offsetDistance: ["0%", "100%"] }}>
                    <animateMotion path="M 80,48 C 110,48 100,24 150,24" dur="1.4s" repeatCount="indefinite" />
                  </motion.circle>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <motion.circle r="2.5" fill="#E8500A" animate={{ offsetDistance: ["0%", "100%"] }}>
                    <animateMotion path="M 10,48 L 80,48" dur="1.4s" repeatCount="indefinite" />
                  </motion.circle>
                  <motion.circle r="2.5" fill="#16A34A" animate={{ offsetDistance: ["0%", "100%"] }}>
                    <animateMotion path="M 80,48 L 150,48" dur="1.4s" repeatCount="indefinite" />
                  </motion.circle>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <motion.circle r="2.5" fill="#E8500A" animate={{ offsetDistance: ["0%", "100%"] }}>
                    <animateMotion path="M 10,72 C 60,72 50,48 80,48" dur="1.4s" repeatCount="indefinite" />
                  </motion.circle>
                  <motion.circle r="2.5" fill="#16A34A" animate={{ offsetDistance: ["0%", "100%"] }}>
                    <animateMotion path="M 80,48 C 110,48 100,72 150,72" dur="1.4s" repeatCount="indefinite" />
                  </motion.circle>
                </>
              )}
            </svg>

            {/* Core Box */}
            <div className="rounded-xl border border-orange bg-[#141412] text-white p-3 text-center shadow-[0_0_24px_rgba(232,80,10,0.15)] relative overflow-hidden w-full max-w-[110px]">
              <div className="absolute inset-0 bg-[#E8500A]/5 animate-pulse" />
              <span className="text-[8px] font-bold text-[#E8500A] tracking-wider block uppercase mb-1">
                AI CORE
              </span>
              <p className="text-[10px] font-mono leading-none">Decision</p>
              <div className="mt-2.5 flex items-center justify-center gap-1 bg-[#242420] rounded-full py-0.5 px-2">
                <span className="w-1 h-1 rounded-full bg-[#16A34A] animate-ping" />
                <span className="text-[7.5px] text-white/80 font-mono">Routing</span>
              </div>
            </div>
          </div>

          {/* Column 3: Outputs */}
          <div className="flex flex-col gap-2.5">
            <p className="text-[9px] font-bold tracking-[0.1em] text-text-muted uppercase text-right md:text-left">
              ACTIONS
            </p>

            {/* Output Card 1 */}
            <div
              className={`rounded-xl p-3 border transition-all duration-300 bg-[#F0FDF4] ${
                activeStep === 0 ? "border-[#16A34A] shadow-[0_2px_12px_rgba(22,163,74,0.1)]" : "border-[#86EFAC]/30"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-text-primary">Ledger Post</span>
                <span className="text-[8px] font-mono text-[#16A34A] bg-[#DCFCE7] px-1 rounded font-bold">100%</span>
              </div>
              <p className="text-[9px] text-text-secondary leading-snug mt-1.5">
                Parsed by extractor agent.
              </p>
            </div>

            {/* Output Card 2 */}
            <div
              className={`rounded-xl p-3 border transition-all duration-300 bg-[#F0FDF4] ${
                activeStep === 1 ? "border-[#16A34A] shadow-[0_2px_12px_rgba(22,163,74,0.1)]" : "border-[#86EFAC]/30"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-text-primary">Email Drafted</span>
                <span className="text-[8px] font-mono text-[#16A34A] bg-[#DCFCE7] px-1 rounded font-bold">99.4%</span>
              </div>
              <p className="text-[9px] text-text-secondary leading-snug mt-1.5">
                Agent routing active.
              </p>
            </div>

            {/* Output Card 3 */}
            <div
              className={`rounded-xl p-3 border transition-all duration-300 bg-[#F0FDF4] ${
                activeStep === 2 ? "border-[#16A34A] shadow-[0_2px_12px_rgba(22,163,74,0.1)]" : "border-[#86EFAC]/30"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-text-primary">Inventory Sync</span>
                <span className="text-[8px] font-mono text-[#16A34A] bg-[#DCFCE7] px-1 rounded font-bold">100%</span>
              </div>
              <p className="text-[9px] text-text-secondary leading-snug mt-1.5">
                DB reconciled.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ── Floating 3D Workflow Panel Overlay (Simulates Depth Offset) ── */}
      <motion.div 
        className="absolute -bottom-6 -left-6 z-20 rounded-xl p-3 border border-[#E8E8E4] bg-white shadow-xl flex items-center gap-3"
        style={{
          transform: "translateZ(45px)",
          pointerEvents: "none"
        }}
        animate={{
          y: [0, -6, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-7 h-7 rounded-lg bg-[#FFF0E8] flex items-center justify-center text-[#E8500A] flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div>
          <p className="text-[9px] font-mono text-text-muted leading-none">SYS LATENCY</p>
          <p className="text-[11px] font-bold text-text-primary mt-0.5">140ms average</p>
        </div>
      </motion.div>

      {/* ── Second Floating Panel ── */}
      <motion.div 
        className="absolute -top-6 -right-6 z-20 rounded-xl p-3 border border-[#E8E8E4] bg-white shadow-xl flex items-center gap-3"
        style={{
          transform: "translateZ(55px)",
          pointerEvents: "none"
        }}
        animate={{
          y: [0, 6, 0]
        }}
        transition={{
          duration: 4,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div>
          <p className="text-[9px] font-mono text-text-muted leading-none">AI THREADS</p>
          <p className="text-[11px] font-bold text-text-primary mt-0.5">8 Agent workers</p>
        </div>
      </motion.div>
    </div>
  );
}
