'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ArtistModal({ artist, onClose }) {
  useEffect(() => {
    if (!artist) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [artist, onClose])

  return (
    <AnimatePresence>
      {artist && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
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
              background: '#111',
              border: '1px solid rgba(253,241,8,0.2)',
              borderRadius: 4,
              maxWidth: 720,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1.25rem',
                opacity: 0.6,
                zIndex: 10,
                lineHeight: 1,
              }}
              onMouseEnter={e => (e.target.style.opacity = 1)}
              onMouseLeave={e => (e.target.style.opacity = 0.6)}
            >
              ×
            </button>

            {/* Photo placeholder */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/7',
                background: artist.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.7,
              }}
            >
              <span
                style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#fff', opacity: 0.5 }}
              >
                PHOTO
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2
                  style={{ fontSize: 40, fontWeight: 800, lineHeight: '40px', color: '#fff', marginBottom: '0.25rem' }}
                >
                  {artist.nameEn}
                </h2>
                <p
                  style={{ fontSize: 24, fontWeight: 500, lineHeight: '24px', color: '#fff' }}
                >
                  {artist.nameZh}
                </p>
              </div>

              <p
                style={{
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: '#fff',
                  opacity: 0.85,
                  marginBottom: '2rem',
                }}
              >
                {artist.fullBio}
              </p>

              {/* Social links */}
              {artist.socialLinks && artist.socialLinks.length > 0 && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  {artist.socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12,
                        letterSpacing: '2px',
                        color: '#fff',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(255,255,255,0.4)',
                        paddingBottom: '2px',
                      }}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              )}

              {/* YouTube embed */}
              <div style={{ aspectRatio: '16/9', width: '100%' }}>
                <iframe
                  src={artist.youtubeId}
                  title={`${artist.nameEn} video`}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
