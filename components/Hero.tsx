"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── Canvas particle data-fabric ─────────────────── */
function useParticleCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0, h = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
      pulse: number; pulseSpeed: number;
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = Array.from({ length: 90 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12,
        size: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
      }));
    };

    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initParticles();
      }, 120);
    };

    // Initial setup without debounce
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initParticles();

    window.addEventListener("resize", resize);

    const GOLD = [196, 165, 90];
    const ICE  = [168, 196, 212];
    const CONN_DIST = 160;
    const CONN_DIST_SQ = CONN_DIST * CONN_DIST;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // Draw connections — use squared distance to skip sqrt for most pairs
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONN_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / CONN_DIST;
            const mix = (p.x / w + q.x / w) / 2;
            const r = GOLD[0] * (1 - mix) + ICE[0] * mix;
            const g = GOLD[1] * (1 - mix) + ICE[1] * mix;
            const b = GOLD[2] * (1 - mix) + ICE[2] * mix;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${r|0},${g|0},${b|0},${t * 0.07})`;
            ctx.lineWidth = t * 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes using shadowBlur for glow (avoids per-frame gradient object creation)
      ctx.save();
      for (const p of particles) {
        const pulse = Math.sin(p.pulse) * 0.3 + 0.7;
        const mix = p.x / w;
        const r = (GOLD[0] * (1 - mix) + ICE[0] * mix) | 0;
        const g = (GOLD[1] * (1 - mix) + ICE[1] * mix) | 0;
        const b = (GOLD[2] * (1 - mix) + ICE[2] * mix) | 0;
        const fillColor = `rgba(${r},${g},${b},${p.alpha * pulse})`;

        ctx.shadowColor = fillColor;
        ctx.shadowBlur = p.size * 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
    };
  }, [ref]);
}

/* ── Component ────────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Canvas particle layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.85 }}
      />

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_30%,#000008_100%)] pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#000008] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#c4a55a]/50" />
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#c4a55a]/70 font-medium">
            Kaltech AI × Dynavisor
          </span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#c4a55a]/50" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3.2rem,9vw,8rem)] font-light leading-[0.95] tracking-[-0.01em] text-[#e2ddd4] mb-6"
        >
          Sovereign AI
          <br />
          <em className="gradient-gold not-italic">Infrastructure</em>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#e2ddd4]/45 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12 font-light tracking-wide"
        >
          Transform any compute cluster into a supercomputer.
          <br className="hidden sm:block" />
          Up to <span className="text-[#e2ddd4]/75">22× faster</span> · <span className="text-[#e2ddd4]/75">33% lower cost</span> · runs on your infrastructure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a href="#contact" className="btn-gold">
            Request Access <ArrowRight size={13} />
          </a>
          <a href="#products" className="btn-ghost">
            Explore Platform
          </a>
          <a href="#technology" className="btn-ghost">
            How It Works
          </a>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: "8,000", unit: " MB/s", label: "Peak Throughput" },
            { value: "22×",   unit: "",       label: "Performance Gain" },
            { value: "10×",   unit: "",       label: "Faster than NFS" },
            { value: "33%",   unit: "",       label: "OpEx Reduction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-light tracking-tight text-[#e2ddd4]">
                {s.value}<span className="text-[#c4a55a]">{s.unit}</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#e2ddd4]/28 mt-1 font-sans">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#e2ddd4]/20 font-sans">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#c4a55a]/30 to-transparent" />
      </motion.div>
    </section>
  );
}
