'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedWave } from '../design-system'

export default function Loader() {
  const [done, setDone] = useState(false)

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
          <div className="loader-wave">
            <AnimatedWave period={52} numPeriods={16} midY={16} amplitude={12} stroke="#000" strokeWidth={3} width={52 * 16} height={32} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
