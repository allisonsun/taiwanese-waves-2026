'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const soloArtists = [
  {
    id: 1,
    nameEn: 'Mong Tong',
    nameZh: '夢東',
    photo: '/artists/mong-tong.jpg',
    shortBio: 'Blending Taiwanese folk with ambient electronics, Mong Tong creates soundscapes that feel like mountain mist.',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/mongtongband/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/61QVaGjYK4UNd6uTz7Lzuo?si=4HkeQ9tHQIaoV92Q1ilZNw' }, { icon: 'YouTube', url: 'https://youtube.com/@mongtongband?si=2Gj5YytCU6r9XCwy' }],
  },
  {
    id: 3,
    nameEn: 'Chance Emerson',
    nameZh: '',
    photo: '/artists/chance-emerson.jpg',
    shortBio: 'Post-rock architect. Chance Emerson\'s guitar work has been called "the sound of a city that never sleeps."',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/chance.s.emerson/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/2qabc8edZgoWe8DY4HIGED?si=A_q_mw4sTX-S_9lZ3Y81Ag' }, { icon: 'YouTube', url: 'https://youtube.com/@chanceemersonmusic?si=RpPA-wZXpBchABId' }],
  },
  {
    id: 4,
    nameEn: 'Chinatown Records',
    nameZh: '唐人街唱片',
    photo: '/artists/chinatown-records.jpg',
    shortBio: 'Chinatown Records is a homegrown community effort to celebrate the sonic tapestry of music, memory, & history that comes with inherited family collections. Homebased in NYC\'s Manhattan Chinatown, DJ historian yiuyiu 瑶瑶 takes on her childhood name to care for & activate the Chinatown Records archive of over 30 record/CD/tape collections inherited from her family & neighbors.\n\nyiuyiu 瑶瑶 has the most fun playing records of golden songs at senior centers, leading karaoke dance floors with families & neighbors on the streets of Chinatown, & heating up club nights – as a dancer & DJ – with all genres of Chinese dance music. Spanning across Chinatown block parties, sonic histories, living room listenings, and beyond, Chinatown Records 華埠錄音 is an ever-growing record of the people we love, who bring all this music to life with us.',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/chinatownrecordsproject/' }, { icon: 'Website', url: 'https://www.chinatownrecords.us/' }],
  },
]

const trioArtists = [
  {
    id: 2,
    nameEn: '9m88',
    nameZh: '',
    photo: '/artists/9m88.jpg',
    shortBio: "Indie-pop songwriting meets soul and jazz in 9m88's introspective, genre-defying work.",
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/9m88/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/4PjY2961rc0MHE9zHYWEnH?si=_OZ5dOSSQ3qTAseakQm99w' }, { icon: 'YouTube', url: 'https://www.youtube.com/channel/UCo95y8CD2JpOR5eePxB1a7w' }],
  },
  {
    id: 5,
    nameEn: 'ØZI',
    nameZh: '',
    photo: '/artists/ozi.jpg',
    shortBio: 'Electronic producer and DJ, OZI bridges Taiwanese hip-hop with contemporary club culture.',
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/ozifp/?hl=en' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/7Icsejk4pdIhkq2KO5A0jD?si=vtKs7TKgQ8-oGWbhEkIL5g' }, { icon: 'YouTube', url: 'https://youtube.com/@ozifp?si=p5dn-7Gp1BBtKMzx' }],
  },
  {
    id: 6,
    nameEn: 'Yellow',
    nameZh: '黃宣',
    photo: '/artists/yellow.jpg',
    shortBio: "Multi-instrumentalist and vocalist, Yellow's music is a dialogue between Taiwanese heritage and modern R&B.",
    socialLinks: [{ icon: 'Instagram', url: 'https://www.instagram.com/y3loooooo/' }, { icon: 'Spotify', url: 'https://open.spotify.com/artist/6iUs0Aijnu60VAAf8Aj2YM?si=fwczfdz2TYuNCvdwqLty-A' }, { icon: 'YouTube', url: 'https://youtube.com/@yellow9819?si=bpB0nVLGMvpI_OBB' }],
  },
]

