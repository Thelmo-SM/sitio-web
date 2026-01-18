import ProductsComponent from '@/features/adminComponents/ProductsComponent'

export default function ProductsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white">Gestión de Productos</h1>
      <ProductsComponent />
    </div>
  )
}