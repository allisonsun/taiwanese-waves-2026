'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ArtistModal from './ArtistModal'

const artists = [
  {
    id: 1,
    nameEn: 'CHEN YU',
    nameZh: '陳宇',
    shortBio: 'Blending Taiwanese folk with ambient electronics, Chen Yu creates soundscapes that feel like mountain mist.',
    fullBio: 'Chen Yu grew up in the foothills of Alishan, where the sounds of traditional Taiwanese folk music mingled with the static of late-night radio broadcasts. His debut album "山霧" (Mountain Mist) received critical acclaim across East Asia, earning him a place at international festivals from Seoul to Amsterdam. His live performances are meditative experiences, layering traditional pipa samples with contemporary electronic production.',
    bgColor: '#2a3a4a',
    socialLinks: [{ icon: 'Instagram', url: '#' }, { icon: 'Spotify', url: '#' }],
    youtubeId: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    nameEn: 'LIN MEI',
    nameZh: '林美',
    shortBio: 'Indie-pop songwriting meets classical piano training in Lin Mei\'s introspective, genre-defying work.',
    fullBio: 'Lin Mei studied classical piano at the National Taiwan University of Arts before turning to songwriting in her mid-twenties. Her music is a delicate negotiation between the formal discipline of her training and the emotional rawness of personal narrative. Her 2024 EP "靜水" (Still Water) spent three months on Taiwan\'s independent music charts, introducing her vulnerable, literary lyrics to a growing international audience.',
    bgColor: '#3a2a4a',
    socialLinks: [{ icon: 'Instagram', url: '#' }, { icon: 'YouTube', url: '#' }],
    youtubeId: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    nameEn: 'WANG HAO',
    nameZh: '王浩',
    shortBio: 'Post-rock architect. Wang Hao\'s guitar work has been called "the sound of a city that never sleeps."',
    fullBio: 'Wang Hao is the guitarist and primary composer behind Taiwan\'s most celebrated post-rock act. His compositions build from silence into towering walls of sound, drawing comparisons to Mogwai and Godspeed You! Black Emperor while maintaining a distinctly Taiwanese sensibility — threading in traditional erhu motifs and pentatonic scales. His solo project explores more intimate territory, with acoustic pieces that reveal the quieter side of his musical imagination.',
    bgColor: '#4a3a2a',
    socialLinks: [{ icon: 'Instagram', url: '#' }, { icon: 'Bandcamp', url: '#' }],
    youtubeId: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 4,
    nameEn: 'HSU LING',
    nameZh: '許玲',
    shortBio: 'Jazz vocalist and composer, Hsu Ling weaves Mandarin poetry into modern jazz frameworks.',
    fullBio: 'Hsu Ling is one of Taiwan\'s most distinctive jazz voices — a vocalist and composer who treats Mandarin poetry as the raw material for musical exploration. Trained at Berklee College of Music, she returned to Taipei to lead a quartet that has redefined what Taiwanese jazz can sound like. Her 2025 album "朝露" (Morning Dew) features settings of classical Tang poetry alongside original compositions in a hybrid language that is entirely her own.',
    bgColor: '#2a4a3a',
    socialLinks: [{ icon: 'Instagram', url: '#' }, { icon: 'Apple Music', url: '#' }],
    youtubeId: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 5,
    nameEn: 'KAO JUN',
    nameZh: '高峻',
    shortBio: 'Electronic producer and DJ, Kao Jun bridges Taiwanese temple music with contemporary club culture.',
    fullBio: 'Kao Jun began his musical life playing percussion in Taiwanese temple ceremonies, an experience that would define his approach to rhythm and ritual. Now based between Taipei and Berlin, he produces music that fuses the hypnotic patterns of traditional ceremony with the forward momentum of contemporary electronic dance music. His sets are immersive, often incorporating field recordings from across Taiwan\'s diverse landscape.',
    bgColor: '#3a4a2a',
    socialLinks: [{ icon: 'Instagram', url: '#' }, { icon: 'SoundCloud', url: '#' }],
    youtubeId: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 6,
    nameEn: 'WU FANG',
    nameZh: '吳芳',
    shortBio: 'Multi-instrumentalist and vocalist, Wu Fang\'s music is a dialogue between Hakka heritage and modern R&B.',
    fullBio: 'Wu Fang grew up in a Hakka-speaking household in Hsinchu County, surrounded by the distinctive folk traditions of that community. Her music is a conversation between that heritage and the contemporary R&B and soul influences she absorbed through years of performing in Taipei\'s live music circuit. Her voice — warm, precise, and emotionally direct — has made her one of Taiwan\'s most sought-after collaborators.',
    bgColor: '#4a2a3a',
    socialLinks: [{ icon: 'Instagram', url: '#' }, { icon: 'Spotify', url: '#' }],
    youtubeId: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
]

export default function Lineup() {
  const [activeArtist, setActiveArtist] = useState(null)

  return (
    <section
      id="lineup"
      style={{ padding: '6rem 2rem', background: '#000' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, lineHeight: '32px', letterSpacing: '1.1px', color: '#fff', marginBottom: '3rem' }}>
          Artists 2026
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}
        >
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
              onClick={() => setActiveArtist(artist)}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
                background: artist.bgColor,
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={`https://picsum.photos/seed/${artist.id}/480/720`}
                alt={artist.nameEn}
                style={{ display: 'block', width: '100%', height: 280, objectFit: 'cover' }}
              />
              <div style={{ padding: '0.75rem 1rem', background: '#111' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: '0.15rem' }}>
                  {artist.nameEn}
                </h3>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#fff', opacity: 0.5, marginBottom: '0.35rem' }}>
                  {artist.nameZh}
                </p>
                <p style={{ fontSize: 11, lineHeight: '16px', color: '#fff', opacity: 0.65 }}>
                  {artist.shortBio}
                </p>
                <p style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', opacity: 0.4, marginTop: '0.5rem' }}>
                  View profile →
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ArtistModal artist={activeArtist} onClose={() => setActiveArtist(null)} />
    </section>
  )
}
