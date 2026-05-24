'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { useRef } from 'react'

const LIGHT = { fontFamily: 'var(--font-rational-light), sans-serif', fontWeight: 300 }
const BOLD  = { fontFamily: 'var(--font-rational), sans-serif' }

const dateContent = (color, isMobile) => {
  const SMALL = { ...LIGHT, fontSize: 'var(--hero-font-small)', lineHeight: 'var(--hero-font-small-line)', display: 'block' }
  const BASE  = { position: 'absolute', fontSize: 'var(--hero-font-large)', lineHeight: 'var(--hero-font-large-line)', margin: 0 }
  return (
    <>
      <p style={{ ...BASE, ...BOLD, bottom: isMobile ? '8rem' : '2rem', left: isMobile ? '1rem' : '2rem', color }}>
        2026 <span style={LIGHT}>Aug 16</span>
        <br />
        <span style={SMALL}>Rumsey Playfield, Central Park</span>
      </p>
      <p style={{ ...BASE, ...LIGHT, bottom: '2rem', right: isMobile ? '1rem' : '2rem', color, textAlign: 'right' }}>
        SummerStage
        <br />
        <span style={SMALL}>NYC</span>
      </p>
    </>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const circleScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])
  const spinnerScale = useTransform(scrollYProgress, [0, 1], [1, 0.4])
  const maskSize = useTransform(circleScale, s => {
    if (typeof window === 'undefined') return 'cover'
    return window.innerWidth > 1180
      ? `${(s * 100).toFixed(1)}vw auto`   // desktop: width-constrained
      : `auto ${(s * 100).toFixed(1)}vh`    // mobile/tablet: height-constrained
  })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="snap-section"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: `url('/hero/background.jpg') center / cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Double circle — full width */}
      <motion.img
        src="/hero/double-circle.png"
        alt=""
        className="hero-circle"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          translateX: '-50%',
          scale: circleScale,
          transformOrigin: 'top center',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Spinner */}
      <motion.img
        src="/hero/spinner.png"
        alt=""
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 'var(--spinner-top)',
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
          width: 'var(--spinner-size)',
          scale: spinnerScale,
          height: 'auto',
          zIndex: 5,
        }}
      />

      {/* Date — two layers: black base + white masked to circle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}
      >
        {/* Black text — always visible */}
        {dateContent('#000', isMobile)}

        {/* White text — mask tracks circle scale, text stays unscaled */}
        <motion.div
          className="hero-mask-layer"
          style={{
            maskSize,
            WebkitMaskSize: maskSize,
            maskPosition: 'center top',
            WebkitMaskPosition: 'center top',
          }}
        >
          {dateContent('#fff', isMobile)}
        </motion.div>
      </motion.div>

    </section>
  )
}
