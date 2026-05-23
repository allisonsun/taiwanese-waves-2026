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

const ORIENTATIONS = ['v', 'v', 'h', 'v', 'h', 'v', 'v', 'h', 'v', 'h', 'v', 'v', 'h', 'v', 'h', 'v', 'h', 'v', 'v', 'h']
const POSITIONS = [
  { top: '3%',  left: '1%'  },
  { top: '4%',  left: '38%' },
  { top: '2%',  left: '72%' },
  { top: '38%', left: '0%'  },
  { top: '36%', left: '80%' },
  { top: '62%', left: '18%' },
  { top: '70%', left: '4%'  },
  { top: '68%', left: '44%' },
  { top: '63%', left: '74%' },
  { top: '18%', left: '14%' },
  { top: '16%', left: '58%' },
  { top: '22%', left: '84%' },
  { top: '48%', left: '-2%' },
  { top: '50%', left: '88%' },
  { top: '80%', left: '56%' },
  { top: '8%',  left: '26%' },
  { top: '6%',  left: '88%' },
  { top: '52%', left: '70%' },
  { top: '78%', left: '26%' },
  { top: '84%', left: '74%' },
]

const MOBILE_POSITIONS = [
  { top: '2%',  left: '-2%' },
  { top: '1%',  left: '55%' },
  { top: '14%', left: '20%' },
  { top: '12%', left: '68%' },
  { top: '28%', left: '-4%' },
  { top: '30%', left: '78%' },
  { top: '44%', left: '-3%' },
  { top: '42%', left: '80%' },
  { top: '58%', left: '-3%' },
  { top: '56%', left: '76%' },
  { top: '70%', left: '5%'  },
  { top: '68%', left: '58%' },
  { top: '78%', left: '25%' },
  { top: '76%', left: '62%' },
  { top: '84%', left: '42%' },
]
const MOBILE_ROTATIONS = [-4, 3, 1, -3, -2, 5, 4, -1, -3, 2, -5, 4, 3, -4, 2]

function pickRandom(arr, n) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, Math.min(n, a.length))
}

function StoriesCenter() {
  const isMobile = useIsMobile()
  return (
    <>
      <svg
        viewBox="0 0 700 300"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 50, overflow: 'visible', pointerEvents: 'none', width: isMobile ? 320 : '50vw', height: isMobile ? 240 : '50vh' }}
      >
        <ellipse cx="350" cy="150" rx="350" ry="150" fill="none" stroke="#fdf108" strokeWidth="2" />
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 51, width: isMobile ? 220 : 440, pointerEvents: 'none' }}>
        <h2 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 600, lineHeight: isMobile ? '32px' : '36px', letterSpacing: 'normal', color: '#fdf108', marginBottom: isMobile ? '0.75rem' : '1rem' }}>
          Share your memories
        </h2>
        <p style={{ fontSize: isMobile ? 14 : 18, color: '#fdf108', lineHeight: isMobile ? '20px' : '24px', letterSpacing: '0.3px', maxWidth: 480, marginBottom: isMobile ? '1.25rem' : '1.5rem' }}>
          Memories from fans, artists, and volunteers who've been part of our journey. If you were there, we'd love to hear yours.
        </p>
        <div style={{ pointerEvents: 'auto' }}>
          <ShareButton fontSize={isMobile ? 14 : undefined} iconSize={isMobile ? 16 : undefined} padding={isMobile ? '10px 18px' : undefined} />
        </div>
      </div>
    </>
  )
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
  const [activeIndex, setActiveIndex] = useState(null)
  const [raisedIndices, setRaisedIndices] = useState([])
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
  const activeStory = activeIndex !== null ? displayStories[activeIndex] : null
  const handleClose = useCallback(() => setActiveIndex(null), [])
  const handleNext = useCallback(() => setActiveIndex(i => (i + 1) % displayStories.length), [displayStories.length])
  const handlePrev = useCallback(() => setActiveIndex(i => (i - 1 + displayStories.length) % displayStories.length), [displayStories.length])
  const modal = (
    <StoryModal
      story={activeStory}
      onClose={handleClose}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  )

  if (isMobile) {
    return (
      <section id="stories" style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
        {displayStories.slice(0, MOBILE_POSITIONS.length).map((story, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            onClick={() => setActiveIndex(i)}
            style={{ position: 'absolute', top: MOBILE_POSITIONS[i].top, left: MOBILE_POSITIONS[i].left, rotate: MOBILE_ROTATIONS[i], cursor: 'pointer', zIndex: 4 }}
          >
            <div style={{ background: '#fff', padding: 5, borderRadius: 6, lineHeight: 0 }}>
              {story.photo
                ? <Image src={story.photo} alt="" width={100} height={120} style={{ objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: 100, height: 120, background: '#d9d9d9' }} />}
            </div>
          </motion.div>
        ))}

        <StoriesCenter />

        {modal}
      </section>
    )
  }

  return (
    <section id="stories" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '4rem 0', background: '#000' }}>
      <div style={{ width: '90vw', margin: '0 auto' }}>
        <div style={{ position: 'relative', width: '100%', height: '75vh' }}>

          <StoriesCenter />

          {displayStories.map((story, i) => {
            const isHorizontal = ORIENTATIONS[i % ORIENTATIONS.length] === 'h'
            const pos = POSITIONS[i % POSITIONS.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, rotate: { duration: 0.15, delay: 0 } }}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 2 : -2 }}
                onHoverStart={() => setRaisedIndices(prev => [...prev.filter(x => x !== i), i])}
                onHoverEnd={() => setRaisedIndices(prev => prev.filter(x => x !== i))}
                onClick={() => setActiveIndex(i)}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  cursor: 'pointer',
                  zIndex: (() => { const ri = raisedIndices.indexOf(i); return ri !== -1 ? 4 + ri + 1 : 4 })(),
                }}
              >
                <div style={{ background: '#fff', padding: 6, borderRadius: 8, lineHeight: 0 }}>
                  {story.photo
                    ? <Image src={story.photo} alt="" width={isHorizontal ? 213 : 180} height={isHorizontal ? 180 : 213} style={{ objectFit: 'cover', display: 'block' }} />
                    : <div style={{ width: isHorizontal ? 213 : 180, height: isHorizontal ? 180 : 213, background: '#d9d9d9' }} />}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      {modal}
    </section>
  )
}
