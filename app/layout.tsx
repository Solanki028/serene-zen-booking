// import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// export const metadata: Metadata = {
//   title: 'Aroma Thai Spa - Authentic Thai Massage & Wellness Since 2008',
//   description: 'Experience authentic Thai massage and holistic wellness at Aroma Thai Spa. Expert therapists, serene environment, customized treatments. Book your relaxation journey today.',
//   keywords: 'Thai massage, wellness, spa, aromatherapy, relaxation, holistic health',
//   authors: [{ name: 'Aroma Thai Spa' }],
//   openGraph: {
//     title: 'Aroma Thai Spa - Authentic Thai Massage & Wellness',
//     description: 'Experience authentic Thai massage and holistic wellness. Expert therapists, serene environment.',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Aroma Thai Spa - Authentic Thai Massage & Wellness',
//     description: 'Experience authentic Thai massage and holistic wellness. Expert therapists, serene environment.',
//   },
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <link rel="icon" href="data:," /> */}
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}