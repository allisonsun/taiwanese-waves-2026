const TIERS = [
  {
    label: '主辦單位',
    count: 1,
  },
  {
    label: '指導單位',
    count: 3,
  },
  {
    label: '贊助單位',
    count: 4,
  },
  {
    label: '特別感謝',
    count: 3,
  },
]

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      style={{
        padding: '6rem 2rem',
        background: '#000',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: '32px', letterSpacing: 'normal', color: '#fff' }}>
            Thank you to our sponsors
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {TIERS.map((tier) => (
            <div key={tier.label} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: '20px',
                  color: '#fff',
                  marginBottom: '1.5rem',
                }}
              >
                {tier.label}
              </p>

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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
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
