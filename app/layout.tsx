import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import AuthSessionProvider from '@/components/providers/SessionProvider'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopAI - AI Powered Store',
  description: 'Shop smarter with AI recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}