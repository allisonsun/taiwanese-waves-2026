const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/taiwanesewaves/' },
  { label: 'Facebook', href: 'https://www.facebook.com/taiwanesewaves/' },
  { label: 'Email', href: 'mailto:info@taiwanesewaves.com' },
]

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        padding: '1rem 2rem',
        background: '#fdf108',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            style={{ color: '#000', fontSize: 18, letterSpacing: '0.3px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
