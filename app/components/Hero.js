'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-section"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: '#fdf108',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Text content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            fontSize: 'clamp(3rem, 10vw, 100px)',
            fontWeight: 700,
            letterSpacing: '-1px',
            color: '#000',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          Taiwanese Waves
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            fontSize: 28,
            lineHeight: '28px',
            letterSpacing: 'normal',
            color: '#000',
            opacity: 0.7,
          }}
        >
          Aug 2026 &middot; Central Park &middot; NYC
        </motion.p>
      </div>

    </section>
  )
}
