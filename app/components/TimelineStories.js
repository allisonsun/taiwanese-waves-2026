'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const STORIES = [
  { name: 'Summer', location: 'Brooklyn, NYC', years: '2017, 2018, 2023', photo: '/memories/summer.jpeg', story: '第一次去Taiwanese wave是跟我的台灣好朋友，一起坐在野餐墊上感受夏夜晚風。黃玠輕輕柔柔唱著歌，張懸悄悄躲在鍵盤後。那個時候覺得，紐約真美好啊。我一定要每年都來這個活動。不知不覺就十年過去了，我跟當時的好朋友依然是好朋友而且一起在Brooklyn分別組建了家庭。' },
  { name: 'Stefanie', location: 'Portland, OR', years: '2016', photo: null, story: '是一扇任意門，可以去到心中那段最美好的時光。' },
  { name: 'Ahuhu', location: 'Brooklyn, NYC', years: '2018, 2023, 2025', photo: '/memories/ahuhu-1.jpeg', story: 'When DJ Mr.Skin got everyone singing and jumping up and down to Mando pop - it was a vibe. It was surreal to see Taiwanese artists singing and shining on stage in Central Park.' },
  { name: 'Brenda', location: 'NYC', years: '2019, 2023, 2025', photo: null, story: '從2019後每一次的Taiwanese Waves我都邀請身邊朋友一起參加，戲稱是台灣人的大野餐，一起分享與音樂共鳴的瞬間。' },
  { name: 'Brian', location: 'Los Angeles, CA', years: '2016', photo: '/memories/brian.JPG', story: 'I remember being at the first Taiwanese Waves and feeling proud, surprised, and energized by the fact that this crowd of New Yorkers were all there to experience Taiwanese musicians in the greatest place in New York City on a beautiful summer evening. I remember thinking whoever produced this event is a genius!' },
  { name: 'Fan', location: 'Taipei, Taiwan', years: '2016', photo: null, story: 'Seeing Anpu singing my favorite song on stage, in NYC. Seeing her voice marveled by all those who had never heard of her before. That moment inspired a deep feeling of honor within me. I truly felt happy for her, and proud at the same time.' },
  { name: 'George Lin', location: 'Brooklyn, NYC', years: '2023, 2025', photo: null, story: '跟娃娃合唱香格里拉，有點眼眶小泛淚.' },
  { name: 'Alice', location: 'Los Angeles, CA', years: '2016, 2018, 2019, 2023', photo: '/memories/alice-1.jpeg', story: 'One moment that deeply stayed with me was during the very first Taiwanese Waves we attended. I still remember being touched and healed by Anpu\'s voice. Hearing her music felt comforting to my homesick heart. That was also the first time we discovered Sunset Rollercoaster. When you\'ve lived away from home for a long time, you naturally wonder what\'s trending in Taiwan and what people are listening to—Taiwanese Waves helped me reconnect.\n\nTaiwanese Waves means connection, belonging, and home away from home. Living abroad, especially after being away from Taiwan for many years, there are moments when you deeply miss home and want to reconnect with Taiwanese culture. Taiwanese Waves became that place for me—a gathering that brought together Taiwanese people across the greater New York area and even New Jersey to celebrate music, friendship, and culture.' },
]

