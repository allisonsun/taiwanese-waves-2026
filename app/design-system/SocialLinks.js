const ICON_MAP = {
  Instagram: '/socials/instagram.svg',
  Spotify:   '/socials/spotify.svg',
  YouTube:   '/socials/youtube.svg',
  Website:   '/socials/globe.svg',
}

// links: Array<{ icon: 'Instagram' | 'Spotify' | 'YouTube' | 'Website', url: string }>
export default function SocialLinks({ links }) {
  return (
    <div className="lineup-social">
      {links.map(link => {
        const src = ICON_MAP[link.icon]
        if (!src) return null
        return (
          <a
            key={link.icon}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="lineup-social-link"
          >
            <img
              src={src}
              alt={link.icon}
              className={`social-icon social-icon-${link.icon.toLowerCase()}`}
            />
          </a>
        )
      })}
    </div>
  )
}
