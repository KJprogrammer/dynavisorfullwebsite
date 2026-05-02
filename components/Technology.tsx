"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Existing Infrastructure",
    body: "TorrentPro installs as a software overlay on any cloud, bare-metal, or edge cluster. No hardware replacement, no downtime during deployment.",
  },
  {
    n: "02",
    title: "DIOVFS Intercept Layer",
    body: "The Dynavisor I/O Virtualization File System intercepts all storage and network operations at the kernel level — transparently, without application modifications.",
  },
  {
    n: "03",
    title: "Parallel Distribution Engine",
    body: "Patented dynamic storage scaling distributes every I/O request across multiple nodes and micro object stores simultaneously, eliminating sequential bottlenecks.",
  },
  {
    n: "04",
    title: "NVMe-Native Throughput",
    body: "Optimized for modern NVMe arrays, the engine sustains 8,000 MB/s read/write — 10× faster than generic NFS and comparable to dedicated supercomputing storage.",
  },
  {
    n: "05",
    title: "AI Workload Acceleration",
    body: "Embedded TorrentPro in AI inference systems and FPGA chips reduces training epoch times, minimizes GPU idle cycles, and cuts inference latency at scale.",
  },
];

export default function Technology() {
  return (
    <section id="technology" className="relative py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rule mb-20" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c4a55a]/60">
            02 — Architecture
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-20 lg:gap-28 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-light leading-[1.08] text-[#e2ddd4] mb-8"
            >
              Software-defined
              <br />
              <em className="gradient-gold not-italic">supercomputing</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#e2ddd4]/40 text-sm leading-[1.9] mb-10"
            >
              TorrentPro operates as a transparent middleware layer between your applications
              and infrastructure — orchestrating I/O at speeds previously requiring
              purpose-built supercomputing hardware worth millions.
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="btn-ghost text-[11px] py-2.5 px-6 inline-flex"
            >
              Technical Deep Dive →
            </motion.a>
          </div>

          {/* Steps */}
          <div className="space-y-0 divide-y divide-white/[0.04]">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group py-8 flex gap-8 hover:bg-white/[0.015] px-4 -mx-4 transition-colors duration-300"
              >
                <div className="font-display text-xs font-light text-[#c4a55a]/25 pt-1 w-7 flex-shrink-0 group-hover:text-[#c4a55a]/50 transition-colors">
                  {s.n}
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold tracking-wide text-[#e2ddd4]/75 mb-2 group-hover:text-[#e2ddd4] transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-xs text-[#e2ddd4]/35 leading-[1.85]">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
