import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap" 
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Zentiri HR - Transform Your HR Operations",
  description:
    "Streamline hiring, enhance employee experience, and drive organizational growth with our comprehensive HR management platform",
  icons: {
    icon: [
      { url: '/zentiri-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/zentiri-logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/zentiri-logo.png',
  },
  generator: 'v0.dev'
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.className} ${playfair.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

