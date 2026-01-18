'use client'
import { useState, useEffect } from 'react'
import { useModal } from '@/hooks/useModalForm'
import { Modal } from '@/components/ui/modals/Modal' 
import { getWhyChooseUs } from '@/services/content.service' // Tu función GET
import { updateWhyChooseUs } from '@/services/updateContent'  // Tu función UPDATE
import { WhyChooseUs } from '@/types/content'

export const UpdateWhyChooseUsModal = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [benefits, setBenefits] = useState<WhyChooseUs[]>([])
  const [loading, setLoading] = useState(false)

  // Cargar datos al abrir el modal
  useEffect(() => {
    if (isOpen) {
      getWhyChooseUs().then(setBenefits)
    }
  }, [isOpen])

  // Manejar cambios en tiempo real en el array local
  const handleInputChange = (id: string, field: string, value: string) => {
    setBenefits(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    )
  }

  // Guardar todos los beneficios modificados
  const handleSaveAll = async () => {
    setLoading(true)
    try {
      // Creamos una promesa por cada beneficio para actualizar en paralelo
      const promises = benefits.map(item => 
        updateWhyChooseUs(item.id!, { 
          title: item.title, 
          description: item.description, 
          icon: item.icon 
        })
      )
      
      await Promise.all(promises)
      alert("✅ Beneficios actualizados correctamente")
      closeModal()
    } catch (error) {
      console.error(error)
      alert("❌ Error al guardar los beneficios")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Botón de activación */}
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
        <span>✅</span> Editar Beneficios
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Configurar '¿Por qué elegirnos?'">
        <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
          <p className="text-gray-500 text-sm">
            Edita los pilares de confianza de tu tienda (Garantía, Rapidez, etc.):
          </p>
          
          {benefits.map((item, index) => (
            <div 
              key={item.id || index} 
              className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4"
            >
              <div className="flex items-center justify-between border-b dark:border-gray-700 pb-2">
                <span className="text-xs font-bold text-green-500 uppercase">Beneficio #{index + 1}</span>
                <span className="text-xl bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                  {item.icon}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Icono (Emoji)</label>
                  <input
                    type="text"
                    value={item.icon}
                    onChange={(e) => handleInputChange(item.id!, 'icon', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Título del Beneficio</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleInputChange(item.id!, 'title', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Descripción Corta</label>
                  <textarea
                    value={item.description}
                    rows={2}
                    onChange={(e) => handleInputChange(item.id!, 'description', e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de acción fija al fondo del modal */}
        <div className="flex gap-3 mt-8 border-t dark:border-gray-700 pt-5">
          <button 
            onClick={closeModal}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Cerrar
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 shadow-md transition-all active:scale-95"
          >
            {loading ? "Guardando..." : "Actualizar Todo"}
          </button>
        </div>
      </Modal>
    </>
  )
}