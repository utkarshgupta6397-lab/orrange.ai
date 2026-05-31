"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import Link from "next/link";

const WHATSAPP_NUMBER = "916397632318";
const MESSAGE = `Hi XYZ Labs,

I came across your website and wanted to discuss building software around our existing business processes.

We're currently facing operational bottlenecks in:

---

Looking forward to connecting.`;

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  MESSAGE
)}`;

export default function WhatsAppFloat() {
  const [mounted, setMounted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  // 0: hidden, 1: delay, 2: particle moving, 3: morphing/ready, 4: tooltip shown
  const [phase, setPhase] = useState(0); 
  const [startCoords, setStartCoords] = useState<{x: number, y: number} | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const [showInitialTooltip, setShowInitialTooltip] = useState(false);
  const [showPeriodic, setShowPeriodic] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check local storage for dismissal
    const dismissedUntil = localStorage.getItem("whatsapp_bubble_dismissed");
    if (dismissedUntil) {
      const expiry = parseInt(dismissedUntil, 10);
      if (Date.now() < expiry) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem("whatsapp_bubble_dismissed");
      }
    }

    // Phase 1: Wait 4 seconds for hero to play out
    const t1 = setTimeout(() => {
      const desktopEl = document.getElementById("ai-platform-center");
      const mobileEl = document.getElementById("ai-platform-center-mobile");
      
      let el = null;
      // Simple check to see if desktop graph is hidden by CSS (in mobile view)
      if (desktopEl && window.getComputedStyle(desktopEl.closest('.hidden.lg\\:block') || desktopEl).display !== 'none') {
        el = desktopEl;
      } else if (mobileEl) {
        el = mobileEl;
      }

      if (el) {
        const rect = el.getBoundingClientRect();
        setStartCoords({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
        setPhase(2); // Start particle
      } else {
        setPhase(3); // Fallback if no graph on this page
      }
    }, 4000);

    return () => clearTimeout(t1);
  }, []);

  // Phase 2 to 3: Particle Journey is 1.5s
  useEffect(() => {
    if (phase === 2) {
      const t = setTimeout(() => {
        setPhase(3);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Phase 3 to 4: Tooltip delay
  useEffect(() => {
    if (phase === 3) {
      const t = setTimeout(() => {
        setPhase(4);
        setShowInitialTooltip(true);
        
        // Hide initial tooltip after 4 seconds
        setTimeout(() => {
          setShowInitialTooltip(false);
        }, 4000);
      }, 800); // 600ms morph + 200ms extra
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Periodic Reappearance every 25 seconds
  useEffect(() => {
    if (phase >= 4) {
      const interval = setInterval(() => {
        setShowPeriodic(true);
        setTimeout(() => {
          setShowPeriodic(false);
        }, 3000);
      }, 25000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 500);
  };

  // Premium Bubble at 8 seconds
  useEffect(() => {
    if (!mounted || isDismissed) return;
    const t = setTimeout(() => {
      setShowBubble(true);
      
      // Auto collapse after 8s of being shown
      const collapseT = setTimeout(() => {
        setShowBubble((prev) => {
          if (prev) {
            // Still shown, untouched -> collapse but don't strictly set dismissed for 7 days
            // We'll just hide it for this session to not annoy
            return false;
          }
          return prev;
        });
      }, 8000);
      
      return () => clearTimeout(collapseT);
    }, 8000);
    return () => clearTimeout(t);
  }, [mounted, isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setIsDismissed(true);
    // 7 days in milliseconds
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("whatsapp_bubble_dismissed", expiry.toString());
  };

  if (!mounted) return null;

  // Calculate endpoint based on screen size (roughly)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const endX = typeof window !== 'undefined' ? window.innerWidth - (isMobile ? 20 + 26 : 32 + 30) : 0;
  const endY = typeof window !== 'undefined' ? window.innerHeight - (isMobile ? 24 + 26 : 32 + 30) : 0;

  const isBadgeVisible = showInitialTooltip || showPeriodic || isHovered;

  return (
    <>
      {/* PHASE 2: Particle Journey */}
      {phase === 2 && startCoords && (
        <motion.div
          initial={{ 
            position: 'fixed', 
            left: startCoords.x, 
            top: startCoords.y, 
            x: "-50%", 
            y: "-50%",
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            left: endX, 
            top: endY,
            scale: [0, 1, 1, 0.5], // Pop in, stay, shrink slightly before morph
            opacity: [0, 1, 1, 0] // Fade out at the very end to handoff to button
          }}
          transition={{ 
            duration: 1.5, 
            ease: [0.34, 1.56, 0.64, 1], // Nice custom bezier for path
            scale: { duration: 1.5, times: [0, 0.2, 0.8, 1] },
            opacity: { duration: 1.5, times: [0, 0.1, 0.9, 1] }
          }}
          className="z-[110] w-[8px] h-[8px] bg-[#E8500A] rounded-full shadow-[0_0_15px_5px_rgba(255,87,34,0.5)] pointer-events-none"
        >
          {/* Particle Trail Effect Approximation */}
          <motion.div 
            className="absolute inset-0 bg-[#E8500A] rounded-full blur-[4px] opacity-60"
            animate={{ scale: [1, 2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* PHASE 3+: Button and Bubble */}
      {phase >= 3 && (
        <div className="fixed bottom-[24px] right-[20px] md:bottom-[32px] md:right-[32px] z-[100] flex flex-col items-end pointer-events-none">
          
          {/* Premium Touch Bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mb-4 mr-2 bg-[#1A1F2B] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 md:p-5 rounded-2xl rounded-br-sm max-w-[260px] md:max-w-[280px] pointer-events-auto"
              >
                <p className="text-white/90 font-sans text-[13px] md:text-[14px] leading-relaxed mb-4">
                  Need software built around your process?
                </p>
                <div className="flex items-center gap-3">
                  <Link 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowBubble(false)}
                    className="flex-1 bg-[#25D366] text-white text-[12px] md:text-[13px] font-bold py-2 px-3 rounded-lg text-center hover:bg-[#20bd5a] transition-colors"
                  >
                    Chat on WhatsApp →
                  </Link>
                  <button 
                    onClick={handleDismiss}
                    className="text-white/40 hover:text-white/80 transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
                    aria-label="Dismiss"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Morphing Button Container */}
          <div className="relative group pointer-events-auto">
            
            {/* Tooltip */}
            {phase >= 4 && (
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <div 
                  className={`px-3 py-1 bg-[#1A1F2B] text-white/90 text-[12px] font-medium rounded-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)] whitespace-nowrap transition-all ${
                    isBadgeVisible 
                      ? "opacity-100 translate-x-0 duration-[350ms]" 
                      : "opacity-0 translate-x-4 duration-300"
                  }`}
                >
                  <span className="block">Talk To A Founder</span>
                </div>
              </div>
            )}

            {/* Floating Animation Wrapper for Idle state */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-full text-white transition-transform duration-300 hover:scale-[1.08] shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)]"
                aria-label="Chat on WhatsApp"
              >
                {/* The background that morphs color */}
                <motion.div
                  initial={startCoords ? { backgroundColor: "#E8500A", scale: 0.1 } : { backgroundColor: "#25D366", scale: 0.8, opacity: 0 }}
                  animate={{ backgroundColor: "#25D366", scale: [null, 1.15, 1], opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full"
                />
                
                {/* The WhatsApp Icon that fades in */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: startCoords ? 0.2 : 0, duration: 0.4 }}
                  className="relative z-10"
                >
                  <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
                </motion.div>
                
                {/* Pulse Ring (CSS animation) */}
                <div className="absolute inset-0 rounded-full border-[2px] border-[#E8500A] opacity-0 animate-whatsapp-pulse pointer-events-none" />
              </Link>
            </motion.div>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.4; }
          10% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-whatsapp-pulse {
          animation: whatsapp-pulse 20s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
      `}} />
    </>
  );
}
