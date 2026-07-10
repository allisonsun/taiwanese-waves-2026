import dynamic from 'next/dynamic'
import ParallaxWrapper from './components/ParallaxWrapper'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Lineup from './components/Lineup'
import Loader from './components/Loader'

import Sponsors from './components/Sponsors'
import Footer from './components/Footer'

const History = dynamic(() => import('./components/History'))
const TimelineStories = dynamic(() => import('./components/TimelineStories'))

export default function Home() {
  return (
    <ParallaxWrapper>
      <Loader />
      <Nav />
      <Hero />
      <About />
      <Lineup />
      <History />
      <TimelineStories />
      <Sponsors />
      <Footer />
    </ParallaxWrapper>
  )
}
