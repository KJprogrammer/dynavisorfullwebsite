'use client'

const creds = [
  { icon: '⬡', label: 'AFRL Validated',    sub: 'Cybersecurity' },
  { icon: '⬡', label: 'DoD DSRC Tested',   sub: 'Performance' },
  { icon: '⬡', label: 'SAM Registered',    sub: 'Federal Contracting' },
  { icon: '⬡', label: 'Air-Gap Ready',     sub: 'Classified Deploy' },
  { icon: '⬡', label: '26 Patents',        sub: '20 Issued · 6 Pending' },
  { icon: '⬡', label: 'Univ. Toronto',     sub: 'KalTech AI Backed' },
  { icon: '⬡', label: 'AFRL Validated',    sub: 'Cybersecurity' },
  { icon: '⬡', label: 'DoD DSRC Tested',   sub: 'Performance' },
  { icon: '⬡', label: 'SAM Registered',    sub: 'Federal Contracting' },
  { icon: '⬡', label: 'Air-Gap Ready',     sub: 'Classified Deploy' },
  { icon: '⬡', label: '26 Patents',        sub: '20 Issued · 6 Pending' },
  { icon: '⬡', label: 'Univ. Toronto',     sub: 'KalTech AI Backed' },
]

export default function CredentialStrip() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'var(--steel-deep)',
        borderTop: '1px solid rgba(184,151,90,0.12)',
        borderBottom: '1px solid rgba(184,151,90,0.12)',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Desktop: spread items */}
      <div className="hidden md:flex" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        {creds.slice(0, 6).map((c, i) => (
          <div
            key={i}
            style={{
              flex: 1, padding: '20px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              borderRight: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: 10 }}>▲</span>
            <div>
              <div className="type-label" style={{ color: 'var(--text-primary)', letterSpacing: '0.16em' }}>{c.label}</div>
              <div className="type-label" style={{ color: 'var(--text-muted)', fontSize: 8, letterSpacing: '0.12em', marginTop: 2 }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: marquee */}
      <div className="md:hidden" style={{ overflow: 'hidden', padding: '18px 0' }}>
        <div
          className="animate-ticker"
          style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {creds.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0 32px',
                borderRight: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: 8 }}>▲</span>
              <span className="type-label" style={{ color: 'var(--text-muted)', letterSpacing: '0.14em' }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
