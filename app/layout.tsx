import '../src/app/globals.css'

export const metadata = {
  title: 'BillRipper',
  description: 'Rip your AWS/GCP Bill with ease',
  verification: {
    google: 'uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc',
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
