'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const WAVE_PERIOD = 52
const NUM_PERIODS = 16
const WAVE_PATH = (() => {
  let d = 'M 0,16'
  for (let i = 0; i < NUM_PERIODS; i++) {
    const x = i * WAVE_PERIOD
    d += ` C ${x+8},4 ${x+18},4 ${x+26},16 C ${x+34},28 ${x+44},28 ${x+52},16`
  }
  return d
})()

export default function Loader() {
  const [done, setDone] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    let imgDone = false
    let timerDone = false
    const tryFinish = () => { if (imgDone && timerDone) setDone(true) }

    const img = new window.Image()
    img.onload = () => { imgDone = true; tryFinish() }
    img.onerror = () => { imgDone = true; tryFinish() }
    img.src = '/hero/double-circle.png'

    const min = setTimeout(() => { timerDone = true; tryFinish() }, 1000)
    const fallback = setTimeout(() => setDone(true), 5000)
    return () => { clearTimeout(min); clearTimeout(fallback) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: '#fdf108',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: isMobile ? '40vw' : '20vw', height: 32, overflow: 'hidden' }}>
            <svg
              width={WAVE_PERIOD * NUM_PERIODS}
              height="32"
              viewBox={`0 0 ${WAVE_PERIOD * NUM_PERIODS} 32`}
            >
              <motion.path
                d={WAVE_PATH}
                fill="none"
                stroke="#000"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ x: [0, -WAVE_PERIOD] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
