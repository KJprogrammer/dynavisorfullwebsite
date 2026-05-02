'use client'
import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'

const CASES = [
  {
    sector: 'Financial Services',
    title: 'Sovereign Financial Intelligence',
    body: 'Real-time risk analytics, regulatory reporting, and AI-driven market intelligence within your sovereign data perimeter. No commercial APIs. FINRA, SOC 2, MAS, and DORA compliant pathways.',
    clients: 'Tier-1 Banks · Asset Managers · S&P Global-scale deployments',
    metric: '70%', metricLabel: 'TCO reduction vs cloud',
  },
  {
    sector: 'Industrial',
    title: 'Manufacturing Intelligence at Scale',
    body: 'Computer vision quality control, supply chain sensor fusion, and predictive maintenance across 75+ global factory sites. Millisecond-class inference at the edge.',
    clients: 'Global manufacturing enterprises · Industrial IoT deployments',
    metric: '22×', metricLabel: 'Processing speed vs legacy',
  },
  {
    sector: 'Energy & Infrastructure',
    title: 'Pipeline & Grid Intelligence',
    body: 'Drone, satellite, and IoT sensor fusion for pre-failure detection on critical infrastructure. Petabyte-scale telemetry processed in real time without cloud egress costs.',
    clients: 'Energy majors · Grid operators · Critical infrastructure owners',
    metric: '1+ TB/s', metricLabel: 'Sensor data throughput',
  },
  {
    sector: 'Agricultural & Commodity',
    title: 'Post-Conflict Reconstruction Intel',
    body: 'Multi-spectral satellite analysis for reconstruction planning and food security assessment. Ukraine recovery programs. Sovereign data platforms for national agencies.',
    clients: 'National agencies · UN programs · Commodity funds',
    metric: '8,000 MB/s', metricLabel: 'Satellite data ingestion',
  },
  {
    sector: 'Defence & Government',
    title: 'Sovereign Defence Intelligence',
    body: 'Air-gapped deployment certified. NSA cybersecurity-informed architecture. SAM registered for federal contracting. NATO-compatible sovereign inference without commercial cloud dependency.',
    clients: 'DoD agencies · NATO members · Intelligence community',
    metric: 'Air-Gap', metricLabel: 'Ready · AFRL validated',
  },
  {
    sector: 'DoD Cloud Migration',
    title: 'Zero-Downtime Data Migration',
    body: 'Dynamic lazy migration from AWS/Azure to TorrentPro™ or OCI. No application downtime. No re-architecture. The data fabric expands to absorb existing workloads incrementally.',
    clients: 'DoD cloud programs · AWS → TorrentPro migration · OCI partnership',
    metric: '0', metricLabel: 'Seconds of downtime',
  },
]

function TiltCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top  - rect.height / 2
    rotX.set((-cy / rect.height) * 6)
    rotY.set(( cx / rect.width ) * 6)
  }
  const onLeave = () => { rotX.set(0); rotY.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {children}
    </motion.div>
  )
}

export default function UseCases() {
  return (
    <section
      id="solutions"
      style={{
        position: 'relative', zIndex: 1,
        padding: 'var(--section-gap) 0',
        background: 'rgba(6,8,16,0.65)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        <div style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>05 / Solutions</div>
          <h2 className="type-title" style={{ color: 'var(--text-primary)', maxWidth: 560 }}>
            Every vertical. Every<br />
            <em style={{ color: 'var(--gold-light)' }}>sovereign boundary.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 2 }}>
          {CASES.map((c, i) => (
            <TiltCard key={c.title} delay={i * 0.08}>
              <div
                style={{
                  background: 'rgba(6,8,16,0.52)',
                  backdropFilter: 'blur(20px) saturate(1.2)',
                  borderLeft: '3px solid var(--gold-dim)',
                  border: '1px solid rgba(184,151,90,0.08)',
                  borderLeftColor: 'var(--gold-dim)',
                  padding: '32px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
                  transition: 'background 300ms ease, box-shadow 300ms ease',
                }}
              >
                <div className="type-label" style={{ color: 'var(--gold)', marginBottom: 16, letterSpacing: '0.18em' }}>
                  {c.sector}
                </div>
                <h3 className="type-title" style={{ fontSize: 'clamp(16px,1.6vw,22px)', color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
                  {c.title}
                </h3>
                <p className="type-body" style={{ color: 'var(--text-muted)', fontSize: 13, flex: 1, marginBottom: 24 }}>
                  {c.body}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }} />
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span className="type-label" style={{ color: 'var(--text-muted)', fontSize: 8, lineHeight: 1.6 }}>{c.clients}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div className="type-metric" style={{ fontSize: 'clamp(18px,2vw,28px)', color: 'var(--gold)', lineHeight: 1 }}>{c.metric}</div>
                      <div className="type-label" style={{ color: 'var(--text-muted)', fontSize: 7.5 }}>{c.metricLabel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
