'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation' // Importamos usePathname
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname() // Obtenemos la ruta actual

  useEffect(() => {
    setMounted(true)
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // SI estamos en el login, no bloqueamos el paso
      if (pathname === '/administracion/login') {
        setLoading(false)
        return
      }

      if (user) {
        setLoading(false)
      } else {
        // Solo redirigimos si NO estamos ya en el login
        router.push('/administracion/login')
      }
    })

    return () => unsubscribe()
  }, [router, pathname])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return <>{children}</>
}