import localFont from 'next/font/local'
import './globals.css'

const archivo = localFont({
  src: './fonts/Archivo-VariableFont.ttf',
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata = {
  title: 'Taiwanese Waves 2026',
  description: 'A celebration of Taiwanese music and culture — August 2026, Central Park, NYC',
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body style={{ background: '#000', color: '#fff', fontFamily: 'var(--font-archivo), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
