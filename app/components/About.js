export default function About() {
  return (
    <section id="about" className="snap-section">
      <div className="about-video-container">
        <video
          src="/2016-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="about-video"
        />
        <div className="about-video-vignette" />
        <h2 className="about-video-title">
          Celebrate a decade of music and memories with us
        </h2>
      </div>
    </section>
  )
}
