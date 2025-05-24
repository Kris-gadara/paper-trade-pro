import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { TradingProvider } from "@/components/trading-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PaperTrade Pro - Virtual Stock Trading Platform",
  description: "Practice stock trading with virtual money. Learn, trade, and grow your portfolio risk-free.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <TradingProvider>
              {children}
              <Toaster />
            </TradingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
