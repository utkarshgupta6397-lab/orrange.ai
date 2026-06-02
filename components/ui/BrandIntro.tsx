"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandIntro() {
  const [show, setShow] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("orrange-intro-seen")) {
      return;
    }
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    setShow(true);
    sessionStorage.setItem("orrange-intro-seen", "true");
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <IntroOverlay 
          isReducedMotion={isReducedMotion} 
          onComplete={() => setShow(false)} 
        />
      )}
    </AnimatePresence>
  );
}

function IntroOverlay({ isReducedMotion, onComplete }: { isReducedMotion: boolean; onComplete: () => void }) {
  useEffect(() => {
    // Total sequence: 2.75s + 0.35s fade out = 3.1s
    const delay = isReducedMotion ? 1500 : 2750;
    const timer = setTimeout(() => {
      onComplete();
    }, delay);
    return () => clearTimeout(timer);
  }, [isReducedMotion, onComplete]);

  const engineeredEase = [0.25, 1, 0.5, 1];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background Subtle Glow - Barely noticeable */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#E8500A]/[0.015] blur-[8px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[600px] px-6">
        
        {/* Top Horizontal Line */}
        {!isReducedMotion && (
          <motion.div 
            className="h-[1px] bg-[#E8500A]/65 mb-10"
            style={{ originX: 0.5 }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, delay: 1.45, ease: engineeredEase }}
          />
        )}

        {/* Logo Container */}
        <div className="relative flex items-center justify-center w-[96px] h-[97px] mb-8">
          {isReducedMotion ? (
            <svg 
              width="96" 
              height="97" 
              viewBox="0 0 68 69" 
              fill="none"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
            >
              <path d="M34 0C52.7777 0 68 15.2223 68 34C68 51.6984 54.477 66.2356 37.2002 67.8486V55.3633C47.6118 53.8169 55.6004 44.8417 55.6006 34C55.6004 22.071 45.929 12.4006 34 12.4004C22.071 12.4006 12.4006 22.071 12.4004 34C12.4005 41.9945 16.7445 48.9742 23.2002 52.709V66.248C9.71686 61.7345 0 49.0023 0 34C0 15.2223 15.2223 0 34 0Z" fill="#E8500A"/>
              <path d="M40.7848 21.2C41.1692 21.2 41.5835 21.2244 42.0279 21.2722C42.4725 21.3202 42.8634 21.3857 43.1998 21.4695V28.2625C42.8393 28.1547 42.3405 28.0592 41.7037 27.9754C41.067 27.8915 40.4843 27.8494 39.9557 27.8494C38.8261 27.8494 37.8166 28.0955 36.9273 28.5867C36.0501 29.0659 35.3533 29.7368 34.8365 30.5994C34.3318 31.462 34.0787 32.4566 34.0787 33.5828V49.2H33.9996V68.3836C31.3806 68.3074 28.8369 67.933 26.4 67.2937V21.5955H33.8443V26.4119H34.1334C34.6381 24.6987 35.4848 23.4047 36.6744 22.5301C37.8641 21.6435 39.2346 21.2 40.7848 21.2Z" fill="#FFFFFF"/>
            </svg>
          ) : (
            <svg 
              width="96" 
              height="97" 
              viewBox="0 0 68 69" 
              fill="none" 
              className="relative z-10"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
            >
              {/* STAGE 1 & 3: Orange Ring */}
              <motion.path 
                d="M34 0C52.7777 0 68 15.2223 68 34C68 51.6984 54.477 66.2356 37.2002 67.8486V55.3633C47.6118 53.8169 55.6004 44.8417 55.6006 34C55.6004 22.071 45.929 12.4006 34 12.4004C22.071 12.4006 12.4006 22.071 12.4004 34C12.4005 41.9945 16.7445 48.9742 23.2002 52.709V66.248C9.71686 61.7345 0 49.0023 0 34C0 15.2223 15.2223 0 34 0Z" 
                stroke="#E8500A" 
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{ 
                  pathLength: { duration: 0.8, ease: engineeredEase },
                  opacity: { duration: 1.65, times: [0, 0.878, 1], ease: "linear" } 
                }}
              />
              <motion.path 
                d="M34 0C52.7777 0 68 15.2223 68 34C68 51.6984 54.477 66.2356 37.2002 67.8486V55.3633C47.6118 53.8169 55.6004 44.8417 55.6006 34C55.6004 22.071 45.929 12.4006 34 12.4004C22.071 12.4006 12.4006 22.071 12.4004 34C12.4005 41.9945 16.7445 48.9742 23.2002 52.709V66.248C9.71686 61.7345 0 49.0023 0 34C0 15.2223 15.2223 0 34 0Z" 
                fill="#E8500A"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 1.45, ease: "easeIn" }}
              />
              
              {/* STAGE 2 & 4: Inner White Mark */}
              <motion.path 
                d="M40.7848 21.2C41.1692 21.2 41.5835 21.2244 42.0279 21.2722C42.4725 21.3202 42.8634 21.3857 43.1998 21.4695V28.2625C42.8393 28.1547 42.3405 28.0592 41.7037 27.9754C41.067 27.8915 40.4843 27.8494 39.9557 27.8494C38.8261 27.8494 37.8166 28.0955 36.9273 28.5867C36.0501 29.0659 35.3533 29.7368 34.8365 30.5994C34.3318 31.462 34.0787 32.4566 34.0787 33.5828V49.2H33.9996V68.3836C31.3806 68.3074 28.8369 67.933 26.4 67.2937V21.5955H33.8443V26.4119H34.1334C34.6381 24.6987 35.4848 23.4047 36.6744 22.5301C37.8641 21.6435 39.2346 21.2 40.7848 21.2Z" 
                stroke="#FFFFFF"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{ 
                  pathLength: { duration: 0.65, delay: 0.8, ease: engineeredEase },
                  opacity: { duration: 1.05, delay: 0.8, times: [0, 0.809, 1], ease: "linear" } 
                }}
              />
              <motion.path 
                d="M40.7848 21.2C41.1692 21.2 41.5835 21.2244 42.0279 21.2722C42.4725 21.3202 42.8634 21.3857 43.1998 21.4695V28.2625C42.8393 28.1547 42.3405 28.0592 41.7037 27.9754C41.067 27.8915 40.4843 27.8494 39.9557 27.8494C38.8261 27.8494 37.8166 28.0955 36.9273 28.5867C36.0501 29.0659 35.3533 29.7368 34.8365 30.5994C34.3318 31.462 34.0787 32.4566 34.0787 33.5828V49.2H33.9996V68.3836C31.3806 68.3074 28.8369 67.933 26.4 67.2937V21.5955H33.8443V26.4119H34.1334C34.6381 24.6987 35.4848 23.4047 36.6744 22.5301C37.8641 21.6435 39.2346 21.2 40.7848 21.2Z" 
                fill="#FFFFFF"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 1.65, ease: "easeIn" }}
              />
            </svg>
          )}
        </div>

        {/* Text Reveal */}
        <div className="flex flex-col items-center">
          <motion.span 
            className="font-sans font-bold text-[19px] tracking-[0.02em] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: isReducedMotion ? 0 : 1.55, ease: "easeOut" }}
          >
            orrange.ai
          </motion.span>

          <motion.span 
            className="font-sans font-medium text-[13px] tracking-[0.03em] text-white/70 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.25, delay: isReducedMotion ? 0 : 2.0, ease: "easeOut" }}
          >
            AI-Native Business Systems
          </motion.span>
        </div>

        {/* Bottom Horizontal Line */}
        {!isReducedMotion && (
          <motion.div 
            className="h-[1px] bg-[#E8500A]/65 mt-10"
            style={{ originX: 0.5 }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, delay: 1.45, ease: engineeredEase }}
          />
        )}

      </div>
    </motion.div>
  );
}
