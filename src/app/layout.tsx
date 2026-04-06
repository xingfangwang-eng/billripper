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
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WC4677QJMF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  // 动态注入项目名
  gtag('config', 'G-WC4677QJMF', {
    'project_name': 'src'
  });
</script>
      <body className="grid-gradient min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}