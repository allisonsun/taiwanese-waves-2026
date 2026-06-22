'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function StoryModal({ story, onClose, onNext, onPrev }) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!story) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [story, onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      {story && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
          }}
        >
          <button aria-label="Previous" onClick={e => { e.stopPropagation(); onPrev() }} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', padding: '0.5rem' }}>‹</button>

          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              color: '#111',
              maxWidth: 520,
              width: '100%',
              padding: '1.5rem',
              position: 'relative',
              borderRadius: 16,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="story-modal-close"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: '#000',
                lineHeight: 1,
                zIndex: 10,
              }}
            >
              ×
            </button>
            {story.photo && (
              <img
                src={story.photo}
                alt=""
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', marginBottom: '1rem' }}
              />
            )}
            <blockquote style={{ fontSize: 17, fontWeight: 400, lineHeight: '26px', color: '#222', margin: '0 0 1rem' }}>
              {story.story.split('\n\n').map((para, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '1em 0 0' }}>{para}</p>
              ))}
            </blockquote>
            <div>
              {story.name && (
                <p style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{story.name}</p>
              )}
              <p style={{ fontSize: 12, color: '#111', margin: 0 }}>
                {[
                  story.location,
                  story.years
                    ? `${story.years.split(',').length > 1 ? 'Years' : 'Year'} attended: ${story.years}`
                    : ''
                ].filter(Boolean).join(' · ')}
              </p>
            </div>
          </motion.div>

          <button aria-label="Next" onClick={e => { e.stopPropagation(); onNext() }} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', padding: '0.5rem' }}>›</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
