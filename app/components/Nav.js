'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textColor = scrolled ? '#fff' : '#000'

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'transparent',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{ color: textColor, fontSize: 14, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.3s' }}
      >
        TW
      </span>
      <div style={{ display: 'flex', gap: '1.25rem' }}>
        {['Lineup', 'Stories'].map((label, i) => (
          <a
            key={label}
            href={i === 0 ? '#lineup' : '#stories'}
            style={{
              color: textColor,
              textDecoration: 'none',
              fontSize: 14,
              lineHeight: '20px',
              letterSpacing: '.25px',
              opacity: 0.8,
              transition: 'color 0.3s, opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={e => (e.currentTarget.style.opacity = 0.8)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
