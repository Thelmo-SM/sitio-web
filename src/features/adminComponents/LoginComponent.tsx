'use client'
import { useState, useRef } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { FirebaseError } from 'firebase/app'

export default function LoginComponent() {
  const [mode, setMode] = useState<'login' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('') // Para confirmar envío de correo
  const [loading, setLoading] = useState(false)
  
  // Antibot
  const [hp, setHp] = useState('')
  const startTime = useRef(Date.now())
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp !== '') return
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'login') {
        // Lógica de Login
        await signInWithEmailAndPassword(auth, email, password)
        router.replace('/administracion/home')
      } else {
        // Lógica de Recuperar Contraseña
        await sendPasswordResetEmail(auth, email)
        setMessage('Enlace enviado. Revisa tu bandeja de entrada.')
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      if (err instanceof FirebaseError) {
        const codes: Record<string, string> = {
          'auth/invalid-credential': 'Correo o contraseña incorrectos',
          'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
          'auth/user-not-found': 'Si el correo existe, recibirás un enlace.',
        }
        setError(codes[err.code] || 'Ocurrió un error en el servidor')
      } else {
        setError('Ocurrió un error inesperado')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form 
        onSubmit={handleAuth} 
        className="bg-gray-900 p-8 rounded border border-slate-800 w-full max-w-md shadow-2xl transition-all duration-300"
      >
        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
          {mode === 'login' ? 'Panel de Control' : 'Recuperar Acceso'}
        </h2>
        
        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-xs mb-4 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        {message && (
          <p className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded text-xs mb-4 animate-in fade-in slide-in-from-top-1">
            {message}
          </p>
        )}

        {/* Honeypot Invisible */}
        <input type="text" className="hidden" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} />
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              className="w-full bg-gray-800 border border-slate-800 p-3 rounded text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tienda.com"
            />
          </div>

          {mode === 'login' && (
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase">Contraseña</label>
              <input 
                type="password" 
                required={mode === 'login'}
                value={password}
                className="w-full bg-gray-800 border border-slate-800 p-3 rounded text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded uppercase text-xs font-black tracking-widest transition-all flex items-center justify-center gap-2
              ${loading 
                ? 'bg-blue-900/50 text-white/50 cursor-wait' 
                : 'bg-blue-900 hover:bg-blue-800 text-white cursor-pointer'
              }`}
          >
            {loading ? 'Procesando...' : mode === 'login' ? 'Entrar al Sistema' : 'Enviar Enlace'}
          </button>

          <div className="pt-2 text-center">
            <button 
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'reset' : 'login')
                setError('')
                setMessage('')
              }}
              className="text-[10px] font-black text-slate-500 uppercase hover:text-white transition-colors tracking-widest cursor-pointer"
            >
              {mode === 'login' ? '¿Olvidaste tu contraseña?' : 'Volver al inicio de sesión'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}