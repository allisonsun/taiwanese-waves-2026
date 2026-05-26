'use client'

import { useState, useEffect } from 'react'
import useIsMobile from '../hooks/useIsMobile'

const NAV_LINKS = [
  { label: 'Lineup', href: '#lineup' },
  { label: 'History', href: '#history' },
  { label: 'Memories', href: '#stories' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [overHistory, setOverHistory] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const el = document.getElementById('hero')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const textColor = (!scrolled || overHistory) ? '#000' : '#fff'

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'transparent',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="#" aria-label="Back to top">
          <img
            src="/logo.svg"
            alt="Taiwanese Waves"
            style={{ height: 32, width: 'auto', display: 'block' }}
          />
        </a>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 5 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? '#fff' : textColor, transition: 'background 0.3s, transform 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? '#fff' : textColor, transition: 'background 0.3s, opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: menuOpen ? '#fff' : textColor, transition: 'background 0.3s, transform 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  color: scrolled ? textColor : '#000',
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
        )}
        {/* White masked links — position: absolute so mask aligns with nav's top-left = viewport origin */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '1rem',
              pointerEvents: 'none',
              opacity: scrolled ? 0 : 1,
              transition: 'opacity 0.3s',
              WebkitMaskImage: 'url(/hero/double-circle.png)',
              WebkitMaskSize: '100vw auto',
              WebkitMaskPosition: '0 0',
              WebkitMaskRepeat: 'no-repeat',
              maskImage: 'url(/hero/double-circle.png)',
              maskSize: '100vw auto',
              maskPosition: '0 0',
              maskRepeat: 'no-repeat',
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {NAV_LINKS.map(({ label }) => (
                <span key={label} style={{ color: '#fff', fontSize: 14, lineHeight: '20px', letterSpacing: '.25px' }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </nav>


      {/* Mobile fullscreen menu */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-rational), sans-serif',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
