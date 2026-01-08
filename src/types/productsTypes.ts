export type ProductType = 'phone' | 'accessory'

export interface Phone {
  id: number
  type: ProductType
  brand: string
  model: string
  price: number
  storage?: string
  condition?: string
  image: string
}
