const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/taiwanesewaves/' },
  { label: 'Facebook', href: 'https://www.facebook.com/taiwanesewaves/' },
  { label: 'Email', href: 'mailto:info@taiwanesewaves.com' },
]

export default function Footer() {
  return (
    <footer
      style={{
        padding: '3rem 2rem',
        background: '#000',
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
            style={{ color: '#fff', fontSize: 18, letterSpacing: '0.3px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fdf108')}
            onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
