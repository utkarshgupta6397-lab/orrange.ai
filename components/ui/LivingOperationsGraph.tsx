"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, ShoppingCart, Package, CheckCircle, Wallet,
  Eye, Zap, Rocket, LayoutTemplate, Cpu, Activity
} from "lucide-react";

// Types
type NodeMapping = {
  [key: number]: number[];
};

// Data
const INPUTS = [
  { label: "Invoice Processing", icon: FileText },
  { label: "Customer Orders", icon: ShoppingCart },
  { label: "Inventory Management", icon: Package },
  { label: "Vendor Approvals", icon: CheckCircle },
  { label: "Collections & Follow-Ups", icon: Wallet },
];

const OUTCOMES = [
  { label: "Real-Time Visibility", icon: Eye },
  { label: "Automated Workflows", icon: Zap },
  { label: "Faster Operations", icon: Rocket },
  { label: "Fits Your Process", icon: LayoutTemplate },
  { label: "Own Your Software", icon: Cpu },
];

const INPUT_TO_OUTCOME_MAP: NodeMapping = {
  0: [1, 2],
  1: [1, 3],
  2: [0, 2],
  3: [2, 4],
  4: [0, 2],
};

const OUTCOME_TO_INPUT_MAP: NodeMapping = {};
OUTCOMES.forEach((_, outIdx) => {
  OUTCOME_TO_INPUT_MAP[outIdx] = [];
  INPUTS.forEach((_, inIdx) => {
    if (INPUT_TO_OUTCOME_MAP[inIdx]?.includes(outIdx)) {
      OUTCOME_TO_INPUT_MAP[outIdx].push(inIdx);
    }
  });
});

