'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import useIsMobile from '../hooks/useIsMobile'

function AutoScrollCarousel({ children, style }) {
  const ref = useRef(null)
  const isPaused = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = null
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
      } else {
        pos = el.scrollLeft
      }
      rafId = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rafId === null) {
          pos = el.scrollLeft
          rafId = requestAnimationFrame(step)
        } else if (!entry.isIntersecting && rafId !== null) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      observer.disconnect()
    }
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

const WAVE_PERIOD = 26
const WAVE_PATH = (() => {
  let d = 'M 0,8'
  for (let i = 0; i < 8; i++) {
    const x = i * WAVE_PERIOD
    d += ` C ${x+4},3 ${x+9},3 ${x+13},8 C ${x+17},13 ${x+22},13 ${x+26},8`
  }
  return d
})()

function AnimatedWave() {
  return (
    <svg width="52" height="16" style={{ flexShrink: 0, marginRight: 6, overflow: 'hidden' }}>
      <motion.path
        d={WAVE_PATH}
        fill="none"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{ x: [0, -WAVE_PERIOD] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  )
}

const YEARS = [
  {
    year: 2016, tagline: 'The inauguration', poster: '/poster-2016.gif',
    artists: ['Sunset Rollercoaster', 'Anpu', 'Wonfu'],
    photos: ['/photos/2016/2016-1.jpg', '/photos/2016/2016-2.jpg', '/photos/2016/2016-3.jpg', '/photos/2016/2016-4.jpg', '/photos/2016/2016-5.jpg', '/photos/2016/2016-6.jpg', '/photos/2016/2016-7.jpg', '/photos/2016/2016-8.jpg', '/photos/2016/2016-9.jpg'],
  },
  {
    year: 2017, tagline: 'Diversity in language and culture', poster: '/poster-2017.gif',
    artists: ['Fire Ex.', 'Sangpuy', 'Dadado Huang & Berry j'],
    photos: ['/photos/2017/2017-1.jpg', '/photos/2017/2017-2.jpg', '/photos/2017/2017-3.jpg', '/photos/2017/2017-4.jpg', '/photos/2017/2017-5.jpg', '/photos/2017/2017-6.jpg', '/photos/2017/2017-7.jpg', '/photos/2017/2017-8.jpg', '/photos/2017/2017-9.jpg', '/photos/2017/2017-10.jpg'],
  },
  {
    year: 2018, tagline: 'Diversity in genre', poster: '/poster-2018.gif',
    artists: ['Sheng-Xiang & Band', 'Soft Lipa', 'Elephant Gym'],
    photos: ['/photos/2018/2018-1.jpg', '/photos/2018/2018-2.jpg', '/photos/2018/2018-3.jpg', '/photos/2018/2018-4.jpg', '/photos/2018/2018-5.jpg', '/photos/2018/2018-6.jpg', '/photos/2018/2018-8.jpg', '/photos/2018/2018-9.jpg'],
  },
  {
    year: 2019, tagline: 'Women make waves', poster: '/poster-2019.gif',
    artists: ['ABAO', 'Wan Fang', '9m88', 'Tizzy Bac'],
    photos: ['/photos/2019/2019-1.jpg', '/photos/2019/2019-2.jpg', '/photos/2019/2019-3.jpg', '/photos/2019/2019-4.jpg', '/photos/2019/2019-5.jpg', '/photos/2019/2019-6.jpg', '/photos/2019/2019-7.jpg'],
  },
  {
    year: 2023, tagline: 'The waves return', poster: '/poster-2023.jpg',
    artists: ['Waa Wei', 'The Dinosaur\'s Skin', 'DJ Mr. Skin'],
    photos: ['/photos/2023/2023-1.jpg', '/photos/2023/2023-2.jpg', '/photos/2023/2023-3.jpg', '/photos/2023/2023-4.jpg', '/photos/2023/2023-5.jpg', '/photos/2023/2023-6.jpg', '/photos/2023/2023-7.jpg'],
  },
  {
    year: 2025, tagline: 'Celebration of friendship', poster: '/poster-2025.gif',
    artists: ['Enno Cheng', 'ABAO & Nanguaq Girls', 'Bulareyaung Dance Company', 'Chinatown Records'],
    photos: ['/photos/2025/2025-1.jpg', '/photos/2025/2025-2.jpg', '/photos/2025/2025-3.jpg', '/photos/2025/2025-4.jpg', '/photos/2025/2025-5.jpg', '/photos/2025/2025-6.jpg', '/photos/2025/2025-7.jpg', '/photos/2025/2025-8.jpg', '/photos/2025/2025-9.jpg'],
  },
]

const CAROUSEL_HEIGHT = 420

export default function History() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown') setActiveIndex(i => Math.min(i + 1, YEARS.length - 1))
      if (e.key === 'ArrowUp') setActiveIndex(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const carouselHeight = isMobile ? 220 : CAROUSEL_HEIGHT

  return (
    <section id="history" style={{ background: `url('/hero/background.svg') center / cover no-repeat`, padding: '5rem 0' }}>
      {/* Header */}
      <div className="history-header-pad" style={{ padding: '0 4rem 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: '32px', letterSpacing: 'normal', color: '#000' }}>
          A look back at the past 10 years
        </h2>
      </div>

      {/* Accordion list */}
      <div className="history-section-inner" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 3rem' }}>

        {YEARS.map((y, i) => {
          const isActive = activeIndex === i
          return (
            <div key={y.year}>
              {/* Year row */}
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="history-year-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 0',
                  cursor: 'pointer',
                  transition: 'padding-left 0.2s',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.paddingLeft = '12px' }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0px' }}
              >
                <div className="history-year-inner" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {isActive && <AnimatedWave />}
                  <span className="history-year-num" style={{ fontSize: 24, fontWeight: 700, color: '#000', letterSpacing: '0.8px' }}>
                    {y.year}
                  </span>
                  <span className="history-tagline" style={{ fontSize: 18, fontWeight: 400, color: '#000', letterSpacing: '0.3px' }}>
                    {y.tagline}
                  </span>
                </div>
                {y.artists?.length > 0 && (
                  <span className="history-artists-desktop" style={{ fontSize: 18, fontWeight: 400, color: '#000', letterSpacing: '0.3px' }}>
                    {y.artists.join(' • ')}
                  </span>
                )}
              </button>

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
                        <span style={{ fontSize: 18, fontWeight: 400, color: '#000', letterSpacing: '0.3px' }}>
                          {y.artists.join(' • ')}
                        </span>
                      </div>
                    )}
                    <AutoScrollCarousel
                      style={{
                        display: 'flex',
                        gap: 4,
                        overflowX: 'auto',
                        height: carouselHeight,
                        paddingBottom: 12,
                        boxSizing: 'border-box',
                        scrollbarWidth: 'none',
                      }}
                    >
                      {y.poster && (
                        <div style={{ flexShrink: 0, aspectRatio: '1000 / 1428', height: '100%', overflow: 'hidden', border: '1px solid #000', position: 'relative' }}>
                          <Image src={y.poster} alt={`${y.year} poster`} fill sizes="300px" style={{ objectFit: 'contain' }} />
                        </div>
                      )}
                      {y.photos?.map((photo, pi) => (
                        <img key={pi} src={photo} alt="" loading="lazy" style={{ flexShrink: 0, height: '100%', width: 'auto', objectFit: 'cover', display: 'block' }} />
                      ))}
                    </AutoScrollCarousel>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              {i < YEARS.length - 1 && <div style={{ height: 1, background: '#000' }} />}
            </div>
          )
        })}
      </div>
    </section>
  )
}
