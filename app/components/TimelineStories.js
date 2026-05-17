'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StoryModal from './StoryModal'

const PLACEHOLDER_STORIES = [
  { name: 'Angela C.', story: 'My grandmother used to hum Taiwanese folk songs while cooking. Hearing that music live in New York, thousands of miles from where she grew up, made me cry in the best possible way. This festival is a gift.' },
  { name: 'David L.', story: "I came to NYC from Taipei ten years ago and sometimes wonder if I've lost something in translation. Taiwanese Waves reminds me that the best parts of home traveled with me." },
  { name: 'Michelle H.', story: "I'm third-generation Taiwanese American and never felt connected to that part of my identity until I attended this festival. Now I study Mandarin and play traditional instruments. It changed my life." },
  { name: 'Jason T.', story: "My parents never talked much about Taiwan growing up. Coming to this festival opened a door I didn't know was closed. I left with so many questions — the good kind." },
  { name: '', story: "I attended alone not knowing anyone, and left having made three new friends who share my background. There's something about this space that makes strangers feel like family." },
  { name: 'Priya K.', story: "I'm not Taiwanese but my partner is. Attending Taiwanese Waves together every year has become one of our most cherished traditions. I feel like I understand them so much better because of it." },
  { name: 'Kevin W.', story: "The pipa performance stopped me in my tracks. I'd never heard anything like it. I've been listening to traditional Taiwanese music on repeat ever since." },
  { name: '', story: "Grew up ashamed of my heritage in a mostly white town. Finding this community as an adult has been genuinely healing. Thank you for creating this space." },
  { name: 'Sarah M.', story: "My daughter is seven and asked me why the lady on stage was crying during her song. I told her sometimes music holds memories too big for words. She nodded like she understood." },
  { name: 'Brian C.', story: "I flew in from Chicago just for this. Worth every penny. The energy in that crowd — you can't manufacture that. It's real." },
  { name: 'Linda Y.', story: "I volunteered at the first small event in 2016. Seeing how it's grown into this massive celebration makes me so proud. I cry every single year." },
  { name: '', story: "The food vendors alone are worth the trip. But staying for the music, the art, the stories — that's what makes it unforgettable." },
  { name: 'Raymond F.', story: "I was born in Kaohsiung and moved here as a teenager. Every time I come to this festival I feel like I'm standing in two places at once. It's bittersweet and beautiful." },
  { name: 'Tina H.', story: "My dad passed last year. He was the one who always dragged me to cultural events I pretended to find boring. I went to Taiwanese Waves this year for him. I get it now, Dad." },
  { name: 'Chris A.', story: "As a filmmaker I came looking for subjects. I ended up becoming one — I've never felt so seen as when I watched the documentary shorts program." },
  { name: '', story: "I brought my college roommates who had never experienced anything like this. By the end of the night they were asking me to teach them Taiwanese phrases. Best night of the year." },
  { name: 'Nancy Z.', story: "The intergenerational panel made me call my grandmother the next morning. We talked for two hours about things we'd never spoken about before. That conversation is something I'll carry forever." },
  { name: 'Marcus L.', story: "I'm Black and Taiwanese and spend a lot of time navigating what that means. This festival is one of the few places where both parts of me feel welcome at the same time." },
  { name: 'Amy S.', story: "My son performed in the youth showcase. Watching him on that stage — confident, proud, connected to something larger than himself — I don't have words for how that felt." },
  { name: '', story: "I've been to music festivals all over the world. Taiwanese Waves is the only one where I've left feeling genuinely moved by something I couldn't fully explain. That's rare." },
]

const ROTATIONS = [-12, 5, -7, 15, -3, 9, -14, 6, -10, 4, 11, -8, 13, -5, 7, -11]
const ORIENTATIONS = ['v', 'v', 'h', 'v', 'h', 'v', 'v', 'h', 'v']

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(n, arr.length))
}

export default function TimelineStories() {
  const [stories, setStories] = useState(null)
  const [displayedStories, setDisplayedStories] = useState(null)
  const [activeStory, setActiveStory] = useState(null)
  const [shuffling, setShuffling] = useState(false)

  useEffect(() => {
    fetch('/api/stories')
      .then(r => r.json())
      .then(data => {
        const all = data.length > 0 ? data : PLACEHOLDER_STORIES
        setStories(all)
        setDisplayedStories(pickRandom(all, 9))
      })
      .catch(() => {
        setStories(PLACEHOLDER_STORIES)
        setDisplayedStories(pickRandom(PLACEHOLDER_STORIES, 9))
      })
  }, [])

  function shuffleStories() {
    setShuffling(true)
    setTimeout(() => setShuffling(false), 300)
    setDisplayedStories(pickRandom(stories ?? PLACEHOLDER_STORIES, 9))
  }

  const displayStories = displayedStories ?? []

  return (
    <section
      id="stories"
      style={{ padding: '6rem 2rem', background: '#000' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Polaroid Stories ── */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{ fontSize: 32, fontWeight: 700, lineHeight: '32px', letterSpacing: '1.1px', color: '#fff', marginBottom: '1.5rem' }}
            >
              Your Stories
            </h2>
            {stories && stories.length > 9 && (
              <motion.button
                onClick={shuffleStories}
                animate={shuffling ? { rotate: [0, 15, -15, 0] } : {}}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(253,241,8,0.5)',
                  color: '#fdf108',
                  padding: '8px 20px',
                  fontSize: 12,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Shuffle ↺
              </motion.button>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              justifyContent: 'center',
              padding: '2rem 0',
            }}
          >
            {displayStories.map((story, i) => {
              const isHorizontal = ORIENTATIONS[i % ORIENTATIONS.length] === 'h'
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(0,0,0,0.55)' }}
                  onClick={() => setActiveStory(story)}
                  style={{
                    background: '#f4efe8',
                    padding: '10px 10px 0',
                    width: isHorizontal ? 233 : 180,
                    cursor: 'pointer',
                    position: 'relative',
                    transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
                    borderRadius: 10,
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  {/* Photo area */}
                  {story.photo ? (
                    <img
                      src={story.photo}
                      alt=""
                      style={{
                        width: '100%',
                        height: isHorizontal ? 160 : 213,
                        objectFit: 'cover',
                        display: 'block',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: isHorizontal ? 160 : 213,
                        background: '#d9d9d9',
                      }}
                    />
                  )}

                {/* Bottom flap */}
                <div style={{ padding: '10px 4px 14px', minHeight: 64 }}>
                  <p
                    style={{
                      fontSize: 11,
                      lineHeight: '15px',
                      color: '#444',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: story.name ? 6 : 0,
                    }}
                  >
                    {story.story}
                  </p>
                  {story.name && (
                    <p style={{ fontSize: 10, color: '#999', fontStyle: 'italic' }}>
                      — {story.name}
                    </p>
                  )}
                </div>
              </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 400,
                lineHeight: '24px',
                color: '#fff',
                opacity: 0.6,
                marginBottom: '1rem',
              }}
            >
              Have a story to share?
            </p>
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 25px',
                border: '1px solid #fff',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 12,
                lineHeight: '20px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                transition: 'background 0.3s, color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#fff'
              }}
            >
              Share your story →
            </a>
          </div>
        </div>
      </div>

      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
    </section>
  )
}
