const TIERS = [
  {
    label: '主辦單位',
    logos: ['/sponsors/woozi.svg'],
    names: ['物子巡演工作室'],
  },
  {
    label: '指導單位',
    logos: ['/sponsors/TCC-white.png', '/sponsors/taiwan-pop.png'],
    heights: [56, 64],
  },
  {
    label: '贊助單位',
    logos: ['/sponsors/china-airlines.svg', '/sponsors/taipei-music-center.svg', '/sponsors/chiayi-city.png', '/sponsors/chiayi-cultural-affairs.png', '/sponsors/贊助單位 - 財團法人嘉義市文化基金會LOGO-03.png'],
    heights: [60, 40, 48, 48, 60],
    mobileHeights: [null, null, null, null, 48],
    filters: [null, null, 'brightness(0) invert(1)', 'brightness(0) invert(1)', 'brightness(0) invert(1)'],
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
      <div style={{ maxWidth: '80vw', margin: '0 auto' }}>
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
                className="sponsor-logos-row"
                style={{
                  display: 'flex',
                  gap: '3rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {Array.from({ length: tier.logos?.length ?? tier.count }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      ...(tier.logos?.[i] || tier.names?.[i] ? {} : { width: 120, height: 60, background: 'rgba(255,255,255,0.05)' }),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {tier.logos?.[i] && (
                      <img src={tier.logos[i]} alt="" className={`sponsor-logo${tier.mobileHeights?.[i] ? ' sponsor-logo-mobile-lg' : ''}`} style={{ height: tier.heights?.[i] ?? 40, width: 'auto', filter: tier.filters?.[i] ?? 'none', '--mobile-height': tier.mobileHeights?.[i] ? `${tier.mobileHeights[i]}px` : undefined }} />
                    )}
                    {tier.names?.[i] && (
                      <span style={{ color: '#fff', fontSize: 18, whiteSpace: 'nowrap' }}>{tier.names[i]}</span>
                    )}
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
