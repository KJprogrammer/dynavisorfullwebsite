'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const INQUIRY_TYPES = [
  'Technical Evaluation',
  'Deployment Brief',
  'DoD / Federal Procurement',
  'Financial Services',
  'Partnership Inquiry',
  'Other',
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const [form, setForm] = useState({ name: '', org: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 900))
    setStatus('sent')
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(6,8,16,0.55)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '14px 16px',
    color: 'var(--text-body)',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 200ms ease',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: 'relative', zIndex: 1,
        padding: 'var(--section-gap) 0',
        background: 'rgba(6,8,16,0.75)',
        backdropFilter: 'blur(3px)',
        borderTop: '1px solid rgba(184,151,90,0.1)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label" style={{ marginBottom: 24 }}>07 / Contact</div>
            <h2 className="type-title" style={{ color: 'var(--text-primary)', marginBottom: 24, maxWidth: 440 }}>
              Ready to evaluate<br />
              <em style={{ color: 'var(--gold-light)' }}>TorrentPro™?</em>
            </h2>
            <p className="type-body" style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
              Technical evaluations, deployment briefs, and federal procurement inquiries
              handled directly by Dynavisor engineers — not sales reps.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Email', val: 'info@dynavisor.com' },
                { label: 'Phone', val: '+1 (510) 673-2065' },
                { label: 'Address', val: '1389 Cristal Court, San Jose, CA 95127' },
              ].map(c => (
                <div key={c.label}>
                  <div className="type-label" style={{ color: 'var(--gold-dim)', marginBottom: 4 }}>{c.label}</div>
                  <div className="type-body" style={{ color: 'var(--text-body)', fontSize: 14 }}>{c.val}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'sent' ? (
              <div style={{ padding: 40, background: 'rgba(6,8,16,0.55)', backdropFilter: 'blur(24px)', border: '1px solid rgba(184,151,90,0.2)', boxShadow: '0 8px 48px rgba(0,0,0,0.5)' }}>
                <div className="type-label" style={{ color: 'var(--gold)', marginBottom: 12 }}>▲ MESSAGE RECEIVED</div>
                <p className="type-body" style={{ color: 'var(--text-muted)' }}>
                  A Dynavisor engineer will respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input name="name" placeholder="Full Name" required value={form.name} onChange={onChange} style={inputStyle} />
                  <input name="org" placeholder="Organization" value={form.org} onChange={onChange} style={inputStyle} />
                </div>
                <input name="email" type="email" placeholder="Email Address" required value={form.email} onChange={onChange} style={inputStyle} />
                <select name="type" value={form.type} onChange={onChange} style={{ ...inputStyle, color: form.type ? 'var(--text-body)' : 'var(--text-muted)' }}>
                  <option value="" disabled>Inquiry Type</option>
                  {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <textarea
                  name="message"
                  placeholder="Brief description of your use case or requirements"
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.6 : 1, cursor: status === 'sending' ? 'wait' : 'none' }}
                >
                  {status === 'sending' ? 'Sending...' : (<>Send Inquiry <ArrowRight size={12} /></>)}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
