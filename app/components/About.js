export default function About() {
  return (
    <section
      className="snap-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        background: '#000',
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            lineHeight: '32px',
            letterSpacing: '1.1px',
            color: '#fff',
            marginBottom: '2rem',
          }}
        >
          Celebrating 10 years
        </h2>
        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '.8px',
            color: '#fff',
            opacity: 0.85,
          }}
        >
          Taiwanese Waves is a celebration of Taiwanese music, art, and culture
          brought to the heart of New York City. Born from a desire to share the
          vibrant creative energy emerging from Taiwan&rsquo;s thriving indie scene,
          this festival brings together artists who have redefined what contemporary
          Taiwanese music sounds like — blending traditional folk influences with
          electronic, jazz, and rock idioms.
        </p>
        <div
          style={{
            width: 60,
            height: 1,
            background: '#fff',
            margin: '3rem auto 0',
            opacity: 0.5,
          }}
        />
      </div>
    </section>
  )
}
