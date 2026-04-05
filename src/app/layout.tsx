import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BillRipper',
  description: 'Rip your AWS/GCP Bill with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grid-gradient min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}