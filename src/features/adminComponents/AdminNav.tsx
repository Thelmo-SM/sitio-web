'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'


export const AdminNav = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Inicio', href: '/administracion/home', icon: '📊' },
    { name: 'Actualizar Contenido', href: '/administracion/update-content', icon: '📝' },
    { name: 'Productos', href: '/administracion/products', icon: '📱' },
  ]

  if (pathname === '/administracion/login') {
    return null
  }

  // --- LÓGICA DE CIERRE DE SESIÓN ---
  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/administracion/login')
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      alert("Hubo un error al intentar salir.")
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-[100] w-full border-b bg-gray-900/80 border-white/10 backdrop-blur-md">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            
            <div className="flex items-center gap-4">
              {/* Botón Hamburguesa para Móvil */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 md:hidden text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMenuOpen ? (
                    <line x1="18" y1="6" x2="6" y2="18" />
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>

              <Link href="/administracion/home" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white transition-transform group-hover:rotate-12">
                  T
                </div>
                <span className="font-bold text-white tracking-tight">
                  Tienda<span className="text-blue-500">Admin</span>
                </span>
              </Link>
            </div>

            {/* Navegación Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all flex items-center gap-2 ${
                    pathname === link.href 
                      ? 'bg-gray-600/30 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Acciones Finales */}
            <div className="flex items-center gap-2">
               <button className="hidden sm:block p-2 text-slate-400 pointer-events-none">
                  <span className="text-xs font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded-md border border-green-500/20">
                    Online
                  </span>
               </button>
               
               {/* Botón de Logout Desktop */}
               <button 
                onClick={handleLogout}
                title="Cerrar Sesión"
                className="cursor-pointer p-2.5 bg-slate-800 text-slate-400 rounded-xl border border-slate-700 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
               >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MENÚ DESPLEGABLE MÓVIL (Drawer) */}
      <div className={`fixed inset-0 z-[90] md:hidden transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Overlay oscuro con blur */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={() => setIsMenuOpen(false)} 
        />
        
        {/* Contenido del Menú */}
        <div className={`absolute left-0 top-0 h-full w-72 bg-gray-900 p-6 shadow-2xl border-r border-white/10 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div className="font-black text-xl text-white uppercase tracking-tighter">Menú Admin</div>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 hover:text-white">✕</button>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  pathname === link.href 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-bold text-sm uppercase tracking-wide">{link.name}</span>
              </Link>
            ))}

            <hr className="my-4 border-white/5" />

            {/* Botón Salir en Móvil */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
            >
              <span className="text-xl">🚪</span>
              <span className="font-bold text-sm uppercase tracking-wide">Cerrar Sesión</span>
            </button>
          </div>

          <div className="absolute bottom-8 left-6 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
            V.1.0.0 - Panel Privado
          </div>
        </div>
      </div>
    </>
  )
}