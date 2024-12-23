import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AntdRegistry } from '@ant-design/nextjs-registry';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
<AntdRegistry>{children}</AntdRegistry>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

