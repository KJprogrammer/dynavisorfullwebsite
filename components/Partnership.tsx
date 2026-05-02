'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PARTNERS = [
  {
    name: 'KalTech AI',
    location: 'Toronto, Canada',
    role: 'Joint Venture — Sovereign AI Layer',
    desc: 'KalTech\'s "Sixth Sense" agentic AI platform runs on top of TorrentPro\'s data fabric. Together they form the Sovereign Financial Intelligence Fabric for regulated enterprises and Sovereign Defence Intelligence for government buyers.',
    badge: 'Joint Platform Partner',
    metric: 'Sixth Sense', metricLabel: 'Agentic AI on fabric',
    gold: true,
  },
  {
    name: 'Napatech',
    location: 'Copenhagen, Denmark',
    role: 'DPU Integration Partner',
    desc: 'Napatech SmartNIC/DPU technology is embedded in TorrentPro\'s compute acceleration layer, offloading network processing and enabling line-rate packet capture for financial and telecom workloads.',
    badge: 'Technology Integration',
    metric: '100Gbps', metricLabel: 'Line-rate DPU processing',
    gold: false,
  },
  {
    name: 'University of Toronto',
    location: 'Toronto, Canada',
    role: 'Research & Backing',
    desc: 'Academic backing underpins the KalTech AI research lineage, with ongoing collaboration on sovereign AI architectures and quantum-resistant data fabric security models.',
    badge: 'Academic Partner',
    metric: 'R&D', metricLabel: 'Foundational research backing',
    gold: false,
  },
]

export default function Partnership() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section
      id="partners"
      ref={ref}
      style={{
        position: 'relative', zIndex: 1,
        padding: 'var(--section-gap) 0',
        background: 'rgba(6,8,16,0.72)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        <div style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 20 }}>06 / Partners</div>
          <h2 className="type-title" style={{ color: 'var(--text-primary)', maxWidth: 560 }}>
            Built with partners who<br />
            <em style={{ color: 'var(--gold-light)' }}>operate at sovereign scale.</em>
          </h2>
        </div>

        {/* JV highlight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(184,151,90,0.04)',
            backdropFilter: 'blur(24px) saturate(1.3)',
            border: '1px solid rgba(184,151,90,0.22)',
            boxShadow: '0 8px 64px rgba(184,151,90,0.08), 0 4px 32px rgba(0,0,0,0.55)',
            padding: '40px',
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 32,
            alignItems: 'center',
          }}
        >
          <div>
            <div className="type-label" style={{ color: 'var(--gold)', marginBottom: 12 }}>
              ▲ KalTech AI × Dynavisor — Joint Sovereign AI Platform
            </div>
            <h3 className="type-title" style={{ fontSize: 'clamp(22px,3vw,38px)', color: 'var(--text-primary)', marginBottom: 16 }}>
              Sovereign Financial Intelligence Fabric
            </h3>
            <p className="type-body" style={{ color: 'var(--text-muted)', maxWidth: 580 }}>
              The joint platform delivers regulated enterprises a sovereign data + AI stack:
              TorrentPro™ as the high-performance data fabric, Sixth Sense as the agentic intelligence layer.
              Zero commercial API dependencies. Full auditability. Runs in your data center, air-gapped if required.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Sovereign Inference', 'Regulated Financial AI', 'Defence Intelligence', 'No Cloud Lock-in'].map(t => (
                <span key={t} className="type-label" style={{
                  color: 'var(--gold-dim)', border: '1px solid rgba(184,151,90,0.2)',
                  padding: '5px 10px', letterSpacing: '0.12em',
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="type-label" style={{ color: 'var(--text-muted)', marginBottom: 8 }}>Joint Platform</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em',
              color: 'var(--gold)', textTransform: 'uppercase',
              border: '1px solid rgba(184,151,90,0.3)', padding: '12px 20px',
            }}>
              KalTech AI<br /><span style={{ color: 'var(--text-muted)' }}>×</span><br />Dynavisor
            </div>
          </div>
        </motion.div>

        {/* Other partners */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2 }}>
          {PARTNERS.slice(1).map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'rgba(6,8,16,0.48)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(200,205,214,0.08)',
                borderLeft: '3px solid var(--silver-dim)',
                padding: '28px 32px',
                boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div className="type-title" style={{ fontSize: 20, color: 'var(--text-primary)', marginBottom: 4 }}>{p.name}</div>
                  <div className="type-label" style={{ color: 'var(--text-muted)' }}>{p.location}</div>
                </div>
                <span className="type-label" style={{ color: 'var(--silver-dim)', border: '1px solid rgba(200,205,214,0.15)', padding: '4px 8px', fontSize: 7.5 }}>
                  {p.badge}
                </span>
              </div>
              <div className="type-label" style={{ color: 'var(--gold-dim)', marginBottom: 12 }}>{p.role}</div>
              <p className="type-body" style={{ color: 'var(--text-muted)', fontSize: 13 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