function StoryCard({ story }) {
  const yearsLabel = story.years
    ? `${story.years.split(',').length > 1 ? 'Years' : 'Year'} attended: ${story.years}`
    : ''

  return (
    <motion.div
      whileHover={{ scale: 1.02, zIndex: 10 }}
      style={{ background: '#fff', borderRadius: 16, padding: '1rem', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
    >
      {story.photo && (
        <img src={story.photo} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', marginBottom: '1rem' }} />
      )}
      <blockquote style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#222', margin: '0 0 1rem' }}>
        {story.story.split('\n\n').map((para, i) => (
          <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0' }}>{para}</p>
        ))}
      </blockquote>
      <div>
        {story.name && <p style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{story.name}</p>}
        <p style={{ fontSize: 12, color: '#111', margin: 0 }}>
          {[story.location, yearsLabel].filter(Boolean).join(' · ')}
        </p>
      </div>
    </motion.div>
  )
}

function ShareButton({ bordered }) {
  return (
    <a
      href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="share-btn"
      style={bordered ? { border: '2px solid #111' } : undefined}
    >
      Share yours
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
        <line x1="7" y1="17" x2="17" y2="7"/>
        <polyline points="7 7 17 7 17 17"/>
      </svg>
    </a>
  )
}

export default function TimelineStories() {
  const [displayedStories, setDisplayedStories] = useState(STORIES)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/stories', { signal: controller.signal })
      .then(r => r.json())
      .then(data => { if (data.length > 0) setDisplayedStories(data) })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return (
    <section id="stories" className="stories-section">
      {/* Mobile */}
      <div className="stories-mobile">
        {/* Title — always visible */}
        <div style={{ padding: '3rem 1.5rem 1.5rem' }}>
          <div style={{ background: '#fdf108', borderRadius: 16, padding: '1.5rem' }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: '0.75rem', fontFamily: 'var(--font-archivo), sans-serif' }}>
              Stories we carry
            </h2>
            <p style={{ fontSize: 14, color: '#111', lineHeight: '22px', marginBottom: '1.25rem' }}>
              Each year, each performance feels like a wave. Some you catch, some move you, some leave something behind. We're collecting these little moments. If you were there, we'd love to hear yours.
            </p>
            <ShareButton bordered />
          </div>
        </div>
        {/* Swipeable story carousel */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          padding: '0 7.5vw 3rem',
          gap: '1rem',
          alignItems: 'flex-start',
        }}>
          {/* Summer + Stefanie + George Lin */}
          <div style={{ flexShrink: 0, width: '85vw', scrollSnapAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StoryCard story={displayedStories[0]} />
            <StoryCard story={displayedStories[1]} />
            <StoryCard story={displayedStories[6]} />
          </div>
          {/* Ahuhu + Brenda */}
          <div style={{ flexShrink: 0, width: '85vw', scrollSnapAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StoryCard story={displayedStories[2]} />
            <StoryCard story={displayedStories[3]} />
          </div>
          {/* Brian + Fan */}
          <div style={{ flexShrink: 0, width: '85vw', scrollSnapAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StoryCard story={displayedStories[4]} />
            <StoryCard story={displayedStories[5]} />
          </div>
          {/* Alice */}
          <div style={{ flexShrink: 0, width: '85vw', scrollSnapAlign: 'center' }}>
            <StoryCard story={displayedStories[7]} />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="stories-desktop">
        <div style={{ width: '100%', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', width: '100%' }}>
            {/* col 1: Summer, Ahuhu */}
            <div style={{ width: 'clamp(280px, 30vw, 480px)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <StoryCard story={displayedStories[0]} />
              <StoryCard story={displayedStories[2]} />
            </div>
            {/* col 2: Fan, title, Brian, Brenda */}
            <div style={{ width: 'clamp(280px, 30vw, 480px)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <StoryCard story={displayedStories[5]} />
              <div style={{ background: '#fdf108', borderRadius: 16, padding: '1.5rem' }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, lineHeight: '34px', color: '#111', margin: '0 0 0.75rem', fontFamily: 'var(--font-archivo), sans-serif' }}>
                  Stories we carry
                </h2>
                <p style={{ fontSize: 14, color: '#111', lineHeight: '22px', margin: '0 0 1.25rem' }}>
                  Each year, each performance feels like a wave. Some you catch, some move you, some leave something behind. We're collecting these little moments. If you were there, we'd love to hear yours.
                </p>
                <ShareButton bordered />
              </div>
              <StoryCard story={displayedStories[4]} />
              <StoryCard story={displayedStories[3]} />
            </div>
            {/* col 3: Alice, Stefanie, George Lin */}
            <div style={{ width: 'clamp(280px, 30vw, 480px)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <StoryCard story={displayedStories[7]} />
              <StoryCard story={displayedStories[1]} />
              <StoryCard story={displayedStories[6]} />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
