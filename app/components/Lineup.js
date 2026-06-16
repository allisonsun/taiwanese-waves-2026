'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const soloArtists = [
  {
    id: 1,
    nameEn: 'Mong Tong',
    nameZh: '夢東',
    photo: '/artists/mong-tong.webp',
    shortBio: 'Mong Tong offers a fascinating glimpse into a different side of island culture through their signature blend of retro-textured electronic sounds. Inspired by Taiwanese temples, folk traditions, and dreamlike mysticism, their music carries the hazy charm of an old film while creating a sound that\'s both mesmerizing and impossible to forget.',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/mongtongband/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/61QVaGjYK4UNd6uTz7Lzuo?si=4HkeQ9tHQIaoV92Q1ilZNw' }, { icon: 'YouTube', url: 'https://youtube.com/@mongtongband?si=2Gj5YytCU6r9XCwy' }],
  },
  {
    id: 3,
    nameEn: 'Chance Emerson',
    nameZh: '',
    photo: '/artists/chance-emerson.webp',
    shortBio: 'When the excitement settles and the wild moments fade, Chance offers a different kind of magic. His grainy, soulful voice and honest folk-rock melodies drift through the air like a late-summer breeze in Central Park, just enough to sweep away the lingering heat of August.',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/chance.s.emerson/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/2qabc8edZgoWe8DY4HIGED?si=A_q_mw4sTX-S_9lZ3Y81Ag' }, { icon: 'YouTube', url: 'https://youtube.com/@chanceemersonmusic?si=RpPA-wZXpBchABId' }],
  },
  {
    id: 4,
    nameEn: 'Chinatown Records',
    nameZh: '華埠錄音',
    photo: '/artists/chinatown-records.webp',
    shortBio: 'A homegrown collective and archive based in NYC, Chinatown Records spins the stories of Chinatown through the crackle of vinyl. Through their grooves, the streets of New York and memories of Taiwan somehow find a shared rhythm, finding an unexpected but magical pulse that connects them across time and place.',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/chinatownrecordsproject/' }, { icon: 'Website', url: 'https://www.chinatownrecords.us/' }],
  },
]

const trioArtists = [
  {
    id: 2,
    nameEn: '9m88',
    nameZh: '',
    photo: '/artists/9m88.webp',
    shortBio: "Indie-pop songwriting meets soul and jazz in 9m88's introspective, genre-defying work.",
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/9m88/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/4PjY2961rc0MHE9zHYWEnH?si=_OZ5dOSSQ3qTAseakQm99w' }, { icon: 'YouTube', url: 'https://www.youtube.com/channel/UCo95y8CD2JpOR5eePxB1a7w' }],
  },
  {
    id: 5,
    nameEn: 'ØZI',
    nameZh: '',
    photo: '/artists/ozi.webp',
    shortBio: 'Electronic producer and DJ, OZI bridges Taiwanese hip-hop with contemporary club culture.',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/ozifp/?hl=en' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/7Icsejk4pdIhkq2KO5A0jD?si=vtKs7TKgQ8-oGWbhEkIL5g' }, { icon: 'YouTube', url: 'https://youtube.com/@ozifp?si=p5dn-7Gp1BBtKMzx' }],
  },
  {
    id: 6,
    nameEn: 'YELLOW',
    nameZh: '黃宣',
    photo: '/artists/yellow.webp',
    shortBio: "Multi-instrumentalist and vocalist, Yellow's music is a dialogue between Taiwanese heritage and modern R&B.",
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/y3loooooo/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/6iUs0Aijnu60VAAf8Aj2YM?si=fwczfdz2TYuNCvdwqLty-A' }, { icon: 'YouTube', url: 'https://youtube.com/@yellow9819?si=bpB0nVLGMvpI_OBB' }],
  },
]

const ICON_MAP = { Instagram: '/socials/instagram.svg', Spotify: '/socials/spotify.svg', YouTube: '/socials/youtube.svg', Website: '/socials/globe.svg' }

const MOTION_PROPS = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function ArtistName({ nameEn, nameZh }) {
  return (
    <div className="lineup-artist-name">
      <div className="lineup-name-line">
        <h3>{nameEn}</h3>
        {nameZh && <span className="lineup-artist-name-zh-inline">{nameZh}</span>}
      </div>
    </div>
  )
}

function SocialLinks({ links }) {
  return (
    <div className="lineup-social">
      {links.map(link => {
        const src = ICON_MAP[link.icon]
        if (!src) return null
        return (
          <a key={link.icon} href={link.url} target="_blank" rel="noopener noreferrer" className="lineup-social-link">
            <img src={src} alt={link.icon} className={`social-icon social-icon-${link.icon.toLowerCase()}`} />
          </a>
        )
      })}
    </div>
  )
}

export default function Lineup() {
  return (
    <section id="lineup" className="snap-section">
      <h2 className="lineup-heading">Lineup</h2>

      {/* Trio row: 9m88, ØZI, Yellow */}
      <motion.div {...MOTION_PROPS}>
        {/* Images + socials per artist */}
        <div className="lineup-trio" style={{ paddingBottom: '0' }}>
          {trioArtists.map((artist) => (
            <div key={artist.id} className="lineup-trio-item">
              <div className="lineup-trio-img-wrapper">
                <Image src={artist.photo} alt={artist.nameEn} width={600} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="lineup-trio-img" priority />
              </div>
              <div className="lineup-trio-info">
                <div className="lineup-trio-socials">
                  <SocialLinks links={artist.socialLinks} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Combined name */}
        <div className="lineup-trio-text lineup-trio-combined-name">
          <h3>9m88 + ØZI + YELLOW <span className="lineup-artist-name-zh-inline">黃宣</span></h3>
        </div>
        {/* Combined bio */}
        <div className="lineup-trio-bio lineup-trio-bio-container">
          <p>Just seeing these three names on the same lineup is enough to grab your attention. 9m88 brings those silky, soul-soaked mellow jazz vibes; ØZI hits hard with his bold, modern R&B energy; and Yellow shows up with an unmatched level of raw talent and stage charisma that feels effortless. A dream lineup like this doesn't come around often, and it's about to blow the roof off Central Park.</p>
        </div>
      </motion.div>

      <div className="lineup-solo-container">
        <div className="lineup-solo-list">
          {soloArtists.map((artist, i) => {
            return (
              <div key={artist.id}>
                <motion.div
                  {...MOTION_PROPS}
                  className="lineup-solo-row"
                >
                  <Image
                    src={artist.photo}
                    alt={artist.nameEn}
                    width={560}
                    height={560}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="lineup-solo-img"
                    style={{}}
                  />
                  <div className="lineup-solo-text">
                    <ArtistName nameEn={artist.nameEn} nameZh={artist.nameZh} />
                    <SocialLinks links={artist.socialLinks} />
                    <p className="lineup-solo-bio">{artist.shortBio}</p>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
