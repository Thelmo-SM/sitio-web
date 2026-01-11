'use client'

import Image from "next/image"
import { useState } from "react"
import { Phone } from "@/types/productsTypes"
import { Product } from "@/types/content"

interface PhoneCardProps {
  phone: Product
}

export const ProductCard = ({ phone }: PhoneCardProps) => {
  const { brand, model, price, storage, condition, image } = phone
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="
         bg-gray-600/30 backdrop-blur 
        rounded 
        shadow-md 
        overflow-hidden
        transition-all 
        duration-300
        hover:shadow-2xl 
        hover:-translate-y-1
      "
    >
      {/* Imagen */}
      <div className="relative h-48 w-full bg-gray-200">
        
        {/* Skeleton SOLO imagen */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-300" />
        )}

        <Image
          src={image}
          alt={`${brand} ${model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
<h3
  className="
    text-gray-400
    text-lg
    font-semibold
    line-clamp-2
    min-h-[3rem]
  "
>
  {brand} {model}
</h3>

        <p className="text-sm text-gray-500">
          {storage} · {condition}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-400">
            RD$ {price.toLocaleString()}
          </span>

          <button className="bg-blue-900 text-gray-200 cursor-pointer px-4 py-2 rounded text-sm hover:bg-blue-800 transition">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard