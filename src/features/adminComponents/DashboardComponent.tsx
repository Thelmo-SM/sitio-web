'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { Product } from '@/types/content'
import Image from 'next/image'

export default function DashboardComponent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "products"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)))
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Cálculos de estadísticas
  const stats = {
    totalProducts: products.length,
    totalInversion: products.reduce((acc, p) => acc + Number(p.price), 0),
    phoneCount: products.filter(p => p.type === 'phone').length,
    accCount: products.filter(p => p.type === 'accessory').length,
    uniqueBrands: [...new Set(products.map(p => p.brand))].length,
    // Estadísticas de condición
    newCount: products.filter(p => p.condition === 'Nuevo').length,
    usedCount: products.filter(p => p.condition?.toLowerCase().includes('usado') || p.condition === 'Como Nuevo').length
  }

  // Últimos 3 productos agregados (ordenados por ID o fecha si la tienes)
  const recentProducts = [...products].reverse().slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[25em]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. MÉTRICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Valor Total</p>
          <h3 className="text-3xl font-mono font-bold text-white">${stats.totalInversion.toLocaleString()}</h3>
          <p className="text-slate-500 text-[10px] mt-2 italic">Inversión en vitrina</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-[10px] font-black text-purple-500 uppercase tracking-[0.2em] mb-1">Dispositivos</p>
          <h3 className="text-3xl font-bold text-white">{stats.phoneCount}</h3>
          <p className="text-slate-500 text-[10px] mt-2 italic">{stats.newCount} Nuevos / {stats.usedCount} Usados</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1">Accesorios</p>
          <h3 className="text-3xl font-bold text-white">{stats.accCount}</h3>
          <p className="text-slate-500 text-[10px] mt-2 italic">Complementos en stock</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">Marcas</p>
          <h3 className="text-3xl font-bold text-white">{stats.uniqueBrands}</h3>
          <p className="text-slate-500 text-[10px] mt-2 italic">Fabricantes registrados</p>
        </div>
      </div>

      {/* 2. CUERPO DEL DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Distribución por Marcas */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Distribución de Inventario
          </h4>
          
          <div className="space-y-6">
            {Array.from(new Set(products.map(p => p.brand))).slice(0, 5).map(brand => {
              const count = products.filter(p => p.brand === brand).length;
              const percentage = (count / products.length) * 100;
              return (
                <div key={brand} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                    <span className="text-slate-300">{brand}</span>
                    <span className="text-slate-500">{count} equipos</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna Derecha: Recientes + Estado  */}
        <div className="space-y-6">
          {/* ÚLTIMOS INGRESOS */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Últimos ingresos</h4>
            <div className="space-y-3">
              {recentProducts.map(rp => (
                <div key={rp.id} className="flex items-center gap-3 p-2 bg-slate-950/50 border border-slate-800 rounded-xl group hover:border-blue-500/30 transition-colors">
                  <Image src={rp.image} alt="" className="w-10 h-10 rounded object-cover bg-slate-800" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[10px] font-bold truncate">{rp.model}</p>
                    <p className="text-slate-500 text-[8px] uppercase tracking-tighter">{rp.brand} • {rp.condition}</p>
                  </div>
                  <div className="text-green-500 font-mono text-[10px] font-bold">${Number(rp.price).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ESTADO ONLINE */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-black uppercase italic text-lg leading-tight">Catálogo Live</h4>
              <p className="text-blue-100 text-[10px] mt-1 opacity-90">Sincronizado con tienda física.</p>
              <a href="/" target="_blank" className="inline-block mt-4 bg-white text-blue-600 font-black px-4 py-2 rounded text-[9px] uppercase tracking-widest hover:bg-blue-50 transition-all">
                Ver Tienda
              </a>
            </div>
            <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">📱</div>
          </div>
        </div>

      </div>
    </div>
  )
}