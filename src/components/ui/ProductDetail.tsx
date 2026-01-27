'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { Product } from "@/types/content"

export const ProductDetail = ({ product }: { product: Product }) => {
  // FUERZA LA GALERÍA: Combinamos imagen principal + array secundario
  // Usamos un Set para evitar que la imagen 0 se repita
  const gallery = Array.from(new Set([
    product.image,
    ...(product.images || [])
  ])).filter(Boolean);

  console.log('Galería del producto:', gallery);
  
  const [activeImg, setActiveImg] = useState(gallery[0])

  useEffect(() => {
    if (gallery.length > 0) setActiveImg(gallery[0]);
  }, [product.image]);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa: *${product.brand} ${product.model}*\nColor: ${product.color}\nPrecio: $${product.price}`
    )
    window.open(`https://wa.me/8294451034?text=${message}`, '_blank')
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto bg-gray-900/50 p-6 rounded border border-slate-800 backdrop-blur-md">
      
      {/* IMAGEN PRINCIPAL */}
      <div className="relative h-72 md:h-96 w-full bg-gray-900/50 rounded overflow-hidden border border-slate-800 shadow-2xl">
        <Image 
          src={activeImg} 
          fill 
          className="object-contain p-6 transition-transform duration-500 hover:scale-105" 
          alt={product.model} 
          unoptimized // Agregado para asegurar que Cloudinary cargue rápido en pruebas
        />
      </div>

      {/* MINIATURAS - Forzamos que se vean siempre */}
      <div className="flex gap-4 justify-center overflow-x-auto py-2">
        {gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(img)}
            className={`relative min-w-[6em] h-16 cursor-pointer rounded overflow-hidden border-2 transition-all
              ${activeImg === img ? 'border-blue-500 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-800 opacity-40 hover:opacity-100'}`}
          >
            <Image src={img} fill className="object-cover" alt={`Thumb ${i}`} />
          </button>
        ))}
      </div>

      {/* DETALLES ESTILO DARK */}
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-blue-900 text-sm font-black uppercase tracking-widest">{product.brand}</span>
            <h2 className="text-3xl font-black text-white tracking-tight">{product.model}</h2>
            <p className="text-slate-400 text-sm font-bold uppercase">{product.color || 'Sin color'}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-white">${product.price.toLocaleString()}</p>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${product.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {product.status === 'available' ? 'Disponible' : 'Agotado'}
            </span>
          </div>
        </div>

        {/* GRID DE SPECS DARK */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <SpecTile label="Estado" value={product.condition} icon="✨" />
          <SpecTile label="Memoria" value={product.storage} icon="💾" />
          {product.type === 'phone' && (
            <>
              {/* Corregido el nombre del campo para que no de undefined */}
              <SpecTile  label="Batería" value={product.battery ? `${product.battery}%` : 'N/A'} icon="🔋"/>
              <SpecTile label="Cámara" value={product.camera} icon="📸" />
              <SpecTile label="Pantalla" value={product.screen} icon="📱" />
            </>
          )}
        </div>

        {/* DESCRIPCIÓN DARK */}
        {product.description && (
          <div className="bg-gray-950/40 p-5 rounded border border-gray-800/50">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Descripción</p>
            <p className="text-sm text-slate-300 leading-relaxed italic">{product.description}</p>
          </div>
        )}

        <button 
          onClick={handleWhatsApp}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-green-900/20 uppercase tracking-widest text-xs"
        >
          <span className="text-xl">💬</span>
          Contactar por WhatsApp
        </button>
      </div>
    </div>
  )
}

const SpecTile = ({ label, value, icon }: { label: string, value?: string, icon: string }) => (
  <div className="bg-slate-900/80 p-4 rounded border border-gray-800 flex flex-col items-center justify-center text-center">
    <span className="text-xl mb-1">{icon}</span>
    <span className="text-sm font-black text-slate-500 uppercase tracking-tighter mb-1">{label}</span>
    <span className="text-sm font-bold text-slate-200 truncate w-full px-1">{value || 'N/A'}</span>
  </div>
)

export default ProductDetail