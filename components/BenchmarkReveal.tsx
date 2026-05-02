'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MetricCounter } from '@/components/ui/MetricCounter'
import { useStore } from '@/lib/store'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { v: 39,    sfx: '×',      lbl: 'Faster than Lustre FS',     ind: 0,  note: 'DoD DSRC confirmed' },
  { v: 8000,  sfx: ' MB/s',  lbl: 'Peak storage throughput',   ind: 24, note: '64 GB dataset · Hyperscalers PoC' },
  { v: 70,    sfx: '%',      lbl: 'Cost reduction vs cloud',    ind: 48, note: 'CapEx + OpEx combined' },
  { v: 100,   pfx: '<',  sfx: 'μs', lbl: 'Kernel-bypass latency', ind: 72, note: 'SPDK/DPDK · hard ceiling' },
  { v: 22,    sfx: '×',      lbl: 'Real-world app speedup',     ind: 48, note: '8–22× across production workloads' },
  { v: 26,    sfx: '',        lbl: 'Patents issued & pending',   ind: 24, note: '20 issued · 6 pending' },
]

export default function BenchmarkReveal() {
  const ref     = useRef<HTMLElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-15%' })
  const setPhase = useStore(s => s.setCanvasPhase)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const t = ScrollTrigger.create({
      trigger: el, start: 'top 58%',
      onEnter:     () => setPhase('benchmark'),
      onLeaveBack: () => setPhase('hero'),
    })
    return () => t.kill()
  }, [setPhase])

  return (
    <section id="benchmark" ref={ref} className="section section-solid">
      <div className="container">
        <div className="grid-2-asym">

          {/* Left */}
          <div>
            <div className="section-label section-head">02 / Performance Benchmarks</div>
            <h2 className="type-title mb-6" style={{ color: 'var(--text-primary)' }}>
              Numbers validated by<br />
              <em style={{ color: 'var(--gold-light)' }}>AFRL and DoD DSRC.</em>
            </h2>
            <p className="type-body" style={{ color: 'var(--text-muted)', lineHeight: 1.85 }}>
              Benchmarks produced in production environments — not synthetic labs. The US Air Force
              Research Laboratory validated cybersecurity. DoD Supercomputing Resource Center
              independently confirmed 39× throughput over Lustre across standard HPC workloads.
            </p>
            <div className="glass-panel mt-10 p-5" style={{ borderLeft: '2px solid var(--gold-dim)' }}>
              <div className="type-label mb-3" style={{ color: 'var(--gold)' }}>Validated by</div>
              <div className="flex flex-wrap gap-3">
                {['US Air Force Research Laboratory', 'DoD Supercomputing Resource Center', 'Hyperscalers PoC'].map(v => (
                  <span key={v} className="type-label" style={{ color: 'var(--text-body)', fontSize: 8, letterSpacing: '0.1em' }}>▲ {v}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — diagonal waterfall */}
          <div className="flex flex-col gap-1">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.lbl}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginLeft: m.ind, paddingBottom: 6 }}
              >
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span
                    className="type-metric"
                    style={{
                      color: 'var(--gold)',
                      mixBlendMode: 'screen',
                      lineHeight: 0.9,
                      fontSize: `clamp(38px,${6.8 - i*0.35}vw,${96 - i*7}px)`,
                    }}
                  >
                    {m.pfx}{inView
                      ? <MetricCounter target={m.v} suffix={m.sfx} duration={1300 + i*80} />
                      : `0${m.sfx}`
                    }
                  </span>
                  <div>
                    <div className="type-label" style={{ color: 'var(--text-body)', letterSpacing: '0.14em' }}>{m.lbl}</div>
                    <div className="type-label mt-1" style={{ color: 'var(--text-muted)', fontSize: 8 }}>{m.note}</div>
                  </div>
                </div>
                {i < METRICS.length - 1 && (
                  <div className="mt-2" style={{ height: 1, background: 'rgba(184,151,90,0.06)', marginLeft: -m.ind }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
