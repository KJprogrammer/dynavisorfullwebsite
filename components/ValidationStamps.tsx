'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useStore } from '@/lib/store'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BLOCKS = [
  {
    badge: 'AFRL VALIDATED', seal: 'AFRL',
    title: 'US Air Force\nResearch Laboratory',
    domain: 'Cybersecurity Validation',
    accent: 'rgba(184,151,90,0.3)',
    bg: 'rgba(184,151,90,0.05)',
    points: [
      'TorrentPro™ kernel-bypass architecture evaluated under AFRL cybersecurity assessment program',
      'NSA-informed threat modeling applied to the DIOV fabric and control-plane isolation',
      'Approved for deployment in classified and air-gapped DoD environments',
    ],
  },
  {
    badge: 'DoD DSRC TESTED', seal: 'DSRC',
    title: 'DoD Supercomputing\nResource Center',
    domain: 'Performance Evaluation',
    accent: 'rgba(200,205,214,0.2)',
    bg: 'rgba(200,205,214,0.04)',
    points: [
      '39× throughput over Lustre filesystem measured across standard HPC workloads',
      '23× minimum speedup confirmed across all tested workload profiles',
      'Evaluation conducted on production DoD DSRC infrastructure — not synthetic benchmarks',
    ],
  },
]

const COMPLIANCE = ['SAM Registered','Air-Gap Ready','ITAR Aware','FedRAMP Path','26 Patents','AFRL Validated']

export default function ValidationStamps() {
  const ref  = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const setPhase = useStore(s => s.setCanvasPhase)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const t = ScrollTrigger.create({
      trigger: el, start: 'top 55%',
      onEnter:     () => setPhase('validation'),
      onLeaveBack: () => setPhase('platform'),
      onLeave:     () => setPhase('solutions'),
    })
    return () => t.kill()
  }, [setPhase])

  return (
    <section id="validation" ref={ref} className="section section-solid" style={{ position: 'relative' }}>
      {/* scan-line texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.008) 2px,rgba(255,255,255,0.008) 4px)',
      }} />

      <div className="container" style={{ position: 'relative' }}>

        <div className="section-head">
          <div className="section-label mb-5">04 / Validation & Credentials</div>
          <h2 className="type-title">
            Not a startup claim.<br />
            <em style={{ color: 'var(--gold-light)' }}>A government record.</em>
          </h2>
        </div>

        <div className="grid-2 mb-6">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b.badge}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden"
              style={{ background: b.bg, border: `1px solid ${b.accent}`, padding: '40px', backdropFilter: 'blur(8px)' }}
            >
              {/* watermark seal */}
              <div className="absolute right-[-16px] top-1/2 -translate-y-1/2 select-none pointer-events-none"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 110, color: 'rgba(184,151,90,0.04)', letterSpacing: '-0.05em' }}>
                {b.seal}
              </div>

              <div className="type-label mb-5" style={{ color: 'var(--gold)' }}>▲ {b.badge}</div>

              <h3 className="type-title mb-2" style={{ fontSize: 'clamp(20px,2.4vw,30px)', color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
                {b.title}
              </h3>
              <div className="type-label mb-7" style={{ color: 'var(--text-muted)' }}>{b.domain}</div>

              <ul className="flex flex-col gap-4 list-none p-0">
                {b.points.map((p, pi) => (
                  <li key={pi} className="flex gap-3 items-start">
                    <span style={{ color: 'var(--validated)', fontSize: 10, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span className="type-body" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-2"
        >
          {COMPLIANCE.map(c => (
            <div key={c} className="badge"><span className="badge-text">{c}</span></div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
