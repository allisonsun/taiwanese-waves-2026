'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import useIsMobile from '../hooks/useIsMobile'

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
    nameZh: '華埠錄音',
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

const ICON_MAP = { Instagram: '/socials/instagram.svg', Spotify: '/socials/spotify.svg', YouTube: '/socials/youtube.svg', Website: '/socials/globe.svg' }

const MOTION_PROPS = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function ArtistName({ nameEn, nameZh, inline }) {
  return (
    <div className="lineup-artist-name">
      <h3>
        {nameEn}
        {inline && nameZh && <span className="lineup-artist-name-zh-inline">{nameZh}</span>}
      </h3>
      {!inline && nameZh && <p className="lineup-artist-name-zh">{nameZh}</p>}
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
  const isMobile = useIsMobile()
  const nameRefs = useRef([])

  useEffect(() => {
    const equalize = () => {
      const els = nameRefs.current.filter(Boolean)
      if (!els.length) return
      els.forEach(el => { el.style.minHeight = '' })
      if (isMobile) return
      const max = Math.max(...els.map(el => el.offsetHeight))
      els.forEach(el => { el.style.minHeight = `${max}px` })
    }
    equalize()
    window.addEventListener('resize', equalize)
    return () => window.removeEventListener('resize', equalize)
  }, [isMobile])

  return (
    <section id="lineup" className="snap-section">
      <h2 className="lineup-heading">Lineup</h2>

      {/* Trio row: 9m88, ØZI, Yellow */}
      <motion.div {...MOTION_PROPS} className="lineup-trio">
        {trioArtists.map((artist, i) => (
          <div key={artist.id} className="lineup-trio-item">
            <div className="lineup-trio-img-wrapper">
              <Image src={artist.photo} alt={artist.nameEn} width={600} height={660} sizes="(max-width: 768px) 100vw, 33vw" className="lineup-trio-img" priority />
            </div>
            <div className="lineup-trio-info">
              <div className="lineup-trio-text" ref={el => { nameRefs.current[i] = el }}>
                <ArtistName nameEn={artist.nameEn} nameZh={artist.nameZh} inline={!isMobile} />
                {i < trioArtists.length - 1 && <span className="lineup-trio-plus">+</span>}
              </div>
              <div className="lineup-trio-socials">
                <SocialLinks links={artist.socialLinks} />
              </div>
              <div className="lineup-trio-bio">
                <p>{artist.shortBio}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="lineup-solo-container">
        <div className="lineup-solo-list">
          {soloArtists.map((artist, i) => {
            const isSquare = i === 1
            return (
              <div key={artist.id}>
                <motion.div
                  {...MOTION_PROPS}
                  className={`lineup-solo-row${i % 2 !== 0 ? ' lineup-solo-row-reverse' : ''}`}
                >
                  <Image
                    src={artist.photo}
                    alt={artist.nameEn}
                    width={isSquare ? 560 : i === 0 ? 800 : 640}
                    height={isSquare ? 560 : i === 0 ? 420 : 420}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="lineup-solo-img"
                    style={{
                      ...(i === 0 && !isMobile && { marginLeft: 'calc(-4rem - max(0px, (100vw - 1400px) / 2))', height: 600 }),
                      ...(i === 1 && { marginRight: '4rem' }),
                    }}
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
