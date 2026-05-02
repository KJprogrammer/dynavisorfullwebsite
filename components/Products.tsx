"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Products() {
  return (
    <section id="products" className="relative py-36 px-6">
      {/* Top rule */}
      <div className="max-w-7xl mx-auto">
        <div className="rule mb-20" />

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c4a55a]/60">
            01 — Core Platform
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[1.05] text-[#e2ddd4]"
          >
            Two products.
            <br />
            <em className="gradient-gold not-italic">One supercomputing layer.</em>
          </motion.h2>
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.04] rounded-sm overflow-hidden">
          {/* TorrentPro */}
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-[#000008] p-10 md:p-14 group relative overflow-hidden hover:bg-[#04040f] transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(196,165,90,0.04)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-12">
                <div>
                  <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c4a55a]/50 mb-3">TorrentPro™</div>
                  <h3 className="font-display text-4xl font-light text-[#e2ddd4]">I/O Acceleration</h3>
                </div>
                <div className="w-10 h-10 rounded-sm border border-[#c4a55a]/15 flex items-center justify-center text-[#c4a55a]/40 group-hover:border-[#c4a55a]/30 group-hover:text-[#c4a55a]/70 transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <p className="text-[#e2ddd4]/42 text-sm leading-[1.85] mb-10 max-w-sm">
                A software platform that transparently accelerates all storage and network I/O via the DIOVFS virtualization layer — delivering up to 8,000 MB/s without replacing any hardware.
              </p>

              <div className="space-y-3">
                {[
                  "DIOVFS — Dynavisor I/O Virtualization File System",
                  "Transparent middleware — zero app changes required",
                  "FPGA-embeddable for AI inference acceleration",
                  "Cloud · On-Prem · Edge — unified coverage",
                  "Patented dynamic parallel data distribution",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3 text-xs text-[#e2ddd4]/38">
                    <span className="w-3 h-px bg-[#c4a55a]/30 mt-2 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/[0.05]">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-light text-[#c4a55a]">8,000</span>
                  <span className="text-[#c4a55a]/50 text-sm font-sans">MB/s peak</span>
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#e2ddd4]/22 mt-1">Sustained read/write · Sysbench verified</div>
              </div>
            </div>
          </motion.div>

          {/* DynavisorPro */}
          <motion.div
            custom={1}
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-[#000008] p-10 md:p-14 group relative overflow-hidden hover:bg-[#04040f] transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_0%,rgba(168,196,212,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-12">
                <div>
                  <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#a8c4d4]/50 mb-3">DynavisorPro™</div>
                  <h3 className="font-display text-4xl font-light text-[#e2ddd4]">Cluster Supercomputing</h3>
                </div>
                <div className="w-10 h-10 rounded-sm border border-[#a8c4d4]/12 flex items-center justify-center text-[#a8c4d4]/35 group-hover:border-[#a8c4d4]/28 group-hover:text-[#a8c4d4]/65 transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <p className="text-[#e2ddd4]/42 text-sm leading-[1.85] mb-10 max-w-sm">
                A full-stack performance overlay that transforms commodity compute clusters into supercomputing environments — 8× to 22× faster applications, 33% reduced operational cost.
              </p>

              <div className="space-y-3">
                {[
                  "Full-stack CPU, storage, and network optimization",
                  "Hyper-converged cluster management layer",
                  "NVMe-native architecture — no bottlenecks",
                  "Dynamic storage scaling (US Patent assigned)",
                  "Works with existing cloud billing structures",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3 text-xs text-[#e2ddd4]/38">
                    <span className="w-3 h-px bg-[#a8c4d4]/25 mt-2 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/[0.05]">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-light gradient-ice">22×</span>
                  <span className="text-[#a8c4d4]/45 text-sm font-sans">performance gain</span>
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#e2ddd4]/22 mt-1">Application throughput vs baseline cluster</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hardware note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 p-6 border border-white/[0.04] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#e2ddd4]/22 font-sans">Verified on</span>
          <div className="h-3 w-px bg-white/[0.06] hidden sm:block" />
          <span className="text-xs text-[#e2ddd4]/35">
            Hyperscalers S2S T1 (4-node hyper-converged) · S2P T2 (78-drive, 4U storage) · AWS · Azure
          </span>
        </motion.div>
      </div>
    </section>
  );
}
