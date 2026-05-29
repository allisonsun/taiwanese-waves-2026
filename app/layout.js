import localFont from 'next/font/local'
import './globals.css'

const archivo = localFont({
  src: './fonts/Archivo-VariableFont.ttf',
  variable: '--font-archivo',
  display: 'swap',
})

const rationalDisplay = localFont({
  src: './fonts/Rational Display Semi Bold.otf',
  variable: '--font-rational',
  display: 'swap',
})

const rationalDisplayLight = localFont({
  src: './fonts/Rational Display Light.otf',
  variable: '--font-rational-light',
  display: 'swap',
})

export const metadata = {
  title: 'Taiwanese Waves 2026',
  description: 'A celebration of Taiwanese music and culture — August 2026, Central Park, NYC',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'Taiwanese Waves 2026',
    description: 'A celebration of Taiwanese music and culture — August 2026, Central Park, NYC',
    images: [{ url: '/og-image.jpg', width: 1440, height: 1800 }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${rationalDisplay.variable} ${rationalDisplayLight.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
