'use client'
import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { FirebaseError } from 'firebase/app'

export default function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // Estado para evitar múltiples clics
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/administracion/home')
     } catch (err) {
  if (err instanceof FirebaseError) {
    // Ahora TypeScript sabe que err tiene la propiedad .code
    if (err.code === 'auth/invalid-credential') {
      setError('El correo o la contraseña son incorrectos')
    } else if (err.code === 'auth/too-many-requests') {
      setError('Demasiados intentos. Intenta más tarde.')
    } else {
      setError('Error al conectar con el servidor')
    }
  } else {
    setError('Ocurrió un error inesperado')
  }
} finally {
  setLoading(false)
}
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form 
        onSubmit={handleLogin} 
        className="bg-gray-900 p-8 rounded border border-slate-800 w-full max-w-md shadow-2xl"
        autoComplete="off"
      >
        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Panel de Control</h2>
        
        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-xs mb-4 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase">Correo Electrónico</label>
            <input 
              type="email" 
              value={email} // Controlado por React
              className="w-full bg-gray-800 border border-slate-800 p-3 rounded text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tienda.com"
              
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase">Contraseña</label>
            <input 
              type="password" 
              value={password} // Controlado por React
              className="w-full bg-gray-800 border border-slate-800 p-3 rounded text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded uppercase text-xs font-black tracking-widest transition-all flex items-center justify-center gap-2
              ${loading 
                ? 'bg-blue-900/50 text-white/50 cursor-wait' 
                : 'bg-blue-900 hover:bg-blue-800 text-white cursor-pointer'
              }`}
          >
            {loading ? 'Verificando...' : 'Entrar al Sistema'}
          </button>
        </div>
      </form>
    </div>
  )
}