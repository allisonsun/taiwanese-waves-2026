import dynamic from 'next/dynamic'
import ParallaxWrapper from './components/ParallaxWrapper'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Lineup from './components/Lineup'
import Loader from './components/Loader'

const History = dynamic(() => import('./components/History'))
const TimelineStories = dynamic(() => import('./components/TimelineStories'))
const Sponsors = dynamic(() => import('./components/Sponsors'))
const Footer = dynamic(() => import('./components/Footer'))

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
