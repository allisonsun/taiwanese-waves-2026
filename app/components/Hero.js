'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const LIGHT = { fontFamily: 'var(--font-rational-light), sans-serif', fontWeight: 300 }
const BOLD  = { fontFamily: 'var(--font-rational), sans-serif' }

const dateContent = (color) => {
  const SMALL = { ...LIGHT, fontSize: 'var(--hero-font-small)', lineHeight: 'var(--hero-font-small-line)', display: 'block' }
  return (
    <>
      <p className="hero-date-left" style={{ ...BOLD, color }}>
        2026 <span style={LIGHT}>Aug 16</span>
        <br />
        <span style={SMALL}>Rumsey Playfield, Central Park</span>
      </p>
      <p className="hero-date-right" style={{ ...LIGHT, color }}>
        SummerStage
        <br />
        <span style={SMALL}>NYC</span>
      </p>
    </>
  )
}

export default function Hero() {
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
        fetchPriority="high"
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
        fetchPriority="high"
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
        {dateContent('#000')}

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
          {dateContent('#fff')}
        </motion.div>
      </motion.div>

    </section>
  )
}
