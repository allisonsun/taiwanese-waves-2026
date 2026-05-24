'use client'

import { useEffect } from 'react'

export default function ScrollBackground() {
  useEffect(() => {
    function update() {
      const aboutEl = document.getElementById('about')
      if (!aboutEl) return

      // How many px of About are currently visible from the bottom of the viewport
      const visibleHeight = Math.max(0, window.innerHeight - aboutEl.getBoundingClientRect().top)
      const oneThird = aboutEl.offsetHeight / 3

      // Yellow until 1/3 of About has scrolled into view, then let CSS black take over
      aboutEl.style.background = visibleHeight < oneThird ? '#fdf108' : ''
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return null
}
