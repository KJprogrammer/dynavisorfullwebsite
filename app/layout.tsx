import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Mono, DM_Sans } from 'next/font/google'
import { ClientProviders } from '@/components/ClientProviders'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dynavisor — Software Defined Data Accelerator™',
  description:
    'TorrentPro™ builds a coherent data fabric 39× faster than Lustre. AFRL validated. DoD DSRC tested. 26 patents. Sovereign AI infrastructure for defence, finance, and enterprise.',
  keywords: 'Dynavisor, TorrentPro, sovereign AI, AFRL validated, DoD DSRC, data fabric, DIOV, kernel-bypass, NVMe, HPC',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body className="noise">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
