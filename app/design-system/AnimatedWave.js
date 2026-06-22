'use client'

import { motion } from 'framer-motion'

// Control-point ratios are consistent across all wave uses in this project.
// History:  period=26, numPeriods=8,  midY=8,  amplitude=5,  stroke=#000, strokeWidth=2.5
// Loader:   period=52, numPeriods=16, midY=16, amplitude=12, stroke=#000, strokeWidth=3
function buildPath(period, numPeriods, midY, amplitude) {
  const yHigh = midY - amplitude
  const yLow  = midY + amplitude
  let d = `M 0,${midY}`
  for (let i = 0; i < numPeriods; i++) {
    const x = i * period
    d += ` C ${x + period * 0.154},${yHigh} ${x + period * 0.346},${yHigh} ${x + period * 0.5},${midY}`
    d += ` C ${x + period * 0.654},${yLow}  ${x + period * 0.846},${yLow}  ${x + period},${midY}`
  }
  return d
}

export default function AnimatedWave({
  period,
  numPeriods,
  midY,
  amplitude,
  stroke = '#000',
  strokeWidth = 2.5,
  duration = 0.9,
  className,
  width,
  height,
}) {
  const d = buildPath(period, numPeriods, midY, amplitude)
  return (
    <svg
      className={className}
      width={width ?? period * numPeriods * 2}
      height={height ?? midY * 2}
    >
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        animate={{ x: [0, -period] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  )
}
