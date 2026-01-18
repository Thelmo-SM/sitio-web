'use client'
import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase' 
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { Product } from '@/types/content'
import CreateProductForm from './CreateProductForm'
import { useModal } from '@/hooks/useModalForm'
import { Modal } from '@/components/ui/modals/Modal'
import ConfirmDeleteModal from '@/components/ui/modals/ConfirmDeleteModal'
import Image from 'next/image'

export default function ProductsComponent() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  
  // Hook para el modal de Crear/Editar
  const { isOpen, openModal, closeModal } = useModal()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Estados para el modal de Eliminación Personalizado
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("brand", "asc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)))
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Manejo de Modal Crear/Editar
  const handleOpenCreate = () => {
    setEditingProduct(null)
    openModal()
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    openModal()
  }

  // --- LÓGICA DE ELIMINACIÓN PERSONALIZADA ---
  const handlePrepareDelete = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete?.id) return
    
    setDeleteLoading(true)
    try {
      await deleteDoc(doc(db, "products", productToDelete.id))
      setIsDeleteOpen(false) // Cerrar tras éxito
    } catch (error) {
      console.error("Error al eliminar:", error)
      alert("No se pudo eliminar el producto")
    } finally {
      setDeleteLoading(false)
      setProductToDelete(null)
    }
  }

  const filteredProducts = products.filter(p => 
    p.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* HEADER CON BUSCADOR Y BOTÓN CREAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/50 p-6 rounded border border-slate-800">
        <div className="relative w-full md:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          <input 
            type="text"
            placeholder="Buscar por marca o modelo..."
            className="w-full bg-slate-950 border border-slate-800 p-3 pl-12 rounded text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
          onClick={handleOpenCreate}
          className="w-full md:w-auto px-6 py-3 rounded font-black bg-blue-600 text-white hover:bg-blue-500 cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
        >
          ➕ Nuevo Producto
        </button>
      </div>

      {/* MODAL CREAR / EDITAR */}
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal} 
        title={editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
      >
        <CreateProductForm 
          initialData={editingProduct} 
          onSuccess={closeModal} 
        />
      </Modal>

      {/* MODAL DE ELIMINACIÓN PERSONALIZADO */}
      <ConfirmDeleteModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        itemName={productToDelete ? `${productToDelete.brand} ${productToDelete.model}` : ""}
      />

      {/* TABLA DE PRODUCTOS */}
      <div className="bg-slate-900/50 border border-slate-800 overflow-hidden rounded-lg shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">
              <tr>
                <th className="p-5">Producto</th>
                <th className="p-5 text-center">Tipo</th>
                <th className="p-5">Precio</th>
                <th className="p-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={4} className="p-10 text-center text-slate-500 italic">Cargando inventario...</td></tr>
              ) : filteredProducts.map((p) => (
                <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image 
                         src={p.image} 
                         alt={`${p.brand} ${p.model}`}
                         
                         sizes="48px" // Optimización para el navegador
                         className="rounded object-cover bg-slate-800 border border-slate-700"
                         width={48}  // Equivale a w-12
                         height={48} // Equivale a h-12
                       />
                     </div>
                      <div>
                       <p className="font-bold text-white text-sm">{p.model}</p>
                       <p className="text-[10px] text-slate-500 uppercase font-bold">{p.brand}</p>
                     </div>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`text-[9px] px-2 py-1 rounded font-black uppercase border ${
                      p.type === 'phone' 
                      ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
                      : 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                    }`}>
                      {p.type === 'phone' ? '📱 Teléfono' : '🔌 Acc'}
                    </span>
                  </td>
                  <td className="p-5 font-mono text-green-500 font-bold tracking-tighter">${p.price}</td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handlePrepareDelete(p)} 
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-slate-400 transition-colors cursor-pointer"
                      >
                        🗑️
                      </button>       
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}