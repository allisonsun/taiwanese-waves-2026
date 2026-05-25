const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/taiwanesewaves/' },
  { label: 'Facebook', href: 'https://www.facebook.com/taiwanesewaves/' },
  { label: 'Email', href: 'mailto:info@taiwanesewaves.com' },
]

export default function Footer() {
  return (
    <footer id="footer">
      <div>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="footer-link"
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
