"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    label: "Autonomous Agents",
    body: "Kaltech AI deploys intelligent agents that self-optimize across Dynavisor's accelerated compute layer in real time — no manual tuning.",
  },
  {
    label: "Data Sovereignty",
    body: "All AI workloads execute within your jurisdiction. No data leaves your perimeter. Compliance-ready from day one.",
  },
  {
    label: "Supercompute Inference",
    body: "TorrentPro's I/O layer cuts model training and inference cycles versus any standard cloud configuration.",
  },
  {
    label: "Multi-Cloud & Edge",
    body: "Single control plane across public cloud, private data centers, and edge nodes. One platform, every environment.",
  },
  {
    label: "AI Infrastructure Insights",
    body: "Kaltech's analytics surfaces TorrentPro telemetry: predictive scaling, cost anomalies, and performance forecasting.",
  },
  {
    label: "Full-Stack Engineering",
    body: "From model training pipelines to production agents — Kaltech AI's studio builds bespoke solutions on the Dynavisor substrate.",
  },
];

export default function Partnership() {
  return (
    <section id="partnership" className="relative py-36 px-6 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#c4a55a]/[0.025] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="rule mb-20" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c4a55a]/60">
            03 — Partnership
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </motion.div>

        {/* Big partnership wordmark */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2rem,6vw,5.5rem)] font-light tracking-[-0.01em] text-[#e2ddd4] mb-3"
          >
            Kaltech AI
            <span className="text-[#e2ddd4]/15 mx-4 md:mx-6">×</span>
            <span className="gradient-gold">Dynavisor</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#e2ddd4]/35 text-sm max-w-xl mx-auto leading-relaxed"
          >
            The world&apos;s first fully sovereign AI compute platform.
            Intelligence that runs fast, stays local, and scales without limits.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#000008] p-8 md:p-10 hover:bg-[#04040f] transition-colors duration-400 group"
            >
              <div className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#c4a55a]/40 mb-4 group-hover:text-[#c4a55a]/65 transition-colors">
                {p.label}
              </div>
              <p className="text-[#e2ddd4]/38 text-sm leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border border-white/[0.05]"
        >
          <div>
            <div className="font-display text-2xl font-light text-[#e2ddd4] mb-1">
              Build on the Sovereign AI Platform
            </div>
            <div className="text-[#e2ddd4]/35 text-xs tracking-wide">
              Talk to the joint Kaltech AI × Dynavisor team about your infrastructure.
            </div>
          </div>
          <a href="#contact" className="btn-gold whitespace-nowrap flex-shrink-0 text-[11px]">
            Connect With Us →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
