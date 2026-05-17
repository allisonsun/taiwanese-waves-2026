'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StoryModal({ story, onClose }) {
  useEffect(() => {
    if (!story) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [story, onClose])

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
            padding: '2rem',
          }}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              color: '#111',
              maxWidth: 520,
              width: '100%',
              padding: '3rem',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: '#333',
                lineHeight: 1,
                opacity: 0.5,
              }}
              onMouseEnter={e => (e.target.style.opacity = 1)}
              onMouseLeave={e => (e.target.style.opacity = 0.5)}
            >
              ×
            </button>
            {story.photo ? (
              <img
                src={story.photo}
                alt=""
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  marginBottom: '1.5rem',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: '#fdf108',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '5rem', color: 'rgba(0,0,0,0.12)', lineHeight: 1 }}>"</span>
              </div>
            )}
            {story.name && (
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#c8a96e',
                  marginBottom: '0.5rem',
                }}
              >
                {story.name}
              </p>
            )}
            <p
              style={{ fontSize: 17, fontWeight: 400, lineHeight: '24px', color: '#222' }}
            >
              {story.story}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
