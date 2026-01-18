'use client'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase' 
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { Product } from '@/types/content' 

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Escucha en tiempo real los cambios en Firebase
    const q = query(collection(db, "products"), orderBy("brand", "asc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
      setProducts(docs)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/30">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800/50">
            <th className="p-4 text-xs font-black uppercase text-slate-500">Producto</th>
            <th className="p-4 text-xs font-black uppercase text-slate-500">Tipo</th>
            <th className="p-4 text-xs font-black uppercase text-slate-500">Precio</th>
            <th className="p-4 text-xs font-black uppercase text-slate-500">Info Extra</th>
            <th className="p-4 text-xs font-black uppercase text-slate-500">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-slate-800" alt={p.model} />
                  <div>
                    <div className="font-bold text-white">{p.brand}</div>
                    <div className="text-sm text-slate-400">{p.model}</div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase">
                  {p.type}
                </span>
              </td>
              <td className="p-4 font-mono text-green-500 font-bold">${p.price}</td>
              <td className="p-4 text-sm text-slate-400">
                {p.storage && <span>{p.storage}</span>}
                {p.condition && <span className="ml-2 text-slate-600">({p.condition})</span>}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">✏️</button>
                  <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-slate-400 transition-colors">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}