const ICON_MAP = { Instagram: '/instagram.svg', Spotify: '/spotify.svg', YouTube: '/youtube.svg', Website: '/globe.svg' }
const ICON_SIZE_MAP = {
  Instagram: { width: 32, height: 32 },
  Spotify:   { width: 28, height: 32 },
  YouTube:   { width: 35, height: 35 },
  Website:   { width: 30, height: 30 },
}

const MOTION_PROPS = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function ArtistName({ nameEn, nameZh, inline }) {
  return (
    <>
      <h3 style={{ fontSize: 40, fontWeight: 800, lineHeight: '40px', color: '#fff', margin: 0 }}>
        {nameEn}
        {inline && nameZh && <span style={{ fontSize: 24, fontWeight: 500, color: '#fff', marginLeft: 10 }}>{nameZh}</span>}
      </h3>
      {!inline && nameZh && <p style={{ fontSize: 24, fontWeight: 500, lineHeight: '24px', color: '#fff', margin: '4px 0 0' }}>{nameZh}</p>}
    </>
  )
}

function SocialLinks({ links, style }) {
  return (
    <div className="lineup-social" style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '16px 0', ...style }}>
      {links.map(link => {
        const src = ICON_MAP[link.icon]
        if (!src) return null
        return (
          <a key={link.icon} href={link.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, flexShrink: 0 }}
          >
            <img
              src={src}
              alt={link.icon}
              className={`social-icon social-icon-${link.icon.toLowerCase()}`}
              style={{ ...(ICON_SIZE_MAP[link.icon] ?? { width: 24, height: 24 }), display: 'block' }}
            />
          </a>
        )
      })}
    </div>
  )
}

export default function Lineup() {
  return (
    <section
      id="lineup"
      className="snap-section"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 0', background: '#000', color: '#fff' }}
    >
        <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: '32px', letterSpacing: 'normal', color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
          Lineup
        </h2>

        {/* Trio row: 9m88, ØZI, Yellow */}
          <motion.div {...MOTION_PROPS} className="lineup-trio" style={{ display: 'flex', gap: 2, padding: '0 0 3rem', width: '80vw', margin: '0 auto' }}>
            {trioArtists.map((artist, i) => {
              return (
              <div
                key={artist.id}
                className="lineup-trio-item"
                style={{ flex: 1, minWidth: 0 }}
              >
                <div className="lineup-trio-img-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '3 / 3.3', borderRadius: 0, overflow: 'hidden', background: '#111' }}>
                  <Image src={artist.photo} alt={artist.nameEn} fill style={{ objectFit: 'cover' }} priority />
                </div>
                <div className="lineup-trio-text" style={{ padding: '2.5rem 3.5rem 1.5rem', textAlign: 'center' }}>
                  <ArtistName nameEn={artist.nameEn} nameZh={artist.nameZh} inline />
                  <SocialLinks links={artist.socialLinks} style={{ justifyContent: 'center' }} />
                  <p style={{ fontSize: 17, fontWeight: 400, lineHeight: '24px', color: '#ffffffd9', textAlign: 'left' }}>{artist.shortBio}</p>
                </div>
              </div>
            )})}
          </motion.div>

        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', padding: '12rem 4rem 10rem' }} className="lineup-solo-container">
        <div className="lineup-solo-list" style={{ display: 'flex', flexDirection: 'column', gap: '16rem' }}>
          {soloArtists.map((artist, i) => {
            const isSquare = i === 1
            return (
              <motion.div
                key={artist.id}
                {...MOTION_PROPS}
                className="lineup-solo-row"
                style={{
                  display: 'flex',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  alignItems: 'flex-start',
                  gap: '4rem',
                }}
              >
                <Image
                  src={artist.photo}
                  alt={artist.nameEn}
                  width={isSquare ? 480 : i === 0 ? 560 : 640}
                  height={isSquare ? 480 : i === 0 ? 400 : 420}
                  className="lineup-solo-img"
                  style={{ objectFit: 'cover', flexShrink: 0, display: 'block' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '0.5rem' }}>
                  <ArtistName nameEn={artist.nameEn} nameZh={artist.nameZh} />
                  <SocialLinks links={artist.socialLinks} />
                  <p style={{ fontSize: 17, fontWeight: 400, lineHeight: '26px', color: '#ffffffd9', maxWidth: 440, whiteSpace: 'pre-line' }}>{artist.shortBio}</p>
                </div>
              </motion.div>
            )
          })}

        </div>
        </div>


    </section>
  )
}
