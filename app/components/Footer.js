export default function Footer() {
  return (
    <footer
      style={{
        padding: '3rem 2rem',
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center',
      }}
    >
      {/* Social icons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <a
          href="#"
          aria-label="Instagram"
          style={{ color: '#fff', opacity: 0.5, transition: 'opacity 0.2s', lineHeight: 1 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={e => (e.currentTarget.style.opacity = 0.5)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <a
          href="mailto:hello@taiwanesewaves.com"
          aria-label="Email"
          style={{ color: '#fff', opacity: 0.5, transition: 'opacity 0.2s', lineHeight: 1 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={e => (e.currentTarget.style.opacity = 0.5)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <polyline points="2,4 12,13 22,4"/>
          </svg>
        </a>
        <a
          href="#"
          aria-label="Facebook"
          style={{ color: '#fff', opacity: 0.5, transition: 'opacity 0.2s', lineHeight: 1 }}
          onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={e => (e.currentTarget.style.opacity = 0.5)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
      </div>

      <p
        style={{
          fontSize: 20,
          fontWeight: 400,
          lineHeight: '24px',
          color: '#fff',
          opacity: 0.4,
        }}
      >
        &copy; 2026 Taiwanese Waves
      </p>
    </footer>
  )
}
