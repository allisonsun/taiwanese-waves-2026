'use client'

import { ParallaxProvider } from 'react-scroll-parallax'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Lineup from './components/Lineup'
import History from './components/History'
import TimelineStories from './components/TimelineStories'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'

export default function Home() {
  return (
    <ParallaxProvider>
      <Nav />
      <Hero />
      <About />
      <Lineup />
      <History />
      <TimelineStories />
      <Sponsors />
      <Footer />
    </ParallaxProvider>
  )
}
