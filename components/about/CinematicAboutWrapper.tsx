"use client";

import { useRef, useEffect, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

export default function CinematicAboutWrapper({ children }: Props) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  // ── Spotlight: lerp interpolation on rAF ──
  const updateSpotlight = useCallback(() => {
    const dx = mouse.current.x - smoothMouse.current.x;
    const dy = mouse.current.y - smoothMouse.current.y;
    smoothMouse.current.x += dx * 0.08;
    smoothMouse.current.y += dy * 0.08;

    if (spotlightRef.current) {
      spotlightRef.current.style.transform = `translate(${smoothMouse.current.x - 250}px, ${smoothMouse.current.y - 250}px)`;
    }

    rafId.current = requestAnimationFrame(updateSpotlight);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY + window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateSpotlight]);

  // ── Ambient Particles: Canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      isEmber: boolean;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = 30;
      for (let i = 0; i < count; i++) {
        const isEmber = i < 5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2 - 0.1,
          size: isEmber ? 2 + Math.random() * 3 : 1 + Math.random() * 1.5,
          opacity: isEmber ? 0.04 + Math.random() * 0.06 : 0.02 + Math.random() * 0.04,
          isEmber,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.isEmber) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          gradient.addColorStop(0, `rgba(255, 90, 31, ${p.opacity * 2})`);
          gradient.addColorStop(1, `rgba(255, 90, 31, 0)`);
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgba(255, 138, 85, ${p.opacity})`;
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Orange Spotlight — fixed layer following cursor */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(255,90,31,0.10) 0%, rgba(255,90,31,0.04) 30%, rgba(255,90,31,0) 65%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />

      {/* Ambient Particles — canvas behind everything */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[0]"
        style={{ opacity: 1 }}
      />

      {/* Page Content */}
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
}
