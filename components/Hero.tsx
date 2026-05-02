'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fn = () => {
      if (lineRef.current) lineRef.current.style.opacity = window.scrollY > 60 ? '0' : '1'
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ zIndex: 1 }}
    >
      {/* Deep vignette — left-side clear, right and edges dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 80% at 22% 50%, rgba(6,8,16,0.55) 0%, rgba(6,8,16,0.97) 85%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 220, background: 'linear-gradient(to top, var(--void), transparent)' }}
      />

      <div className="container" style={{ paddingTop: 128, paddingBottom: 80, position: 'relative', zIndex: 2 }}>

        {/* Eyebrow */}
        <motion.div {...up(0)} className="flex items-center gap-3 mb-8">
          <span className="type-label" style={{ color: 'var(--gold)', opacity: 0.85 }}>KalTech AI × Dynavisor</span>
          <span style={{ width: 44, height: 1, background: 'linear-gradient(90deg, rgba(184,151,90,0.5), transparent)', flexShrink: 0 }} />
          <span className="type-label" style={{ color: 'var(--text-muted)' }}>Joint Sovereign AI Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...up(0.08)}>
          <span className="type-display block" style={{ color: 'var(--text-primary)' }}>
            The Data Fabric That Moves
          </span>
          <span className="type-display block" style={{ color: 'var(--gold-light)', fontStyle: 'italic', marginTop: 6 }}>
            at the Speed of Intelligence.
          </span>
        </motion.h1>

        {/* Descriptor */}
        <motion.p {...up(0.18)} className="type-label mt-6" style={{ color: 'var(--text-muted)', letterSpacing: '0.22em', maxWidth: 480 }}>
          Sovereign&nbsp;·&nbsp;AFRL Validated&nbsp;·&nbsp;
          <span style={{ color: 'var(--gold)' }}>39× Faster Than Lustre</span>
        </motion.p>

        <motion.p {...up(0.24)} className="type-body mt-4" style={{ color: 'var(--text-body)', opacity: 0.72, maxWidth: 500, lineHeight: 1.85 }}>
          TorrentPro™ builds a coherent data fabric across nodes, data centers,
          and cloud via patented DIOV kernel-bypass. DoD DSRC tested.
          Air-gap ready. 26 patents.
        </motion.p>

        {/* CTAs */}
        <motion.div {...up(0.32)} className="flex flex-wrap gap-3 mt-10">
          <a href="#benchmark" className="btn-primary">
            View Benchmarks <ArrowRight size={12} />
          </a>
          <a href="#contact" className="btn-primary">
            Request Deployment Brief
          </a>
          <a href="#platform" className="btn-ghost">
            See Architecture
          </a>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.55 }}
          className="flex flex-wrap gap-x-12 gap-y-6 mt-16"
          style={{ borderTop: '1px solid rgba(184,151,90,0.1)', paddingTop: 32 }}
        >
          {[
            { v: '39×',        l: 'Faster than Lustre FS' },
            { v: '8,000 MB/s', l: 'Read/write on 64 GB' },
            { v: '<100μs',     l: 'Kernel-bypass latency' },
            { v: '26',         l: 'Patents issued & pending' },
          ].map(s => (
            <div key={s.l}>
              <div className="type-metric" style={{ fontSize: 'clamp(26px,3vw,38px)', color: 'var(--gold-light)', lineHeight: 1 }}>
                {s.v}
              </div>
              <div className="type-label mt-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.14em' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        ref={lineRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ transition: 'opacity 400ms ease', zIndex: 2 }}
      >
        <span className="type-label" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>Scroll</span>
        <div className="animate-pulse-line" style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, rgba(184,151,90,0.6), transparent)' }} />
        <ChevronDown size={11} style={{ color: 'var(--gold-dim)', marginTop: -10 }} />
      </div>
    </section>
  )
}
