'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import StoryModal from './StoryModal'
import useIsMobile from '../hooks/useIsMobile'

const PLACEHOLDER_STORIES = [
  { name: 'Angela C.', photo: '/photos/2016/2016-1.jpg', story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.' },
  { name: 'David L.', photo: '/photos/2019/2019-2.jpg', story: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.' },
  { name: 'Michelle H.', photo: '/photos/2017/2017-3.jpg', story: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.' },
  { name: 'Jason T.', photo: '/photos/2023/2023-2.jpg', story: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis.' },
  { name: '', photo: '/photos/2025/2025-3.jpg', story: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos ratione.' },
  { name: 'Priya K.', photo: '/photos/2018/2018-2.jpg', story: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi.' },
  { name: 'Kevin W.', photo: '/photos/2016/2016-4.jpg', story: 'Ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis.' },
  { name: '', photo: '/photos/2019/2019-4.jpg', story: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem.' },
  { name: 'Sarah M.', photo: '/photos/2025/2025-1.jpg', story: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos.' },
  { name: 'Brian C.', photo: '/photos/2017/2017-5.jpg', story: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.' },
  { name: 'Linda Y.', photo: '/photos/2023/2023-4.jpg', story: 'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint molestiae.' },
  { name: '', photo: '/photos/2018/2018-5.jpg', story: 'Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus.' },
  { name: 'Raymond F.', photo: '/photos/2025/2025-4.jpg', story: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa.' },
  { name: 'Tina H.', photo: '/photos/2016/2016-3.jpg', story: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.' },
  { name: 'Chris A.', photo: '/photos/2019/2019-1.jpg', story: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.' },
  { name: '', photo: '/photos/2017/2017-1.jpg', story: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sunt in culpa officia.' },
  { name: 'Nancy Z.', photo: '/photos/2023/2023-1.jpg', story: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum perspiciatis unde.' },
  { name: 'Marcus L.', photo: '/photos/2018/2018-4.jpg', story: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui.' },
  { name: 'Amy S.', photo: '/photos/2025/2025-2.jpg', story: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi.' },
  { name: '', photo: '/photos/2016/2016-2.jpg', story: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum dolorem eum.' },
  { name: 'Jennifer L.', photo: '/photos/2017/2017-2.jpg', story: 'Ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit.' },
  { name: 'Daniel C.', photo: '/photos/2018/2018-1.jpg', story: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae.' },
  { name: '', photo: '/photos/2019/2019-3.jpg', story: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis.' },
  { name: 'Mei-Ling T.', photo: '/photos/2023/2023-3.jpg', story: 'Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint molestiae non recusandae.' },
  { name: 'Eric H.', photo: '/photos/2025/2025-5.jpg', story: 'Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores.' },
]


const STRIP_VW = 480        // total strip width in vw
const STEP_VW = 25          // how much to pan per button press
const MAX_SCROLL_VW = 380   // STRIP_VW - 100vw visible

const ALL_SLOTS = [
  // Group 0
  { top: '8%',  leftVw: -1,   width: 380, height: 255, zIndex: 2 },
  { top: '22%', leftVw: 19,   width: 380, height: 255, zIndex: 4 },
  { top: '50%', leftVw: 10,   width: 380, height: 255, zIndex: 3 },
  { top: '5%',  leftVw: 61,   width: 380, height: 255, zIndex: 2 },
  { top: '32%', leftVw: 82,   width: 380, height: 255, zIndex: 4 },
  // Group 1
  { top: '35%', leftVw: 122,  width: 380, height: 255, zIndex: 3 },
  { top: '5%',  leftVw: 140,  width: 380, height: 255, zIndex: 4 },
  { top: '55%', leftVw: 130,  width: 380, height: 255, zIndex: 2 },
  { top: '15%', leftVw: 183,  width: 380, height: 255, zIndex: 4 },
  { top: '48%', leftVw: 205,  width: 380, height: 255, zIndex: 3 },
  // Group 2
  { top: '12%', leftVw: 242,  width: 380, height: 255, zIndex: 4 },
  { top: '50%', leftVw: 255,  width: 380, height: 255, zIndex: 2 },
  { top: '28%', leftVw: 265,  width: 380, height: 255, zIndex: 3 },
  { top: '8%',  leftVw: 308,  width: 380, height: 255, zIndex: 3 },
  { top: '40%', leftVw: 328,  width: 380, height: 255, zIndex: 2 },
  // Group 3
  { top: '18%', leftVw: 362,  width: 380, height: 255, zIndex: 2 },
  { top: '48%', leftVw: 378,  width: 380, height: 255, zIndex: 4 },
  { top: '5%',  leftVw: 390,  width: 380, height: 255, zIndex: 3 },
  { top: '32%', leftVw: 428,  width: 380, height: 255, zIndex: 4 },
  { top: '10%', leftVw: 448,  width: 380, height: 255, zIndex: 2 },
]

function pickRandom(arr, n) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, Math.min(n, a.length))
}

function ShareButton({ fontSize = 18, iconSize = 22, padding = '12px 25px' }) {
  return (
    <a
      href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || '#'}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        padding,
        borderRadius: 999,
        background: '#fdf108',
        border: '1px solid #fdf108',
        color: '#000',
        textDecoration: 'none',
        fontSize,
        letterSpacing: '0.3px',
        transition: 'background 0.2s, color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fdf108' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fdf108'; e.currentTarget.style.color = '#000' }}
    >
      Share yours
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
        <line x1="7" y1="17" x2="17" y2="7"/>
        <polyline points="7 7 17 7 17 17"/>
      </svg>
    </a>
  )
}

export default function TimelineStories() {
  const [displayedStories, setDisplayedStories] = useState(null)
  const [scrollVw, setScrollVw] = useState(0)
  const [activeIndex, setActiveIndex] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/stories', { signal: controller.signal })
      .then(r => r.json())
      .then(data => setDisplayedStories(pickRandom(data.length > 0 ? data : PLACEHOLDER_STORIES, 20)))
      .catch(err => { if (err.name !== 'AbortError') setDisplayedStories(pickRandom(PLACEHOLDER_STORIES, 20)) })
    return () => controller.abort()
  }, [])

  const displayStories = displayedStories ?? []

  const handleScrollPrev = () => setScrollVw(v => Math.max(0, v - STEP_VW))
  const handleScrollNext = () => setScrollVw(v => Math.min(MAX_SCROLL_VW, v + STEP_VW))

  const activeStory = activeIndex !== null ? displayStories[activeIndex] : null
  const handleClose = useCallback(() => setActiveIndex(null), [])
  const handleModalNext = useCallback(() => setActiveIndex(i => (i + 1) % displayStories.length), [displayStories.length])
  const handleModalPrev = useCallback(() => setActiveIndex(i => (i - 1 + displayStories.length) % displayStories.length), [displayStories.length])

  if (isMobile) {
    return (
      <section id="stories" className="snap-section" style={{ background: '#000', height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 0 2.5rem' }}>
        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '0 2rem 2.5rem' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fdf108', marginBottom: '0.75rem', fontFamily: 'var(--font-archivo), sans-serif' }}>
            Stories we carry
          </h2>
          <p style={{ fontSize: 16, color: '#fdf108', lineHeight: '24px', marginBottom: '1.25rem' }}>
            Each year, each performance feels like a wave. Some you catch, some move you, some leave something behind. We're collecting these little moments. If you were there, we'd love to hear yours.
          </p>
          <ShareButton fontSize={14} iconSize={16} padding="10px 18px" />
        </div>
        {/* Horizontal scroll strip */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 1.5rem 0.5rem', scrollbarWidth: 'none' }}>
          {displayStories.slice(0, 12).map((story, i) => (
            <div key={i} style={{ flexShrink: 0, width: 150, height: 110, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
              onClick={() => setActiveIndex(i)}>
              {story.photo
                ? <Image src={story.photo} alt="" fill sizes="150px" style={{ objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', background: '#222' }} />}
            </div>
          ))}
        </div>
        <StoryModal story={activeStory} onClose={handleClose} onNext={handleModalNext} onPrev={handleModalPrev} />
      </section>
    )
  }

  return (
    <section id="stories" className="snap-section" style={{ background: '#000', height: '100dvh', overflow: 'hidden' }}>
      {/* Continuous collage strip with centered CTA overlay */}
      <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: `${-scrollVw}vw` }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'absolute', top: 0, left: 0, width: `${STRIP_VW}vw`, height: '100%' }}
        >
          {displayStories.map((story, i) => {
            const slot = ALL_SLOTS[i]
            if (!slot) return null
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, zIndex: 10 }}
                onClick={() => setActiveIndex(i)}
                style={{
                  position: 'absolute',
                  top: slot.top,
                  left: `${slot.leftVw}vw`,
                  width: slot.width,
                  height: slot.height,
                  zIndex: slot.zIndex,
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                {story.photo
                  ? <Image src={story.photo} alt="" fill sizes={`${slot.width}px`} style={{ objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', background: '#222' }} />}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Centered CTA overlay */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', zIndex: 20, pointerEvents: 'none',
          width: '40vw',
        }}>
          <div style={{ mixBlendMode: 'difference' }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: '44px', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-archivo), sans-serif' }}>
              Stories we carry
            </h2>
            <p style={{ fontSize: 18, color: '#fff', lineHeight: '26px', letterSpacing: '0.3px', marginBottom: '1.5rem' }}>
              Each year, each performance feels like a wave. Some you catch, some move you, some leave something behind. We're collecting these little moments. If you were there, we'd love to hear yours.
            </p>
          </div>
          <div style={{ pointerEvents: 'auto' }}>
            <ShareButton />
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={handleScrollPrev}
          disabled={scrollVw === 0}
          style={{
            position: 'absolute', bottom: 16, right: 88, zIndex: 10,
            background: 'none', border: '1.5px solid #fff', borderRadius: '50%',
            width: 40, height: 40, cursor: scrollVw === 0 ? 'not-allowed' : 'pointer',
            opacity: scrollVw === 0 ? 0.25 : 0.7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button
          onClick={handleScrollNext}
          disabled={scrollVw >= MAX_SCROLL_VW}
          style={{
            position: 'absolute', bottom: 16, right: 40, zIndex: 10,
            background: 'none', border: '1.5px solid #fff', borderRadius: '50%',
            width: 40, height: 40, cursor: scrollVw >= MAX_SCROLL_VW ? 'not-allowed' : 'pointer',
            opacity: scrollVw >= MAX_SCROLL_VW ? 0.25 : 0.7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <StoryModal story={activeStory} onClose={handleClose} onNext={handleModalNext} onPrev={handleModalPrev} />
    </section>
  )
}
