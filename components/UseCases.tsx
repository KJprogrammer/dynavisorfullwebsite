"use client";

import { motion } from "framer-motion";

const cases = [
  {
    label: "AI / ML Training",
    sub: "Most Popular",
    body: "Slash model training times with DIOVFS-accelerated data pipelines. Faster epochs, lower GPU idle, higher utilization — same hardware.",
  },
  {
    label: "Cloud Acceleration",
    sub: "Cloud-Native",
    body: "Retrofit any public cloud tenant with TorrentPro's software overlay — no migration required, instant 10× storage throughput.",
  },
  {
    label: "HPC & Data Centers",
    sub: "Enterprise",
    body: "Transform bare-metal clusters into hyper-converged supercomputers. Supercompute-grade performance at commodity cost.",
  },
  {
    label: "Scientific Research",
    sub: "Research Labs",
    body: "Accelerate genomics, climate simulations, and large-scale analytics. Handle petabyte workloads with sustained 8 GB/s throughput.",
  },
  {
    label: "Media & Broadcast",
    sub: "Real-Time",
    body: "Power 8K rendering, VFX pipelines, and live broadcast workflows with NVMe-native speeds on your existing hardware.",
  },
  {
    label: "Financial Services",
    sub: "FinTech / Quant",
    body: "Sub-millisecond data access for quantitative trading, risk modeling, and compliance workloads in sovereign on-prem environments.",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-36 px-6">
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
            04 — Use Cases
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </motion.div>

        <div className="max-w-3xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-light leading-[1.06] text-[#e2ddd4]"
          >
            Every workload.
            <br />
            <em className="gradient-gold not-italic">Every scale.</em>
          </motion.h2>
        </div>

        {/* Ticker of use-case tags */}
        <div className="overflow-hidden mb-20 py-3">
          <div className="flex gap-3 animate-ticker w-max">
            {[...cases, ...cases].map((c, i) => (
              <span
                key={i}
                className="px-4 py-1.5 border border-white/[0.06] text-[10px] tracking-[0.22em] uppercase text-[#e2ddd4]/28 whitespace-nowrap font-sans"
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Case list */}
        <div className="divide-y divide-white/[0.04]">
          {cases.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group py-8 grid sm:grid-cols-[220px_1fr_auto] gap-6 items-start hover:bg-white/[0.015] px-4 -mx-4 transition-colors duration-300"
            >
              <div>
                <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c4a55a]/40 mb-2">{c.sub}</div>
                <div className="font-display text-xl font-light text-[#e2ddd4]/80 group-hover:text-[#e2ddd4] transition-colors">{c.label}</div>
              </div>
              <p className="text-[#e2ddd4]/35 text-sm leading-[1.85] max-w-lg">{c.body}</p>
              <div className="text-[#c4a55a]/20 group-hover:text-[#c4a55a]/50 transition-colors text-lg hidden sm:block">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
