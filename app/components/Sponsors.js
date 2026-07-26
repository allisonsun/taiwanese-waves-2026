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
    logos: ['/sponsors/china-airlines.svg', '/sponsors/taipei-music-center.svg', '/sponsors/chiayi-city.png', '/sponsors/chiayi-cultural-affairs.png', '/sponsors/chiayi-cultural-foundation.png', '/sponsors/coco-bubble-tea.png', '/sponsors/fapa.png', '/sponsors/tla-law.svg', '/sponsors/interline.png', '/sponsors/lin-tsung-ming.png', '/sponsors/cwcmf.png', '/sponsors/zhiqi-77.png'],
    heights: [60, 40, 48, 48, 60, 56, 72, 64, 40, 72, 30, 34],
    mobileHeights: [null, null, null, null, 48, null, null, null, null, 56, 24, 28],
    filters: [null, null, 'brightness(0) invert(1)', 'brightness(0) invert(1)', 'brightness(0) invert(1)', 'brightness(0) invert(1)', 'grayscale(1) invert(1) contrast(20)', null, 'invert(1)', null, null],
  },
  {
    label: '特別感謝',
    logos: ['/sponsors/teresa.svg', '/sponsors/mumu-bath.png', '/sponsors/winson.png', '/sponsors/yumpling.png', '/sponsors/yunhai.png'],
    heights: [40, 48, 96, 64, 52],
    mobileHeights: [null, 38, 76, 52, 42],
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
