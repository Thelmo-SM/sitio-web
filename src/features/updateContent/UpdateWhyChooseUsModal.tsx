'use client'

import { useState, useEffect } from 'react'
import { useModal } from '@/hooks/useModalForm'
import { Modal } from '@/components/ui/modals/Modal' 
import { getWhyChooseUs } from '@/services/content.service'
import { updateWhyChooseUs } from '@/services/updateContent'
import { WhyChooseUs } from '@/types/content'
import { FormMessage } from '@/components/ui/FormMessage'
import { validateBenefits, BenefitErrors } from '@/utils/why-chooseValidator'
import LoadingForm from '@/components/ui/loaders/LoadingForm' 

export const UpdateWhyChooseUsModal = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [benefits, setBenefits] = useState<WhyChooseUs[]>([])
  const [loading, setLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true) // Estado para el modal vacío
  const [errors, setErrors] = useState<BenefitErrors>({})
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)

  useEffect(() => {
    if (isOpen) {
      setIsInitialLoading(true)
      getWhyChooseUs().then((data) => {
        setBenefits(data)
        setIsInitialLoading(false)
      })
      setErrors({})
      setStatus(null)
    }
  }, [isOpen])

  const handleInputChange = (id: string, field: keyof WhyChooseUs, value: string) => {
    setBenefits(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    )
    if (errors[id]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [id]: { ...prev[id], [field]: undefined }
      }))
    }
  }

  const handleSaveAll = async () => {
    setStatus(null)
    const { errors: vErrors, isValid } = validateBenefits(benefits)
    
    if (!isValid) {
      setErrors(vErrors)
      setStatus({ type: 'error', msg: "Por favor, completa todos los campos marcados." })
      return
    }

    setLoading(true)
    try {
      const promises = benefits.map(item => 
        updateWhyChooseUs(item.id!, { 
          title: item.title, 
          description: item.description, 
          icon: item.icon 
        })
      )
      await Promise.all(promises)
      setStatus({ type: 'success', msg: "Beneficios actualizados correctamente." })
      setTimeout(() => {
        closeModal()
        setStatus(null)
      }, 1500)
    } catch {
      setStatus({ type: 'error', msg: "Error al conectar con la base de datos." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={openModal}
        className="w-full py-4 px-8 bg-green-900 hover:bg-green-800 text-white rounded font-bold text-sm transition-all shadow-lg shadow-green-900/20 cursor-pointer"
      >
        <span>✅</span> Editar Beneficios
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Configurar '¿Por qué elegirnos?'">
        <div className="space-y-6">
          
          {/* Si está cargando los datos de Firebase por primera vez */}
          {isInitialLoading ? (
            <div className="py-20 flex flex-col items-center justify-center bg-gray-900 rounded border border-gray-800 animate-pulse">
              <LoadingForm />
              <p className="text-gray-500 text-xs mt-4 uppercase tracking-widest">Sincronizando con Firestore...</p>
            </div>
          ) : (
            <>
              {status && <FormMessage type={status.type} message={status.msg} />}

              <div className="overflow-y-auto pr-2 space-y-6 bg-gray-900 max-h-[55vh] custom-scrollbar">
                {benefits.map((item, index) => {
                  const hasError = !!errors[item.id!];
                  return (
                    <div 
                      key={item.id || index} 
                      className={`p-5 rounded border transition-all ${
                        hasError ? 'bg-red-500/5 border-red-500/40' : 'bg-gray-800 border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                        <span className={`text-xs font-bold uppercase ${hasError ? 'text-red-400' : 'text-green-500'}`}>
                          Beneficio #{index + 1}
                        </span>
                        <span className="text-xl bg-gray-950 p-2 rounded shadow-inner">
                          {item.icon}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Icono (Emoji)</label>
                          <input
                            type="text"
                            value={item.icon}
                            onChange={(e) => handleInputChange(item.id!, 'icon', e.target.value)}
                            className={`w-full p-2.5 rounded bg-gray-950 text-white text-sm outline-none border transition-colors ${
                              errors[item.id!]?.icon ? 'border-red-500' : 'border-gray-700 focus:border-green-500'
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Título</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleInputChange(item.id!, 'title', e.target.value)}
                            className={`w-full p-2.5 rounded bg-gray-950 text-white text-sm outline-none border transition-colors ${
                              errors[item.id!]?.title ? 'border-red-500' : 'border-gray-700 focus:border-green-500'
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Descripción</label>
                          <textarea
                            value={item.description}
                            rows={2}
                            onChange={(e) => handleInputChange(item.id!, 'description', e.target.value)}
                            className={`w-full p-2.5 rounded bg-gray-950 text-white text-sm outline-none border transition-colors ${
                              errors[item.id!]?.description ? 'border-red-500' : 'border-gray-700 focus:border-green-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Botones de acción solo se muestran cuando hay datos */}
              <div className="flex gap-3 mt-8 border-t border-gray-800 pt-5">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 text-gray-400 rounded cursor-pointer hover:bg-gray-800 transition font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveAll}
                  disabled={loading}
                  className="flex-[2] px-4 py-3 bg-green-600 text-white rounded cursor-pointer font-bold hover:bg-green-500 disabled:opacity-50 transition-all shadow-lg shadow-green-600/20 flex items-center justify-center min-h-[52px]"
                >
                  {loading ? <LoadingForm /> : "Actualizar Todo"}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}