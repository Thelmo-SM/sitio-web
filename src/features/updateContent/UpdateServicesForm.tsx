'use client'
import { useState, useEffect } from 'react'
import { useModal } from '@/hooks/useModalForm'
import { Modal } from '@/components/ui/modals/Modal' 
import { getServices } from '@/services/content.service'
import { updateServiceContent } from '@/services/updateContent'
import { Service } from '@/types/content'

export const UpdateServicesModal = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)

  // Cargar datos al abrir el modal
  useEffect(() => {
    if (isOpen) {
      getServices().then(setServices)
    }
  }, [isOpen])

  // Manejar cambios en cualquier input de cualquier tarjeta
  const handleInputChange = (id: string, field: string, value: string) => {
    setServices(prev => 
      prev.map(s => s.id === id ? { ...s, [field]: value } : s)
    )
  }

  // Guardar todos los cambios
  const handleSaveAll = async () => {
    setLoading(true)
    try {
      const promises = services.map(s => 
        updateServiceContent(s.id!, { 
          title: s.title, 
          description: s.description, 
          icon: s.icon 
        })
      )
      await Promise.all(promises)
      alert("✅ Todas las tarjetas actualizadas")
      closeModal()
    } catch {
      alert("❌ Error al actualizar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Botón que dispara el proceso */}
      <button 
        onClick={openModal}
        className="rounded
                  bg-blue-900
                  px-8 py-4
                  text-sm sm:text-base
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-blue-800 cursor-pointer"
      >
        <span>🛠️</span> Editar Servicios
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Configurar Servicios">
        <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-8">
          <p className="text-gray-500 text-sm">Modifica los datos de tus 4 tarjetas de servicio:</p>
          
          {services.map((service, index) => (
            <div key={service.id || index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-blue-500 tracking-wider">Tarjeta #{index + 1}</span>
                <span className="text-xl">{service.icon}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  value={service.title}
                  placeholder="Título"
                  onChange={(e) => handleInputChange(service.id!, 'title', e.target.value)}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-900 text-sm"
                />
                <input
                  type="text"
                  value={service.icon}
                  placeholder="Icono (Emoji)"
                  onChange={(e) => handleInputChange(service.id!, 'icon', e.target.value)}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-900 text-sm"
                />
                <textarea
                  value={service.description}
                  placeholder="Descripción"
                  rows={2}
                  onChange={(e) => handleInputChange(service.id!, 'description', e.target.value)}
                  className="w-full p-2 rounded border bg-white dark:bg-gray-900 text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Acciones del Modal */}
        <div className="flex gap-3 mt-6 border-t pt-4">
          <button 
            onClick={closeModal}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar Todo"}
          </button>
        </div>
      </Modal>
    </>
  )
}