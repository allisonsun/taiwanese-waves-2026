'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedWave } from '../design-system'

function AutoPlayVideo({ src, className }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.play().catch(() => {})
    }
  }, [])
  return <video ref={ref} src={src} muted loop playsInline className={className} />
}

function AutoScrollCarousel({ children, className, style }) {
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
      className={className}
      style={style}
      onMouseEnter={() => { isPaused.current = true }}
      onMouseLeave={() => { isPaused.current = false }}
      onTouchStart={() => { isPaused.current = true }}
      onTouchEnd={() => { isPaused.current = false }}
    >
      {children}
    </div>
  )
}


const YEARS = [
  {
    year: 2016, tagline: 'The inauguration', poster: '/poster-2016.mp4',
    artists: ['Sunset Rollercoaster', 'Anpu', 'Wonfu'],
    photos: ['/photos/2016/2016-1.jpg', '/photos/2016/2016-2.jpg', '/photos/2016/2016-3.jpg', '/photos/2016/2016-4.jpg', '/photos/2016/2016-5.jpg', '/photos/2016/2016-6.jpg', '/photos/2016/2016-7.jpg', '/photos/2016/2016-8.jpg', '/photos/2016/2016-9.jpg'],
  },
  {
    year: 2017, tagline: 'Diversity in language and culture', poster: '/poster-2017.mp4',
    artists: ['Fire Ex.', 'Sangpuy', 'Dadado Huang & Berry j'],
    photos: ['/photos/2017/2017-1.jpg', '/photos/2017/2017-2.jpg', '/photos/2017/2017-3.jpg', '/photos/2017/2017-4.jpg', '/photos/2017/2017-5.jpg', '/photos/2017/2017-6.jpg', '/photos/2017/2017-7.jpg', '/photos/2017/2017-8.jpg', '/photos/2017/2017-9.jpg', '/photos/2017/2017-10.jpg'],
  },
  {
    year: 2018, tagline: 'Diversity in genre', poster: '/poster-2018.mp4',
    artists: ['Sheng-Xiang & Band', 'Soft Lipa', 'Elephant Gym'],
    photos: ['/photos/2018/2018-1.jpg', '/photos/2018/2018-2.jpg', '/photos/2018/2018-3.jpg', '/photos/2018/2018-4.jpg', '/photos/2018/2018-5.jpg', '/photos/2018/2018-6.jpg', '/photos/2018/2018-8.jpg', '/photos/2018/2018-9.jpg'],
  },
  {
    year: 2019, tagline: 'Women make waves', poster: '/poster-2019.mp4',
    artists: ['ABAO', 'Wan Fang', '9m88', 'Tizzy Bac'],
    photos: ['/photos/2019/2019-1.jpg', '/photos/2019/2019-2.jpg', '/photos/2019/2019-3.jpg', '/photos/2019/2019-4.jpg', '/photos/2019/2019-5.jpg', '/photos/2019/2019-6.jpg', '/photos/2019/2019-7.jpg'],
  },
  {
    year: 2023, tagline: 'The waves return', poster: '/poster-2023.jpg',
    artists: ['Waa Wei', 'The Dinosaur\'s Skin', 'DJ Mr. Skin'],
    photos: ['/photos/2023/2023-1.jpg', '/photos/2023/2023-2.jpg', '/photos/2023/2023-3.jpg', '/photos/2023/2023-4.jpg', '/photos/2023/2023-5.jpg', '/photos/2023/2023-6.jpg', '/photos/2023/2023-7.jpg'],
  },
  {
    year: 2025, tagline: 'Celebration of friendship', poster: '/poster-2025.mp4',
    artists: ['Enno Cheng', 'ABAO & Nanguaq Girls', 'Bulareyaung Dance Company', 'Chinatown Records'],
    photos: ['/photos/2025/2025-1.jpg', '/photos/2025/2025-2.jpg', '/photos/2025/2025-3.jpg', '/photos/2025/2025-4.jpg', '/photos/2025/2025-5.jpg', '/photos/2025/2025-6.jpg', '/photos/2025/2025-7.jpg', '/photos/2025/2025-8.jpg', '/photos/2025/2025-9.jpg'],
  },
]

const CAROUSEL_HEIGHT = 420

export default function History() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown') setActiveIndex(i => Math.min(i + 1, YEARS.length - 1))
      if (e.key === 'ArrowUp') setActiveIndex(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <section id="history">
      <div className="history-header-pad">
        <h2 className="history-heading">A look back at the past 10 years</h2>
      </div>

      <div className="history-section-inner">
        {YEARS.map((y, i) => {
          const isActive = activeIndex === i
          return (
            <div key={y.year}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`history-year-row${isActive ? ' history-year-row--active' : ''}`}
              >
                <div className="history-year-inner">
                  {isActive && <AnimatedWave period={26} numPeriods={8} midY={8} amplitude={5} stroke="#000" strokeWidth={2.5} className="history-wave-svg" width={52} height={16} />}
                  <span className="history-year-num">{y.year}</span>
                  <span className="history-tagline">{y.tagline}</span>
                </div>
                {y.artists?.length > 0 && (
                  <span className="history-artists-desktop">{y.artists.join(' • ')}</span>
                )}
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="history-carousel-motion"
                  >
                    {y.artists?.length > 0 && (
                      <div className="history-artists-mobile">
                        <span>{y.artists.join(' • ')}</span>
                      </div>
                    )}
                    <AutoScrollCarousel className="history-carousel">
                      {y.poster && (
                        <div className="history-poster">
                          {y.poster.endsWith('.mp4') ? (
                            <AutoPlayVideo src={y.poster} className="history-poster-media" />
                          ) : (
                            <img src={y.poster} alt={`${y.year} poster`} loading="lazy" className="history-poster-media" />
                          )}
                        </div>
                      )}
                      {y.photos?.map((photo, pi) => (
                        <img key={pi} src={photo} alt="" loading="lazy" className="history-photo" />
                      ))}
                    </AutoScrollCarousel>
                  </motion.div>
                )}
              </AnimatePresence>

              {i < YEARS.length - 1 && <div className="history-divider" />}
            </div>
          )
        })}
      </div>
    </section>
  )
}
