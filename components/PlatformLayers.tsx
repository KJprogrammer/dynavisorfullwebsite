'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LAYERS = [
  {
    n: '01', title: 'Storage Layer',
    sub: 'Any media. Any scale. Unified.',
    body: 'NVMe, SAS, HDD, object stores, cloud buckets — TorrentPro™ presents a single coherent namespace regardless of the underlying media mix. No migration. No application changes.',
    metric: '8,000 MB/s', mLabel: '64 GB dataset', accent: 'var(--silver)',
  },
  {
    n: '02', title: 'DIOV Fabric Layer',
    sub: 'Kernel-bypass. Zero-copy. Sub-100μs.',
    body: 'Direct I/O Virtualization eliminates the kernel I/O stack entirely. SPDK/DPDK-accelerated transport creates a coherent fabric spanning nodes and data centers without hypervisor overhead.',
    metric: '<100μs', mLabel: 'End-to-end latency', accent: 'var(--gold)',
  },
  {
    n: '03', title: 'Compute Acceleration',
    sub: 'GPUDirect. Napatech DPU. FPGA/TPU.',
    body: 'TorrentPro™ feeds GPU clusters at memory bandwidth, not storage bandwidth. GPUDirect Storage and Napatech DPU offloading eliminate PCIe bottlenecks for AI/ML workloads.',
    metric: '23–39×', mLabel: 'Throughput vs Lustre', accent: 'var(--gold-light)',
  },
  {
    n: '04', title: 'Intelligence Layer',
    sub: 'KalTech AI × Dynavisor — Sixth Sense.',
    body: 'Sovereign agentic AI runs directly on the data fabric. No commercial API calls. No data leaving the perimeter. Full auditability. Classified and air-gapped deployments available.',
    metric: 'Sovereign', mLabel: 'No external API deps', accent: 'var(--gold)',
    isJV: true,
  },
]

export default function PlatformLayers() {
  const ref   = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20%' })
  const setPhase = useStore(s => s.setCanvasPhase)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const t = ScrollTrigger.create({
      trigger: el, start: 'top 55%',
      onEnter:     () => setPhase('platform'),
      onLeaveBack: () => setPhase('benchmark'),
      onLeave:     () => setPhase('validation'),
    })
    return () => t.kill()
  }, [setPhase])

  return (
    <section id="platform" ref={ref} className="section section-deep">
      <div className="container">

        <div className="section-head">
          <div className="section-label mb-5">03 / Platform Architecture</div>
          <h2 className="type-title">
            Four layers.<br />
            <em style={{ color: 'var(--gold-light)' }}>One complete platform.</em>
          </h2>
        </div>

        <div className="flex flex-col gap-[2px]">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpen(open === i ? null : i)}
              className="cursor-none"
              style={{
                background: open === i ? 'rgba(30,37,53,0.85)' : 'rgba(17,24,39,0.65)',
                border: l.isJV
                  ? `1px solid rgba(184,151,90,${open === i ? '0.35' : '0.18'})`
                  : `1px solid rgba(255,255,255,${open === i ? '0.07' : '0.03'})`,
                borderLeft: `3px solid ${l.accent}`,
                padding: '28px 32px',
                transition: 'background 300ms ease, border-color 300ms ease',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div className="flex items-center gap-6 flex-wrap">
                <span className="type-label" style={{ color: l.accent, minWidth: 28 }}>{l.n}</span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <span className="type-title" style={{ fontSize: 'clamp(17px,2vw,24px)', color: 'var(--text-primary)' }}>{l.title}</span>
                    <span className="type-label" style={{ color: 'var(--text-muted)' }}>{l.sub}</span>
                  </div>

                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="type-body mt-4" style={{ color: 'var(--text-muted)', maxWidth: 620 }}>{l.body}</p>
                        {l.isJV && (
                          <div className="mt-4">
                            <span className="badge"><span className="badge-text">KalTech AI × Dynavisor — Joint Sovereign Platform</span></span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="text-right shrink-0">
                  <div className="type-metric" style={{ fontSize: 'clamp(20px,2.4vw,34px)', color: l.accent, lineHeight: 1 }}>{l.metric}</div>
                  <div className="type-label mt-1" style={{ color: 'var(--text-muted)', fontSize: 7.5 }}>{l.mLabel}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-10">
          {['SPDK/DPDK','GPUDirect Storage','Napatech DPU','FPGA/TPU Support','NVMe-oF','Zero-Copy I/O','Kernel-Bypass','Air-Gap Capable'].map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
