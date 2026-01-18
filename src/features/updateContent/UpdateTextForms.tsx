'use client'

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modals/Modal"
import { useModal } from "@/hooks/useModalForm"
import { UpdateServicesModal } from "./UpdateServicesForm"
import { UpdateWhyChooseUsModal } from "./UpdateWhyChooseUsModal"
import { updateHomeContent } from "@/services/updateContent" 
import { getHomeContent } from "@/services/content.service"
import { HomeContent } from "@/types/content"

export default function UpdateTextForms() {
  const { isOpen, openModal, closeModal } = useModal()
  const [homeData, setHomeData] = useState<HomeContent | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getHomeContent().then(setHomeData)
  }, [])

  const handleSaveHero = async (newData: Partial<HomeContent>) => {
    setLoading(true)
    const success = await updateHomeContent(newData)
    if (success) {
      alert("✅ Inicio actualizado correctamente")
      setHomeData(prev => prev ? { ...prev, ...newData } : prev)
      closeModal()
    } else {
      alert("❌ Error al actualizar")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-slate-200 py-25 px-4">
      <div className="container mx-auto max-w-5xl space-y-12">
        
        {/* Encabezado */}
        <header className="relative pb-8 border-b border-slate-800">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-blue-600 rounded-full" />
          <h1 className="text-4xl font-black text-white tracking-tight">
            Actualizar <span className="text-blue-500">Contenido</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Gestiona el contenido de tu tienda.</p>
        </header>

        {/* Grid de Tarjetas Uniformes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: HERO */}
          <div className="bg-gray-600/30 border border-slate-800 p-6 rounded hover:border-blue-500/50 transition-all group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🏠
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Inicio / Hero</h3>
              <p className="text-slate-400 text-sm mb-6">Modifica títulos, banners y contactos principales.</p>
            </div>
            <button 
              onClick={openModal}
              className="w-full py-4 px-8 sm:text-base bg-blue-900 hover:bg-blue-800 text-white rounded font-bold text-sm transition-all shadow-lg shadow-blue-900/20 cursor-pointer"
            >
              🏠 Editar Portada
            </button>
          </div>

          {/* CARD 2: SERVICIOS */}
          <div className="bg-gray-600/30 border border-slate-800 p-6 rounded hover:border-purple-500/50 transition-all group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🛠️
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Servicios</h3>
              <p className="text-slate-400 text-sm mb-6">Actualiza las tarjetas de reparación y soporte técnico.</p>
            </div>
            {/* Aquí el componente debe renderizar un botón idéntico pero Púrpura */}
            <UpdateServicesModal /> 
          </div>

          {/* CARD 3: BENEFICIOS */}
          <div className="bg-gray-600/30 border border-slate-800 p-6 rounded hover:border-green-500/50 transition-all group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confianza</h3>
              <p className="text-slate-400 text-sm mb-6">Gestiona por qué los clientes eligen tu tienda.</p>
            </div>
            {/* Aquí el componente debe renderizar un botón idéntico pero Verde */}
            <UpdateWhyChooseUsModal />
          </div>

        </div>

        {/* Modal para el Hero */}
        <Modal isOpen={isOpen} onClose={closeModal} title="Editar Contenido de Inicio">
          {homeData ? (
            <HeroForm initialData={homeData} onSave={handleSaveHero} isLoading={loading} />
          ) : (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  )
}

/* --- COMPONENTE HERO FORM --- */
function HeroForm({ initialData, onSave, isLoading }: { 
  initialData: HomeContent, 
  onSave: (data: Partial<HomeContent>) => void,
  isLoading: boolean 
}) {
  const [formData, setFormData] = useState(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Título Principal</label>
          <input 
            name="heroTitle"
            type="text" 
            value={formData.heroTitle}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Subtítulo</label>
          <input 
            name="heroSubtitle"
            type="text" 
            value={formData.heroSubtitle}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">WhatsApp</label>
          <input 
            name="whatsapp"
            type="text" 
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Teléfono</label>
          <input 
            name="phone"
            type="text" 
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">URL Imagen de Portada</label>
          <input 
            name="heroImage"
            type="text" 
            value={formData.heroImage}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-10 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50 shadow-lg"
        >
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  )
}