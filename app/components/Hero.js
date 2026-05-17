'use client'

import { motion } from 'framer-motion'
import { useParallax } from 'react-scroll-parallax'

function WaveLayer({ speed, color, opacity, top, height, zIndex }) {
  const { ref } = useParallax({ speed })
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        height,
        zIndex,
        opacity,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <path
          fill={color}
          d="M0,160 C240,260 480,60 720,160 C960,260 1200,60 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  )
}

export default function Hero() {
  return (
    <section
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
      {/* Wave layers with parallax */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0 }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <WaveLayer speed={-10} color="rgba(0,0,0,0.07)" opacity={1} top="40%" height="60%" zIndex={1} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
      >
        <WaveLayer speed={-6} color="rgba(0,0,0,0.12)" opacity={1} top="55%" height="50%" zIndex={2} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ position: 'absolute', inset: 0, zIndex: 3 }}
      >
        <WaveLayer speed={-3} color="rgba(0,0,0,0.18)" opacity={1} top="70%" height="40%" zIndex={3} />
      </motion.div>

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
            color: '#fff',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          TAIWANESE
          <br />
          WAVES
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            fontSize: 28,
            lineHeight: '28px',
            letterSpacing: '1.1px',
            color: '#fff',
            opacity: 0.7,
          }}
        >
          AUG 2026 &middot; CENTRAL PARK &middot; NYC
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', opacity: 0.5 }}>
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, #fff, transparent)',
            opacity: 0.4,
          }}
        />
      </motion.div>
    </section>
  )
}
