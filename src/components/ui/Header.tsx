'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Accesorios', href: '#accesorios' },
  { label: 'Reparaciones', href: '#reparaciones' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full bg-gray-900/80 backdrop-blur border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="#inicio" className="text-xl font-bold text-white">
            Sitio<span className="text-blue-500">Web</span>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-blue-500 transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-gray-300"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </nav>
      </header>

    {/* MOBILE MENU */}
<div
  className={`
    fixed inset-y-0 right-0 z-[100]
    w-80
    overflow-hidden
    pointer-events-none
    ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `}
>
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
    onClick={() => setOpen(false)}
  />

  {/* Drawer */}
<div
  className={`
    h-full
    bg-gray-900
    p-6
    shadow-2xl
    transform transition-transform duration-300 ease-out
    pointer-events-auto
    ${open ? 'translate-x-0' : 'translate-x-full'}
  `}
>
    {/* Close button */}
    <button
      onClick={() => setOpen(false)}
      className="mb-10 text-gray-400 hover:text-white transition"
    >
      ✕
    </button>

    {/* Links */}
    <ul className="flex flex-col gap-6">
      {navLinks.map((link, index) => (
        <li
          key={link.href}
          className={`
            transform transition-all duration-300
            ${open ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}
          `}
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <a
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-lg font-medium text-gray-300 hover:text-blue-500 transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

    {/* Brand */}
    <div className="mt-12 text-xl font-bold text-white">
      Sitio<span className="text-blue-500">Web</span>
    </div>
  </div>
</div>

    </>
  )
}
