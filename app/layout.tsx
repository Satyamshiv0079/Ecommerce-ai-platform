import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/common/Footer'
import Chatbot from '@/components/ai/Chatbot'
import AuthSessionProvider from '@/components/common/SessionProvider'

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
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </AuthSessionProvider>
      </body>
    </html>
  )
}