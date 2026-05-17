'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AutoScrollCarousel({ children, style }) {
  const ref = useRef(null)
  const isPaused = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId
    let pos = 0
    const speed = 0.3

    function step() {
      if (!isPaused.current) {
        const maxScroll = el.scrollWidth - el.clientWidth
        if (maxScroll > 0) {
          pos += speed
          if (pos >= maxScroll) pos = 0
          el.scrollLeft = pos
        }
      }
      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => { isPaused.current = true }}
      onMouseLeave={() => { isPaused.current = false }}
      style={style}
    >
      {children}
    </div>
  )
}

function AnimatedWave() {
  const period = 26
  let d = 'M 0,8'
  for (let i = 0; i < 8; i++) {
    const x = i * period
    d += ` C ${x+4},3 ${x+9},3 ${x+13},8 C ${x+17},13 ${x+22},13 ${x+26},8`
  }
  return (
    <svg width="52" height="16" style={{ flexShrink: 0, marginRight: 12, overflow: 'hidden' }}>
      <motion.path
        d={d}
        fill="none"
        stroke="#fdf108"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{ x: [0, -period] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  )
}

const YEARS = [
  {
    year: 2016, tagline: 'The inauguration', poster: '/poster-2016.gif',
    artists: ['Sunset Rollercoaster', 'Anpu', 'Wonfu'],
    photos: ['/photos/2016/2016-1.jpg', '/photos/2016/2016-2.jpg', '/photos/2016/2016-3.jpg', '/photos/2016/2016-4.jpg', '/photos/2016/2016-5.jpg'],
  },
  {
    year: 2017, tagline: 'Diversity in language and culture', poster: '/poster-2017.gif',
    artists: ['Fire Ex.', 'Sangpuy', 'Dadado Huang + Berry j'],
    photos: ['/photos/2017/2017-1.jpg', '/photos/2017/2017-2.jpg', '/photos/2017/2017-3.jpg', '/photos/2017/2017-4.jpg', '/photos/2017/2017-5.jpg', '/photos/2017/2017-6.jpg'],
  },
  {
    year: 2018, tagline: 'Diversity in genre', poster: '/poster-2018.gif',
    artists: ['Sheng-Xiang & Band', 'Soft Lipa', 'Elephant Gym'],
    photos: ['/photos/2018/2018-1.jpg', '/photos/2018/2018-2.jpg', '/photos/2018/2018-3.jpg', '/photos/2018/2018-4.jpg', '/photos/2018/2018-5.jpg', '/photos/2018/2018-6.jpg'],
  },
  {
    year: 2019, tagline: 'Women empowerment', poster: '/poster-2019.gif',
    artists: ['ABAO', 'Wan Fang', '9m88', 'Tizzy Bac'],
    photos: ['/photos/2019/2019-1.jpg', '/photos/2019/2019-2.jpg', '/photos/2019/2019-3.jpg', '/photos/2019/2019-4.jpg', '/photos/2019/2019-5.jpg'],
  },
  {
    year: 2023, tagline: 'Our comeback',
    artists: ['Waa Wei', 'The Dinosaur\'s Skin', 'DJ Mr. Skin'],
    photos: ['/photos/2023/2023-1.jpg', '/photos/2023/2023-2.jpg', '/photos/2023/2023-3.jpg', '/photos/2023/2023-4.jpg'],
  },
  {
    year: 2025, tagline: 'Celebration of friendship',
    artists: ['Enno Cheng', 'ABAO + Nanguaq Girls', 'Bulareyaung Dance Company', 'Chinatown Records'],
    photos: ['/photos/2025/2025-1.jpg', '/photos/2025/2025-2.jpg', '/photos/2025/2025-3.jpg', '/photos/2025/2025-4.jpg', '/photos/2025/2025-5.jpg'],
  },
]

const CAROUSEL_HEIGHT = 420

export default function History() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const carouselHeight = isMobile ? 220 : CAROUSEL_HEIGHT

  return (
    <section id="history" style={{ background: '#000', padding: '5rem 0' }}>
      <style>{`
        @media (max-width: 768px) {
          .history-year-row { flex-direction: column !important; align-items: flex-start !important; gap: 0; padding: 18px 0 !important; }
          .history-year-row .history-year-num { font-size: 18px !important; }
          .history-year-row .history-tagline { font-size: 18px !important; }
          .history-artists-desktop { display: none !important; }
          .history-artists-mobile { display: block !important; }
          .history-artists-mobile span { font-size: 16px !important; }
          .history-carousel-motion { padding-bottom: 4px !important; }
          .history-section-inner { padding: 0 1.5rem !important; }
          .history-header-pad { padding: 0 1.5rem 2rem !important; }
        }
      `}</style>

      {/* Header */}
      <div className="history-header-pad" style={{ padding: '0 4rem 3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: '32px', letterSpacing: '1.1px', color: '#fff' }}>
          Waves throughout the years
        </h2>
      </div>

      {/* Accordion list */}
      <div className="history-section-inner" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 3rem' }}>

        {/* Top divider */}
        <div style={{ height: 1, background: '#fff', marginBottom: 0 }} />

        {YEARS.map((y, i) => {
          const isActive = activeIndex === i
          return (
            <div key={y.year}>
              {/* Year row */}
              <div
                onClick={() => setActiveIndex(i)}
                className="history-year-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {isActive && <AnimatedWave />}
                  <span className="history-year-num" style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>
                    {y.year}
                  </span>
                  <span className="history-tagline" style={{ fontSize: 18, fontWeight: 400, color: '#fff', letterSpacing: '0.3px' }}>
                    {y.tagline}
                  </span>
                </div>
                {y.artists?.length > 0 && (
                  <span className="history-artists-desktop" style={{ fontSize: 18, fontWeight: 400, color: '#fff', letterSpacing: '0.3px' }}>
                    {y.artists.join(' • ')}
                  </span>
                )}
              </div>

              {/* Carousel — expands when active */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden', paddingBottom: 8 }}
                    className="history-carousel-motion"
                  >
                    {y.artists?.length > 0 && (
                      <div className="history-artists-mobile" style={{ display: 'none', paddingBottom: 10 }}>
                        <span style={{ fontSize: 18, fontWeight: 400, color: '#fff', letterSpacing: '0.3px' }}>
                          {y.artists.join(' • ')}
                        </span>
                      </div>
                    )}
                    <AutoScrollCarousel
                      style={{
                        display: 'flex',
                        gap: 6,
                        overflowX: 'auto',
                        height: carouselHeight,
                        paddingBottom: 12,
                        boxSizing: 'border-box',
                        scrollbarWidth: 'none',
                      }}
                    >
                      {y.poster && (
                        <div style={{ flexShrink: 0, aspectRatio: '1000 / 1428', height: '100%', borderRadius: 8, overflow: 'hidden' }}>
                          <img src={y.poster} alt={`${y.year} poster`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      )}
                      {y.photos?.map((photo, pi) => (
                        <div key={pi} style={{ flexShrink: 0, aspectRatio: '4 / 3', height: '100%', borderRadius: 8, overflow: 'hidden' }}>
                          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </AutoScrollCarousel>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div style={{ height: 1, background: '#fff' }} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
