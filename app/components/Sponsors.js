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
    count: 2,
  },
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="sponsors-inner">
        <div className="sponsors-heading-wrap">
          <h2 className="sponsors-heading">Thank you to our sponsors</h2>
        </div>

        <div className="sponsors-tiers">
          {TIERS.map((tier) => (
            <div key={tier.label} className="sponsors-tier">
              <p className="sponsors-tier-label">{tier.label}</p>

              <div className="sponsor-logos-row">
                {Array.from({ length: tier.logos?.length ?? tier.count }).map((_, i) => (
                  <div key={i} className={tier.logos?.[i] || tier.names?.[i] ? 'sponsor-logo-wrap' : 'sponsor-placeholder'}>
                    {tier.logos?.[i] && (
                      <img
                        src={tier.logos[i]}
                        alt=""
                        className={`sponsor-logo${tier.mobileHeights?.[i] ? ' sponsor-logo-mobile-lg' : ''}`}
                        style={{
                          '--logo-height': `${tier.heights?.[i] ?? 40}px`,
                          '--logo-mobile-height': tier.mobileHeights?.[i] ? `${tier.mobileHeights[i]}px` : undefined,
                          filter: tier.filters?.[i] ?? 'none',
                        }}
                      />
                    )}
                    {tier.names?.[i] && (
                      <span className="sponsor-name">{tier.names[i]}</span>
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
