'use client'

import { useState } from "react"
import Image from "next/image"
import { Product } from "@/types/content"

export const ProductDetail = ({ product }: { product: Product }) => {
  // Manejo de galería con fallback a la imagen única
  const gallery = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]
  
  const [activeImg, setActiveImg] = useState(gallery[0])

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa este equipo:\n*${product.brand} ${product.model}*\nPrecio: $${product.price.toLocaleString()}\n\n¿Tienen disponibilidad?`
    )
    window.open(`https://wa.me/8294451034?text=${message}`, '_blank')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* IMAGEN PRINCIPAL */}
      <div className="relative h-64 w-full bg-slate-50 rounded overflow-hidden border">
        <Image 
          src={activeImg} 
          fill 
          className="object-contain p-2" 
          alt={product.model} 
        />
      </div>

      {/* MINIATURAS (Las 3 imágenes) */}
      <div className="flex gap-2 justify-center">
        {gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(img)}
            className={`relative w-14 h-14 rounded-md overflow-hidden border-2 transition-all
              ${activeImg === img ? 'border-blue-500 scale-105' : 'border-transparent opacity-60'}`}
          >
            <Image src={img} fill className="object-cover" alt="thumb" />
          </button>
        ))}
      </div>

      {/* INFO DEL PRODUCTO */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-blue-900 uppercase tracking-tighter">{product.brand}</p>
            <h3 className="text-xl font-black text-gray-900">{product.model}</h3>
          </div>
          <p className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded border border-gray-100">
            <span className="block text-[10px] text-gray-400 font-bold uppercase">Estado</span>
            <span className="text-sm font-bold text-gray-700">{product.condition || 'N/A'}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded border border-gray-100">
            <span className="block text-[10px] text-gray-400 font-bold uppercase">Memoria</span>
            <span className="text-sm font-bold text-gray-700">{product.storage || 'N/A'}</span>
          </div>
        </div>

        {/* BOTÓN AL ADMIN */}
        <button 
          onClick={handleWhatsApp}
          className="w-full cursor-pointer bg-[#25D366] hover:bg-[#1fae53] text-white font-bold py-4 rounded flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
        >
          <span className="text-xl">💬</span>
          CONSULTAR POR WHATSAPP
        </button>
      </div>
    </div>
  )
};

export default ProductDetail;