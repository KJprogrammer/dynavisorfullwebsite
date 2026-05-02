'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Platform',   href: '#platform' },
  { label: 'Validation', href: '#validation' },
  { label: 'Solutions',  href: '#solutions' },
  { label: 'Partners',   href: '#partners' },
  { label: 'About',      href: '#about' },
]

function NavLink({ label, href }: { label: string; href: string }) {
  const lineRef = useRef<HTMLSpanElement>(null)
  return (
    <a
      href={href}
      className="relative group"
      style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', transition: 'color 200ms ease' }}
      onMouseEnter={() => { if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)' }}
      onMouseLeave={() => { if (lineRef.current) lineRef.current.style.transform = 'scaleX(0)' }}
    >
      {label}
      <span
        ref={lineRef}
        style={{
          position: 'absolute', bottom: -2, left: 0, right: 0, height: 1,
          background: 'var(--gold)', transformOrigin: 'center',
          transform: 'scaleX(0)', transition: 'transform 250ms var(--ease-out)',
        }}
      />
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.transform = 'scaleX(1)'
    }
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'background 300ms ease, border-color 300ms ease',
          background: scrolled ? 'rgba(10,11,18,0.75)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(184,151,90,0.1)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 0, textDecoration: 'none', position: 'relative' }}>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              DYNA
            </span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              VISOR
            </span>
            <span
              ref={lineRef}
              style={{
                position: 'absolute', bottom: -3, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, var(--gold-dim), transparent)',
                transformOrigin: 'left', transform: 'scaleX(0)',
                transition: 'transform 500ms var(--ease-out)',
              }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
            {NAV_LINKS.map(l => <NavLink key={l.href} {...l} />)}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="#contact" className="hidden md:inline-flex btn-primary" style={{ padding: '10px 20px', fontSize: 9 }}>
              Request Brief
            </a>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'none' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
              background: 'rgba(10,11,18,0.97)', backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(184,151,90,0.1)',
              padding: '32px 32px 40px',
              display: 'flex', flexDirection: 'column', gap: 28,
            }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}
              >
                {l.label}
              </motion.a>
            ))}
            <a href="#contact" className="btn-primary" style={{ textAlign: 'center', marginTop: 8, justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
              Request Brief
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
