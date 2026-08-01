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
    label: '合作單位',
    logos: ['/sponsors/chiayi-city.png', '/sponsors/chiayi-cultural-affairs.png', '/sponsors/chiayi-cultural-foundation.png'],
    heights: [48, 46, 60],
    mobileHeights: [null, null, 48],
    filters: ['brightness(0) invert(1)', 'brightness(0) invert(1)', 'brightness(0) invert(1)'],
  },
  {
    label: '贊助單位',
    logos: ['/sponsors/china-airlines.svg', '/sponsors/taipei-music-center.svg', '/sponsors/coco-bubble-tea.png', '/sponsors/fapa.png', '/sponsors/tla-law.svg', '/sponsors/interline.png', '/sponsors/lin-tsung-ming.png', '/sponsors/cwcmf.png', '/sponsors/zhiqi-77.png', '/sponsors/colega-ai.png', '/sponsors/nina.png'],
    heights: [60, 40, 56, 72, 64, 40, 72, 30, 34, 40, 48],
    mobileHeights: [null, null, null, null, null, null, 56, 24, 28, null, 40],
    filters: [null, null, 'brightness(0) invert(1)', 'grayscale(1) invert(1) contrast(20)', null, 'invert(1)', null, null, null, null, null],
  },
  {
    label: '特別感謝',
    logos: ['/sponsors/teresa.svg', '/sponsors/mumu-bath.png', '/sponsors/winson.png', '/sponsors/yumpling.png', '/sponsors/yunhai.png', '/sponsors/taiwan-bear-house.png', '/sponsors/929.png', '/sponsors/boomipop-mono.png', '/sponsors/dae.png', '/sponsors/bagel-joint.jpg', '/sponsors/formosa.jpg', '/sponsors/unnecessary.png'],
    heights: [40, 48, 96, 64, 52, 80, 44, 84, 80, 72, 96, 32],
    mobileHeights: [null, 38, 76, 52, 42, 64, null, 64, 60, 56, 72, 28],
    filters: [null, null, null, null, null, null, 'brightness(0) invert(1)', null, 'brightness(0) invert(1)', 'invert(1)', 'invert(1)', 'brightness(0) invert(1)'],
    textNames: ['BK Hsieh', 'Minxuan Hu', '志祺', 'Quake Hsu', 'Xiu-Wei Lin', 'R&M Music & Jeff', 'Yi-Xuan Lu', 'Leo Chang', 'Yu-Chien Liu', 'Sunny Lin', 'Alex Hu', 'Will Hsu', 'Yuwen Chang', 'Chieh Hsiung', 'Sabrina Wu', 'Michael Yu', 'Lei Chiu', 'Yu-Ting Feng', 'Katie Chen', 'Eric Sze', 'Thomas Liu', 'Linda', 'Nina', 'Mimi Lin'],
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
                {tier.logos.map((logo, i) => (
                  <div key={i} className="sponsor-logo-wrap">
                    {logo && (
                      <img
                        src={logo}
                        alt=""
                        loading="lazy"
                        decoding="async"
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

              {tier.textNames && (
                <div className="sponsor-text-names">
                  {tier.textNames.map((name) => (
                    <span key={name} className="sponsor-name">{name}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
