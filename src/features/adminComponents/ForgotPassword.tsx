'use client'
import { useState, useRef } from 'react'
import { auth } from '@/lib/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

export default function ForgotPassword({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Antibot invisible
  const [hp, setHp] = useState('')
  const startTime = useRef(Date.now())

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp !== '') return; // Bloqueo bot

    // Bloqueo si envían en menos de 2 segundos
    if (Date.now() - startTime.current < 2000) {
      setError('Por favor, espera un momento antes de enviar.')
      return
    }

    setError('')
    setMessage('')
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setMessage('Se ha enviado un enlace a tu correo para restablecer la clave.')
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/user-not-found') {
          // Por seguridad, a veces es mejor decir que se envió el correo 
          // aunque el usuario no exista, para no dar pistas a hackers.
          setMessage('Si el correo está registrado, recibirás un enlace en breve.')
        } else {
          setError('No se pudo enviar el correo de recuperación.')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <h2 className="text-xl font-black text-white uppercase tracking-tighter">Recuperar Acceso</h2>
      
      {message && <p className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded text-xs">{message}</p>}
      {error && <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-xs">{error}</p>}

      <form onSubmit={handleReset} className="space-y-4">
        {/* Honeypot */}
        <input type="text" className="hidden" value={hp} onChange={(e) => setHp(e.target.value)} />
        
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase">Correo de Administrador</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-slate-800 p-3 rounded text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            placeholder="ejemplo@admin.com"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded uppercase text-xs font-black tracking-widest transition-all disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Enlace'}
        </button>

        <button 
          type="button"
          onClick={onBack}
          className="w-full text-[10px] font-black text-slate-500 uppercase hover:text-white transition-colors"
        >
          Volver al Login
        </button>
      </form>
    </div>
  )
}