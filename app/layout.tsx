import '../src/app/globals.css'

export const metadata = {
  title: 'BillRipper',
  description: 'Rip your AWS/GCP Bill with ease',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE_HERE',
  },
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
