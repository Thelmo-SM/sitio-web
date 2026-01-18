'use client'
import { usePathname } from 'next/navigation'
import Navbar from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function LayoutVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</> // En admin, no renderiza Navbar ni Footer públicos
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}