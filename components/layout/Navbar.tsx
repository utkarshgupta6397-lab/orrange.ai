"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { OrrangeLogo } from "@/components/ui/OrrangeLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const isActive = (href: string) => {
    if (href.includes("#")) {
      const path = href.split("#")[0] || "/";
      const hash = "#" + href.split("#")[1];
      return pathname === path && activeHash === hash;
    }
    return pathname === href && !activeHash;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intelligent Theme Detection based on section bounding boxes
  useEffect(() => {
    const updateTheme = () => {
      const darkElements = document.querySelectorAll('[data-theme="dark"]');
      let foundDark = false;
      
      darkElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check if the 72px height navbar overlaps with the dark section
        if (rect.top <= 72 && rect.bottom >= 72) {
          foundDark = true;
        }
      });
      
      setIsDarkTheme(foundDark);
    };

    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme, { passive: true });
    
    // Initial runs
    updateTheme();
    const timer = setTimeout(updateTheme, 150);

    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
      clearTimeout(timer);
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const router = useRouter();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    
    if (href.includes("#")) {
      setActiveHash("#" + href.split("#")[1]);
    } else {
      setActiveHash("");
    }
    
    // If it's a hash link for the current page
    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.replace("/", "");
      if (pathname !== "/") {
        // We are on another page, route to home with hash
        router.push(href);
        return;
      }
      
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(href);
      }
    } else {
      // Standard route
      router.push(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDarkTheme
              ? "bg-[#0F1115]/85 border-b border-white/10 backdrop-blur-md"
              : "bg-white/85 border-b border-[#E8E8E4] backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-[10px] flex-shrink-0 group transition-opacity duration-300 hover:opacity-80"
            aria-label="orrange.ai home"
          >
            <OrrangeLogo className="h-[30px] w-auto sm:h-[32px] flex-shrink-0" isDarkTheme={!mobileOpen && isDarkTheme} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <div key={link.label} className="relative flex flex-col items-center">
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`font-sans text-[14px] font-semibold cursor-pointer transition-colors duration-300 ${
                      active
                        ? "text-[#E8500A]"
                        : isDarkTheme
                        ? "text-white/70 hover:text-white"
                        : "text-[#5A5A54] hover:text-[#E8500A]"
                    }`}
                  >
                    {link.label}
                  </button>
                  {active && (
                    <motion.div
                      layoutId="desktopNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#E8500A]"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick("/#contact")}
              className="font-sans text-[13px] font-bold tracking-tight h-10 px-5 rounded-lg transition-all duration-150 cursor-pointer text-white bg-[#E8500A] hover:bg-[#D04508] hover:shadow-[0_2px_12px_rgba(232,80,10,0.2)] active:scale-[0.98]"
            >
              Book a Discovery Call
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
              className="block h-[1.5px] w-5 origin-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: mobileOpen ? "#141412" : (isDarkTheme ? "#FFFFFF" : "#141412") }}
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block h-[1.5px] w-5 rounded-full transition-colors duration-300"
              style={{ backgroundColor: mobileOpen ? "#141412" : (isDarkTheme ? "#FFFFFF" : "#141412") }}
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              className="block h-[1.5px] w-5 origin-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: mobileOpen ? "#141412" : (isDarkTheme ? "#FFFFFF" : "#141412") }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-[80px] pb-10 px-8"
          >
            <nav className="flex flex-col gap-6 flex-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <div key={link.label} className="relative w-fit">
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-left font-serif text-[32px] font-normal cursor-pointer transition-colors hover:opacity-60"
                      style={{ color: active ? "#E8500A" : "#141412" }}
                    >
                      {link.label}
                    </button>
                    {active && (
                      <motion.div
                        layoutId="mobileNavIndicator"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#E8500A]"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>
            <button
              onClick={() => { setMobileOpen(false); handleNavClick("/#contact"); }}
              className="w-full h-14 rounded-xl font-sans text-[16px] font-semibold cursor-pointer transition-all active:scale-[0.98]"
              style={{ backgroundColor: "#E8500A", color: "#FFFFFF" }}
            >
              Book a Discovery Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
