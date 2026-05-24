export default function About() {
  return (
    <section
      id="about"
      className="snap-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Video - full width, cinematic pill shape */}
      <div
        className="about-video-container"
        style={{
          position: 'relative',
          width: '100vw',
          maxWidth: 1800,
          aspectRatio: '2 / 1',
          borderRadius: 80,
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <video
          src="/2016-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Dark vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 55% 60% at center, transparent 35%, rgba(0,0,0,0.95) 78%, #000 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Title overlay */}
        <h2
          className="about-video-title"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70vw',
            textAlign: 'center',
            fontSize: 64,
            fontWeight: 600,
            lineHeight: '68px',
            letterSpacing: 'normal',
            color: '#fdf108',
            WebkitTextStroke: '3px #000',
            paintOrder: 'stroke fill',
            margin: 0,
            zIndex: 2,
          }}
        >
          Celebrate a decade of music and memories with us
        </h2>
      </div>
    </section>
  )
}
