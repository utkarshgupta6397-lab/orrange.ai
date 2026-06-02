"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    details: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendingState, setSendingState] = useState<"idle" | "sending" | "success">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.details.trim()) newErrors.details = "Please share some details about your needs";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSendingState("sending");
    
    // Simulate sending message
    setTimeout(() => {
      setSendingState("success");
      setFormData({ name: "", email: "", company: "", budget: "", details: "" });
    }, 1800);
  };

  const getInputClasses = (hasError?: boolean, isTextarea?: boolean, extra?: string) => {
    const base = `w-full bg-black/40 border rounded-xl px-4 text-[13px] text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:outline-none transition-all duration-250 ${isTextarea ? 'py-4 resize-none' : 'h-12'}`;
    const borderState = hasError 
      ? 'border-[#FF5F57]/50 focus:border-[#FF5F57] focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_12px_rgba(255,95,87,0.15)]'
      : 'border-white/[0.08] focus:border-[#E8500A]/50 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_12px_rgba(232,80,10,0.15)]';
    return `${base} ${borderState} ${extra || ''}`.trim();
  };

  return (
    <section
      id="contact"
      ref={ref}
      data-theme="dark"
      aria-labelledby="cta-heading"
      style={{ backgroundColor: "#141412" }}
      className="py-24 lg:py-28 relative overflow-hidden"
    >
      <style>{`
        @keyframes ambientGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          33% {
            transform: translate(-48%, -52%) scale(1.05);
            opacity: 0.8;
          }
          66% {
            transform: translate(-52%, -48%) scale(0.95);
            opacity: 0.4;
          }
        }
        @keyframes glassSweep {
          0%, 80% {
            transform: translateX(-150%) skewX(-30deg);
            opacity: 0;
          }
          85% {
            opacity: 1;
          }
          90%, 100% {
            transform: translateX(150%) skewX(-30deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Background visual details: subtle warm gradient bubble */}
      <div 
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#E8500A]/10 to-transparent blur-[100px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
          }}
          className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-12 lg:gap-16 items-start"
        >
          {/* ── Left Side: Copy and details ── */}
          <div className="flex flex-col h-full justify-between lg:pr-6">
            <div>
              <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[#E8500A] uppercase block mb-4">
                WORK WITH US
              </span>
              
              <h2
                id="cta-heading"
                className="font-serif text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.08] tracking-[-0.02em] mb-6"
                style={{ color: "#FFFFFF" }}
              >
                Let&rsquo;s Automate Your Overhead.
              </h2>

              <p
                className="font-sans text-[15px] sm:text-[17px] leading-relaxed mb-8 text-white/70"
              >
                We build production-ready custom software systems, business integrations, and automated pipelines. 
                Share your operational challenges below — our lead systems engineer will review it and follow up in 24 hours.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="flex gap-4 items-center">
                <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E8500A] flex-shrink-0">
                  ✓
                </span>
                <div>
                  <p className="text-[12px] font-bold text-white leading-none">Discovery Blueprint</p>
                  <p className="text-[11px] text-white/50 mt-1">We draft custom architecture sketches for approved calls.</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E8500A] flex-shrink-0">
                  ✓
                </span>
                <div>
                  <p className="text-[12px] font-bold text-white leading-none">No Long-Term Bindings</p>
                  <p className="text-[11px] text-white/50 mt-1">We work in clear, weekly sprint loops with modular contracts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Side: Interactive dark-mode Contact Form ── */}
          <div className="relative w-full">
            {/* Ambient AI Glow Behind Form */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(232,80,10,0.08) 0%, rgba(200,80,10,0.04) 30%, rgba(150,30,10,0.01) 60%, transparent 80%)",
                filter: "blur(60px)",
                animation: "ambientGlow 28s ease-in-out infinite"
              }}
            />

            <div className="relative w-full rounded-2xl p-6 sm:p-8 min-h-[440px] flex flex-col justify-center overflow-hidden bg-[#101010]/[0.68] backdrop-blur-[24px] saturate-[1.2] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.2),0_20px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.3),0_30px_50px_-12px_rgba(0,0,0,0.9)] hover:bg-[#101010]/[0.62]">
              
              {/* Glass Reflection Sweep */}
              <div 
                className="absolute top-0 left-0 w-[150%] h-full pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                  filter: "blur(12px)",
                  animation: "glassSweep 12s cubic-bezier(0.2, 0.8, 0.2, 1) infinite"
                }}
              />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {sendingState !== "success" ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-[10px] font-bold tracking-wider text-white/60 uppercase">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={getInputClasses(!!errors.name)}
                            placeholder="Utkarsh Gupta"
                            disabled={sendingState === "sending"}
                          />
                          {errors.name && <span className="text-[9px] text-[#FF5F57]">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-[10px] font-bold tracking-wider text-white/60 uppercase">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={getInputClasses(!!errors.email)}
                            placeholder="you@company.com"
                            disabled={sendingState === "sending"}
                          />
                          {errors.email && <span className="text-[9px] text-[#FF5F57]">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Company */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="company" className="text-[10px] font-bold tracking-wider text-white/60 uppercase">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className={getInputClasses(false)}
                            placeholder="orrange.ai"
                            disabled={sendingState === "sending"}
                          />
                        </div>

                        {/* Budget Range */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="budget" className="text-[10px] font-bold tracking-wider text-white/60 uppercase">
                            Budget Range
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className={getInputClasses(false, false, "appearance-none cursor-pointer")}
                            disabled={sendingState === "sending"}
                          >
                            <option value="" disabled>Select a range...</option>
                            <option value="<10k">Under $10k</option>
                            <option value="10k-25k">$10k - $25k</option>
                            <option value="25k-50k">$25k - $50k</option>
                            <option value="50k+">$50k+</option>
                          </select>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="details" className="text-[10px] font-bold tracking-wider text-white/60 uppercase">
                          Bottlenecks or Project Details *
                        </label>
                        <textarea
                          id="details"
                          name="details"
                          value={formData.details}
                          onChange={handleInputChange}
                          rows={4}
                          className={getInputClasses(!!errors.details, true)}
                          placeholder="Tell us about the manual work, out-of-sync data, or custom dashboard requirements you need solved."
                          disabled={sendingState === "sending"}
                        />
                        {errors.details && <span className="text-[9px] text-[#FF5F57]">{errors.details}</span>}
                      </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full font-sans text-[14px] font-bold rounded-xl bg-[#E8500A] text-white hover:bg-[#D04508] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                    style={{ height: "52px" }}
                    disabled={sendingState === "sending"}
                  >
                    {sendingState === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Initiating Pipeline...
                      </>
                    ) : (
                      <>
                        Submit Blueprint Request
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center flex flex-col items-center justify-center py-6"
                >
                  {/* Glowing Green Checkmark */}
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(22,163,74,0.2)]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-white mb-3">
                    Message Received
                  </h3>
                  
                  <p className="text-[14px] text-white/60 max-w-[340px] leading-relaxed mb-6">
                    Your parameters have been logged. Our lead systems engineer will contact you directly within 24 hours to schedule a deep discovery call.
                  </p>

                  <button
                    onClick={() => setSendingState("idle")}
                    className="text-[12px] font-bold text-[#E8500A] hover:text-[#D04508] underline transition-colors"
                  >
                    Send another query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
