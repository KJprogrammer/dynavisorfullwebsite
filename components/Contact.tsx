"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Dynavisor Access Request — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:info@dynavisor.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/[0.1] py-3 text-sm text-[#e2ddd4] placeholder-[#e2ddd4]/20 focus:outline-none focus:border-[#c4a55a]/40 transition-colors duration-200 font-sans";

  return (
    <section id="contact" className="relative py-36 px-6">
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
            05 — Contact
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-light leading-[1.06] text-[#e2ddd4] mb-8">
              Ready to accelerate
              <br />
              <em className="gradient-gold not-italic">your infrastructure?</em>
            </h2>
            <p className="text-[#e2ddd4]/38 text-sm leading-[1.9] mb-12 max-w-sm">
              Whether you&apos;re deploying TorrentPro on an existing cluster, exploring
              the Sovereign AI Platform, or looking to partner — we respond within
              one business day.
            </p>

            <div className="space-y-5">
              {[
                { label: "Email", value: "info@dynavisor.com" },
                { label: "Partnership", value: "Kaltech AI × Dynavisor Joint Team" },
                { label: "Hardware", value: "Hyperscalers · Certified Partner" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#e2ddd4]/22 w-24 flex-shrink-0">{label}</span>
                  <span className="text-sm text-[#e2ddd4]/55">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              <div className="py-20 text-center">
                <div className="font-display text-4xl font-light text-[#c4a55a] mb-3">Thank you.</div>
                <p className="text-[#e2ddd4]/35 text-sm">
                  The Dynavisor team will reach out within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#e2ddd4]/28 mb-3">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#e2ddd4]/28 mb-3">Company</label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#e2ddd4]/28 mb-3">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#e2ddd4]/28 mb-3">Use Case</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your infrastructure challenge or AI workload..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none border-b-0 border border-white/[0.07] p-3 bg-white/[0.018]`}
                  />
                </div>

                <button type="submit" className="btn-gold w-full justify-center text-[11px] py-3.5">
                  Send Request →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