export default function LivingOperationsGraph() {
  const [hoveredSource, setHoveredSource] = useState<number | null>(null);
  const [hoveredOutcome, setHoveredOutcome] = useState<number | null>(null);
  const [hoveredCenter, setHoveredCenter] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outcomeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [anchors, setAnchors] = useState<{
    inputs: { x: number; y: number }[];
    outputs: { x: number; y: number }[];
    centerLeft: { x: number; y: number }[];
    centerRight: { x: number; y: number }[];
  } | null>(null);

  // Layout constants for SVG
  const VIEWBOX_W = 850; // Widened to make room for massive center
  const VIEWBOX_H = 680;

  const getSourceY = (index: number) => {
    const percent = 12 + index * (76 / (INPUTS.length - 1));
    return (percent / 100) * VIEWBOX_H;
  };

  const getOutcomeY = (index: number) => {
    const percent = 12 + index * (76 / (OUTCOMES.length - 1));
    return (percent / 100) * VIEWBOX_H;
  };

  const updateGeometry = () => {
    if (!svgRef.current || !cardRef.current) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    if (svgRect.width === 0 || svgRect.height === 0) return;

    const scaleX = VIEWBOX_W / svgRect.width;
    const scaleY = VIEWBOX_H / svgRect.height;

    const newAnchors = {
      inputs: inputRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        return {
          x: (rect.right - svgRect.left) * scaleX,
          y: ((rect.top + rect.height / 2) - svgRect.top) * scaleY
        };
      }),
      outputs: outcomeRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        return {
          x: (rect.left - svgRect.left) * scaleX,
          y: ((rect.top + rect.height / 2) - svgRect.top) * scaleY
        };
      }),
      centerLeft: INPUTS.map((_, i) => {
        const inputAnchorPercentage = (i + 1) / (INPUTS.length + 1);
        return {
          x: (cardRect.left - svgRect.left) * scaleX,
          y: ((cardRect.top + cardRect.height * inputAnchorPercentage) - svgRect.top) * scaleY
        };
      }),
      centerRight: OUTCOMES.map((_, i) => {
        const outputAnchorPercentage = (i + 1) / (OUTCOMES.length + 1);
        return {
          x: (cardRect.right - svgRect.left) * scaleX,
          y: ((cardRect.top + cardRect.height * outputAnchorPercentage) - svgRect.top) * scaleY
        };
      })
    };

    setAnchors((prev) => {
      if (!prev) return newAnchors;
      const isSame = JSON.stringify(prev) === JSON.stringify(newAnchors);
      return isSame ? prev : newAnchors;
    });
  };

  useLayoutEffect(() => {
    updateGeometry();
  }); // Run on every render cycle

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateGeometry();
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (cardRef.current) resizeObserver.observe(cardRef.current);
    if (svgRef.current) resizeObserver.observe(svgRef.current);
    
    inputRefs.current.forEach((el) => {
      if (el) resizeObserver.observe(el);
    });
    
    outcomeRefs.current.forEach((el) => {
      if (el) resizeObserver.observe(el);
    });
    
    window.addEventListener('resize', updateGeometry);

    let rAF2: number;
    const rAF1 = requestAnimationFrame(() => {
      rAF2 = requestAnimationFrame(() => {
        updateGeometry();
      });
    });

    return () => {
      cancelAnimationFrame(rAF1);
      if (rAF2) cancelAnimationFrame(rAF2);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateGeometry);
    };
  }, []);

  // The center block is 310px wide out of 850 = 36.4%
  // That means we give the sides roughly 31.8% padding
  const SIDE_PADDING = "31.5%";

  return (
    <div ref={containerRef} className="w-full relative select-none font-sans graph-container">
      
      {/* ── MOBILE / TABLET LAYOUT (Stacked) ── */}
      <div className="lg:hidden flex flex-col gap-5 w-full max-w-sm mx-auto">
        {/* Same mobile layout as before, just kept intact for responsive fallback */}
        <div className="flex flex-col gap-2">
          <p className="text-[9px] font-bold tracking-[0.1em] text-[#E8500A] uppercase text-center">Inputs</p>
          <div className="flex flex-wrap justify-center gap-2">
            {INPUTS.slice(0,3).map((src) => {
              const Icon = src.icon;
              return (
                <span key={src.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E8E8E4] bg-white text-[11px] font-semibold text-[#5A5A54] shadow-sm">
                  <Icon size={12} className="text-[#E8500A]" />
                  {src.label}
                </span>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-center py-1 text-[#E8E8E4]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

        <motion.div 
          id="ai-platform-center-mobile"
          className="relative rounded-[20px] p-5 text-left shadow-[0_16px_50px_rgba(232,80,10,0.12)] bg-white border border-[#E8500A]/30 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#E8500A]/5 launchpad-grid opacity-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="font-serif text-[26px] font-bold text-[#141412] leading-tight">AI Business Platform</h3>
            
            <div className="p-3 bg-[#FAFAFA] border border-[#E8E8E4] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8500A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8500A]"></span>
                </span>
                <span className="text-[10px] font-bold text-[#5A5A54] uppercase tracking-wider">Live Operations</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['Automation', 'Workflows', 'Reporting'].map(cap => (
                  <span key={cap} className="px-2 py-1 bg-[#FFF0E8]/50 border border-[#E8500A]/10 text-[#D04508] text-[9px] font-bold rounded-md">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center py-1 text-[#E8E8E4]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[9px] font-bold tracking-[0.1em] text-[#16A34A] uppercase text-center">Outputs</p>
          <div className="flex flex-wrap justify-center gap-2">
            {OUTCOMES.slice(0,3).map((out) => {
              const Icon = out.icon;
              return (
                <div key={out.label} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#86EFAC]/40 bg-[#F0FDF4] shadow-sm justify-center">
                  <Icon size={12} className="text-[#16A34A]" />
                  <span className="text-[11px] font-bold text-[#141412]">{out.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (Robust Center Engine) ── */}
      <div className="hidden lg:block relative w-full max-w-[800px] aspect-[1.25] mx-auto scale-[0.98] origin-center">
        
        {/* Background Details */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8500A]/3 to-transparent blur-[80px] pointer-events-none -z-10" />

        {/* SVG Connections Layer */}
        <svg 
          ref={svgRef}
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} 
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <radialGradient id="particle-orange-hero">
              <stop offset="0%" stopColor="#FF8A55" />
              <stop offset="100%" stopColor="#E8500A" />
            </radialGradient>
            <radialGradient id="particle-green-hero">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </radialGradient>
            <filter id="glow-hero" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Lines from Sources to Center */}
          {INPUTS.map((_, i) => {
            const hasBounds = anchors && anchors.inputs[i] && anchors.centerLeft[i];
            const startX = hasBounds ? anchors.inputs[i].x : 0;
            const startY = hasBounds ? anchors.inputs[i].y : 0;
            const endX = hasBounds ? anchors.centerLeft[i].x : 0;
            const endY = hasBounds ? anchors.centerLeft[i].y : 0;

            const pathD = hasBounds
              ? `M ${startX},${startY} C ${(startX + endX) / 2},${startY} ${(startX + endX) / 2},${endY} ${endX},${endY}`
              : `M 0,0 L 0,0`;
            
            const isRelatedToHoveredOutcome = hoveredOutcome !== null ? OUTCOME_TO_INPUT_MAP[hoveredOutcome]?.includes(i) : false;
            const isHighlighted = hoveredSource === i || isRelatedToHoveredOutcome || hoveredCenter;
            const isFaded = (hoveredSource !== null || hoveredOutcome !== null) && !isHighlighted;

            return (
              <g key={`src-path-hero-${i}`}>
                {/* Static Path - Always rendered so GSAP can find it on mount */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={isHighlighted ? "#E8500A" : "#E8E8E4"} 
                  strokeWidth={isHighlighted ? "1.5" : "1"}
                  strokeOpacity={isFaded ? 0.2 : 1}
                  strokeDasharray="1000"
                  strokeDashoffset="1000" // Handled by GSAP
                  className="transition-all duration-300 graph-path" 
                />
                
                {/* Moving Particles */}
                <g className="graph-particles" style={{ opacity: 0 }}>
                  <circle r={isHighlighted ? "3" : "2"} fill="url(#particle-orange-hero)" filter="url(#glow-hero)" opacity={isFaded ? 0.1 : (isHighlighted ? 1 : 0.7)} className="transition-all duration-300">
                    <animateMotion path={pathD} dur={`${3.5 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  {i % 2 === 0 && (
                    <circle r={isHighlighted ? "2.5" : "1.5"} fill="#60A5FA" opacity={isFaded ? 0.1 : (isHighlighted ? 0.9 : 0.5)} className="transition-all duration-300">
                      <animateMotion path={pathD} dur={`${4.5 + i * 0.2}s`} begin={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
                {/* Debug anchors */}
                {hasBounds && (
                  <>
                    <circle cx={startX} cy={startY} r="5" fill="red" />
                    <circle cx={endX} cy={endY} r="5" fill="red" />
                  </>
                )}
              </g>
            );
          })}

          {/* Lines from Center to Outcomes */}
          {OUTCOMES.map((_, i) => {
            const hasBounds = anchors && anchors.outputs[i] && anchors.centerRight[i];
            const startX = hasBounds ? anchors.centerRight[i].x : 0;
            const startY = hasBounds ? anchors.centerRight[i].y : 0;
            const endX = hasBounds ? anchors.outputs[i].x : 0;
            const endY = hasBounds ? anchors.outputs[i].y : 0;

            const pathD = hasBounds
              ? `M ${startX},${startY} C ${(startX + endX) / 2},${startY} ${(startX + endX) / 2},${endY} ${endX},${endY}`
              : `M 0,0 L 0,0`;
            
            const isRelatedToHoveredInput = hoveredSource !== null ? INPUT_TO_OUTCOME_MAP[hoveredSource]?.includes(i) : false;
            const isHighlighted = hoveredOutcome === i || isRelatedToHoveredInput || hoveredCenter;
            const isFaded = (hoveredOutcome !== null || hoveredSource !== null) && !isHighlighted;

            return (
              <g key={`out-path-hero-${i}`}>
                {/* Static Path - Always rendered so GSAP can find it on mount */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={isHighlighted ? "#16A34A" : "#E8E8E4"} 
                  strokeWidth={isHighlighted ? "1.5" : "1"} 
                  strokeOpacity={isFaded ? 0.2 : 1}
                  strokeDasharray="1000"
                  strokeDashoffset="1000" // Handled by GSAP
                  className="transition-all duration-300 graph-path"
                />
                
                {/* Moving Particles */}
                <g className="graph-particles" style={{ opacity: 0 }}>
                  <circle r={isHighlighted ? "3" : "2"} fill="url(#particle-green-hero)" filter="url(#glow-hero)" opacity={isFaded ? 0.1 : (isHighlighted ? 1 : 0.7)} className="transition-all duration-300">
                    <animateMotion path={pathD} dur={`${3.8 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  {i % 2 !== 0 && (
                    <circle r={isHighlighted ? "2.5" : "1.5"} fill="#60A5FA" opacity={isFaded ? 0.1 : (isHighlighted ? 0.9 : 0.5)} className="transition-all duration-300">
                      <animateMotion path={pathD} dur={`${4.5 + i * 0.2}s`} begin={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
                {/* Debug anchors */}
                {hasBounds && (
                  <>
                    <circle cx={startX} cy={startY} r="5" fill="red" />
                    <circle cx={endX} cy={endY} r="5" fill="red" />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Left Column: Business Operations Inputs */}
        {/* Takes up approx 21% of width based on 180 / 850 */}
        <div className="absolute left-0 top-0 w-[21.5%] h-full">
          {INPUTS.map((src, i) => {
            const topPercent = (getSourceY(i) / VIEWBOX_H) * 100;
            
            const isRelatedToHoveredOutcome = hoveredOutcome !== null ? OUTCOME_TO_INPUT_MAP[hoveredOutcome]?.includes(i) : false;
            const isHovered = hoveredSource === i;
            const isHighlighted = isHovered || isRelatedToHoveredOutcome;
            const isFaded = (hoveredSource !== null || hoveredOutcome !== null) && !isHighlighted;
            
            const Icon = src.icon;

            return (
              <div 
                key={src.label}
                onMouseEnter={() => setHoveredSource(i)}
                onMouseLeave={() => setHoveredSource(null)}
                className={`graph-input absolute w-full right-0 -translate-y-1/2 flex justify-end transition-all duration-300 ${isHighlighted ? 'z-10 -translate-y-[calc(50%+3px)]' : 'z-0'} ${isFaded ? 'opacity-40 grayscale' : ''}`}
                style={{ top: `${topPercent}%` }}
              >
                <div 
                  ref={el => { inputRefs.current[i] = el; }}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border bg-white shadow-sm transition-all duration-300 ${isHighlighted ? 'border-[#E8500A] shadow-[0_6px_16px_rgba(232,80,10,0.12)]' : 'border-[#E8E8E4]'}`}
                >
                  <Icon size={14} className={`transition-colors duration-300 ${isHighlighted ? 'text-[#E8500A]' : 'text-[#9A9A93]'}`} />
                  <p className={`text-[11px] font-semibold whitespace-nowrap transition-colors duration-300 ${isHighlighted ? 'text-[#141412]' : 'text-[#5A5A54]'}`}>
                    {src.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Node: Operations Engine */}
        {/* Takes up 36.5% width, perfectly between left edge 270 and right edge 580 */}
        <div 
          className="graph-engine absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-full"
          style={{ left: SIDE_PADDING, right: SIDE_PADDING, width: 'auto' }}
        >
          {/* Soft orange radial glow behind engine */}
          <div className="absolute inset-0 bg-[#E8500A]/15 blur-[60px] rounded-full scale-[1.3] pointer-events-none" />

          {/* Slow pulse every few seconds */}
          <motion.div 
            className="absolute w-[105%] h-[105%] rounded-[28px] border-2 border-[#E8500A]/10 bg-transparent"
            animate={{ scale: [1, 1.05, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ pointerEvents: 'none' }}
          />
          <motion.div 
            className="absolute w-[112%] h-[112%] rounded-[30px] border border-[#E8500A]/5 bg-transparent"
            animate={{ scale: [1, 1.05, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ pointerEvents: 'none' }}
          />

          <div 
            id="ai-platform-center"
            ref={cardRef}
            onMouseEnter={() => setHoveredCenter(true)}
            onMouseLeave={() => setHoveredCenter(false)}
            className={`w-full rounded-[24px] p-6 text-left cursor-default transition-all duration-300 relative bg-white flex flex-col gap-4 ${
              hoveredCenter 
                ? 'shadow-[0_24px_80px_rgba(232,80,10,0.18)] border border-[#E8500A]/60 -translate-y-1 scale-[1.02]' 
                : 'shadow-[0_16px_50px_rgba(0,0,0,0.08)] border border-[#E8500A]/30'
            }`}
          >
            {/* Inner background styling */}
            <div className="absolute inset-0 bg-[#E8500A]/5 launchpad-grid opacity-10 pointer-events-none rounded-[24px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none rounded-[24px]" />
            
            <div className="relative z-10 w-full">
              
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3 w-full">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#E8500A] font-bold uppercase block">
                  XYZ LABS
                </span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#F0FDF4] border border-[#86EFAC]/40 shadow-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#16A34A]"></span>
                  </span>
                  <span className="text-[8px] font-bold text-[#14532D] uppercase tracking-widest">AI Powered</span>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-[28px] sm:text-[32px] font-bold text-[#141412] leading-[1.05] tracking-tight">
                AI Business<br />Platform
              </h3>
              
              {/* Subtext */}
              <p className="text-[9px] sm:text-[10px] text-[#5A5A54] leading-relaxed mt-1 uppercase tracking-widest font-semibold">
                Designed Around Your Business
              </p>
              
              {/* Live Status Area */}
              <div className="mt-5 p-3.5 rounded-[12px] border border-[#E8E8E4] bg-[#FAFAFA]/90 flex flex-col gap-2.5 shadow-inner relative overflow-hidden">
                {/* Techy top border line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8500A]/30 to-transparent" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Activity size={12} className="text-[#E8500A]" />
                    <span className="text-[9.5px] font-bold text-[#5A5A54] uppercase tracking-widest">Live Operations</span>
                  </div>
                </div>
                
                {/* Animated Data Feed - Uses a CSS marquee trick for smooth scrolling */}
                <div className="h-[20px] overflow-hidden relative border-t border-[#E8E8E4]/50 pt-2">
                  <motion.div
                    animate={{ y: [0, -20, -40, -60, -80] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col gap-[9px] text-[10px] font-mono text-[#5A5A54]"
                  >
                    <span className="flex items-center gap-2"><span className="text-[#E8500A] font-bold">IN:</span> Orders_Received.json</span>
                    <span className="flex items-center gap-2"><span className="text-[#16A34A] font-bold">OUT:</span> Syncing_Inventory_DB</span>
                    <span className="flex items-center gap-2"><span className="text-[#E8500A] font-bold">IN:</span> Collections_Update.csv</span>
                    <span className="flex items-center gap-2"><span className="text-[#16A34A] font-bold">OUT:</span> Trigger_Automated_Email</span>
                    {/* Repeat for seamless loop */}
                    <span className="flex items-center gap-2"><span className="text-[#E8500A] font-bold">IN:</span> Orders_Received.json</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Capability Pills */}
              <div className="mt-5">
                <p className="text-[9px] font-bold text-[#9A9A93] uppercase tracking-widest mb-2.5 px-0.5">Core Capabilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Automation', 'Workflows', 'Reporting', 'AI Assistants'].map(cap => (
                    <span key={cap} className="px-2.5 py-1 bg-[#FFF0E8]/60 border border-[#E8500A]/15 text-[#D04508] text-[9.5px] font-bold rounded-md hover:bg-[#FFF0E8] transition-colors cursor-default">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Business Outcomes */}
        {/* Takes up approx 21% of width based on (850 - 670) / 850 */}
        <div className="absolute right-0 top-0 w-[21.5%] h-full">
          {OUTCOMES.map((out, i) => {
            const topPercent = (getOutcomeY(i) / VIEWBOX_H) * 100;
            
            const isRelatedToHoveredInput = hoveredSource !== null ? INPUT_TO_OUTCOME_MAP[hoveredSource]?.includes(i) : false;
            const isHovered = hoveredOutcome === i;
            const isHighlighted = isHovered || isRelatedToHoveredInput;
            const isFaded = (hoveredOutcome !== null || hoveredSource !== null) && !isHighlighted;
            
            const Icon = out.icon;

            return (
              <div 
                key={out.label}
                onMouseEnter={() => setHoveredOutcome(i)}
                onMouseLeave={() => setHoveredOutcome(null)}
                className={`graph-outcome absolute w-full left-0 -translate-y-1/2 flex justify-start transition-all duration-300 ${isHighlighted ? 'z-10 -translate-y-[calc(50%+3px)]' : 'z-0'} ${isFaded ? 'opacity-40 grayscale' : ''}`}
                style={{ top: `${topPercent}%` }}
              >
                <div 
                  ref={el => { outcomeRefs.current[i] = el; }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-300 ${isHighlighted ? 'bg-[#DCFCE7] border-[#16A34A]/50 shadow-[0_6px_16px_rgba(22,163,74,0.15)]' : 'bg-[#F0FDF4] border-[#86EFAC]/40 shadow-sm'}`}
                >
                  <Icon size={14} className={`transition-colors duration-300 ${isHighlighted ? 'text-[#16A34A]' : 'text-[#86EFAC]'}`} />
                  <p className={`text-[11px] font-bold whitespace-nowrap transition-colors duration-300 ${isHighlighted ? 'text-[#14532D]' : 'text-[#141412]'}`}>
                    {out.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
