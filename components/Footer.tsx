'use client'

const COL2 = ['Platform', 'Validation', 'Solutions', 'Technical Docs', 'Patent Portfolio']
const COL3 = ['About', 'Partners', 'KalTech AI JV', 'News', 'Contact']

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      background: 'var(--void)',
      borderTop: '1px solid rgba(184,151,90,0.15)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 48px 40px' }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 64 }}>

          {/* Col 1 — Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.28em', marginBottom: 12 }}>
              <span style={{ color: 'var(--text-primary)' }}>DYNA</span>
              <span style={{ color: 'var(--gold)' }}>VISOR</span>
            </div>
            <div className="type-label" style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.8 }}>
              Software Defined Data Accelerator™<br />
              Founded 2012 · San Jose, CA
            </div>
            <div className="type-body" style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 2 }}>
              1389 Cristal Court<br />
              San Jose, CA 95127<br />
              +1 (510) 673-2065<br />
              info@dynavisor.com
            </div>
          </div>

          {/* Col 2 — Platform */}
          <div>
            <div className="type-label" style={{ color: 'var(--gold-dim)', marginBottom: 20, letterSpacing: '0.2em' }}>Platform</div>
            {COL2.map(l => (
              <div key={l} style={{ marginBottom: 12 }}>
                <a href="#" className="type-body" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', transition: 'color 200ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-body)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >{l}</a>
              </div>
            ))}
          </div>

          {/* Col 3 — Company */}
          <div>
            <div className="type-label" style={{ color: 'var(--gold-dim)', marginBottom: 20, letterSpacing: '0.2em' }}>Company</div>
            {COL3.map(l => (
              <div key={l} style={{ marginBottom: 12 }}>
                <a href="#" className="type-body" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none', transition: 'color 200ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-body)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >{l}</a>
              </div>
            ))}
          </div>

          {/* Col 4 — Validation badges */}
          <div>
            <div className="type-label" style={{ color: 'var(--gold-dim)', marginBottom: 20, letterSpacing: '0.2em' }}>Credentials</div>
            {['AFRL Validated', 'DoD DSRC Tested', 'SAM Registered', 'Air-Gap Ready', '26 Patents'].map(b => (
              <div key={b} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--validated)', fontSize: 8 }}>✓</span>
                <span className="type-label" style={{ color: 'var(--text-muted)', fontSize: 8, letterSpacing: '0.12em' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span className="type-label" style={{ color: 'var(--text-muted)', fontSize: 8 }}>
            © 2026 Dynavisor, Inc. All rights reserved.
          </span>
          <span className="type-label" style={{ color: 'var(--gold-dim)', fontSize: 8, letterSpacing: '0.18em' }}>
            AFRL Validated · DoD DSRC Tested · SAM Registered
          </span>
          <span className="type-label" style={{ color: 'var(--text-muted)', fontSize: 8, opacity: 0.6 }}>
            Proprietary & Confidential
          </span>
        </div>
      </div>
    </footer>
  )
}
