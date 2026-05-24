'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Lineup', href: '#lineup' },
  { label: 'History', href: '#history' },
  { label: 'Memories', href: '#stories' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overHistory, setOverHistory] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.8
      setScrolled(next)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const el = document.getElementById('history')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setOverHistory(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const textColor = (!scrolled || overHistory) ? '#000' : '#fff'

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
      <img
        src="/logo.svg"
        alt="Taiwanese Waves"
        style={{ height: 32, width: 'auto', display: 'block' }}
      />
      <div style={{ display: 'flex', gap: '1.25rem' }}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
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
