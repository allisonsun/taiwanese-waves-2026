const TIERS = [
  {
    label: '主辦單位',
    sublabel: 'Presented by',
    count: 2,
  },
  {
    label: '指導單位',
    sublabel: 'Supported by',
    count: 3,
  },
  {
    label: '贊助單位',
    sublabel: 'Sponsored by',
    count: 4,
  },
]

export default function Sponsors() {
  return (
    <section
      style={{
        padding: '6rem 2rem',
        background: '#000',
        borderTop: '1px solid rgba(253,241,8,0.1)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            className="font-mono"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              color: '#fff',
              textTransform: 'uppercase',
            }}
          >
            Partners &amp; Sponsors
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {TIERS.map((tier) => (
            <div key={tier.label} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: '#fff',
                    marginBottom: '0.25rem',
                  }}
                >
                  {tier.label}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#fff',
                    opacity: 0.4,
                  }}
                >
                  {tier.sublabel}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {Array.from({ length: tier.count }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 120,
                      height: 60,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                      transition: 'background 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(253,241,8,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(253,241,8,0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#fff',
                        opacity: 0.4,
                      }}
                    >
                      SPONSOR
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
