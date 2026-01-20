import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      {/* Elementos Decorativos de Fondo img */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 space-y-6 max-w-lg">
        {/* Icono Visual */}
        <div className="relative inline-block">
          <span className="text-8xl md:text-9xl font-black text-slate-900 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl md:text-5xl animate-bounce">📱</span>
          </div>
        </div>

        {/* Mensaje de Error */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight">
            Se perdió la <span className="text-blue-500">conexión</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
            Parece que el producto o la página que buscas no existe o fue movida de nuestro inventario.
          </p>
        </div>

        {/* Acciones Rápida */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            Ir al Catálogo
          </Link>
          
          <Link 
            href="/administracion/home"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] rounded transition-all"
          >
            Panel de administración
          </Link>
        </div>

        {/* Detalle Técnico Estético */}
        <div className="pt-12">
          <p className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">
            Error_Code: DEVICE_NOT_FOUND // ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>
      </div>
    </main>
  )
}