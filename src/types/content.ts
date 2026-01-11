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

export type ProductStatus = "available" | "out_of_stock"
export type ProductType = 'phone' | 'accessory'

export type Product = {
  id: string
  type: ProductType
  brand: string
  model: string
  price: number
  storage?: string
  condition?: string
  image: string
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
