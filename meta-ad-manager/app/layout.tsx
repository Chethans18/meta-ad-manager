import type { Metadata } from 'next'
import './globals.css'
import {AuthProvider} from '@/context/auth-context'
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { CampaignProvider } from "@/context/campaign-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CampaignProvider>
            {children}
            <Toaster />
          </CampaignProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
