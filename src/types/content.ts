// types/content.ts

export type HomeContent = {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  phone: string
  whatsapp: string
}

// ----------------------------

export type Service = {
  id: string
  title: string
  description: string
  icon: string
}

// ----------------------------

export type ProductStatus = "available" | "out_of_stock" | "coming_soon"
export type ProductType = 'phone' | 'accessory'

export type Product = {
  id: string
  type: ProductType
  status: ProductStatus // Importante: para manejar el inventario
  brand: string
  model: string
  price: number
  screen: string
  
  // Especificaciones Técnicas (Las que ya tienes + sugerencias)
  storage?: string
  battery?: string | number;
  camera?: string
  screenSize?: string   // Ej: "6.7 pulgadas"
  color?: string        // Muy útil para accesorios e iPhones
  condition?: string
  
  // Imágenes
  image: string         // Portada
  images?: string[]     // Galería (tus 3 fotos)
  
  // Contenido adicional
  description?: string  // Para texto libre (ej: "Incluye cargador original")
  createdAt: number     // Timestamp para ordenar por "Recientes"
  
  // SEO / Filtros (Opcional pero recomendado)
  isFeatured?: boolean  // Para mostrar en una sección de "Destacados"
  discountPrice?: number // Por si quieres poner una oferta tachada
}
// ----------------------------

export type WhyChooseUs = {
  id: string
  title: string
  description: string
  icon: string
}

// ----------------------------

export type LocationContent = {
  address: string
  googleMapsUrl?: string
}
