import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import Navbar from '@/components/Navbar'
import { Cormorant_Garamond, Dancing_Script } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: 'PlacePrep - Placement Preparation Platform',
  description: 'Prepare for placements with practice questions, performance analytics, and smart job matching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dancingScript.variable}`}>
      <body className="bg-[#09090b] text-white min-h-screen antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
