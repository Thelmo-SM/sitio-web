'use client'

export const ProductCardSkeleton = () => {
  return (
    <div
      className="
        bg-gray-600/30
        backdrop-blur
        rounded
        overflow-hidden
        animate-pulse
      "
    >
      {/* Imagen */}
      <div className="h-48 w-full bg-gray-700" />

      {/* Contenido */}
      <div className="p-4">

        {/* Título */}
        <div className="h-5 bg-gray-700 rounded w-[80%] mb-3" />

        {/* Subtexto */}
        <div className="h-4 bg-gray-700 rounded w-[50%]" />

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">

          {/* Precio */}
          <div className="h-6 bg-gray-700 rounded w-20" />

          {/* Botón */}
          <div className="h-10 bg-gray-700 rounded w-28" />
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton