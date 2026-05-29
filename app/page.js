import ParallaxWrapper from './components/ParallaxWrapper'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Lineup from './components/Lineup'
import History from './components/History'
import TimelineStories from './components/TimelineStories'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'
import Loader from './components/Loader'

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
