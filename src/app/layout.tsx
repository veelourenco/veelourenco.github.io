import type {Metadata} from 'next'
import {Geist} from 'next/font/google'
import {Cormorant_Garamond} from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Vee Lourenco',
  description: 'Artist • Musician • Creator',
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${cormorant.variable} antialiased bg-bg min-h-screen`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}

