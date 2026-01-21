'use client'

import { useState, useEffect } from 'react'
import { useModal } from '@/hooks/useModalForm'
import { Modal } from '@/components/ui/modals/Modal' 
import { getServices } from '@/services/content.service'
import { updateServiceContent } from '@/services/updateContent'
import { Service } from '@/types/content'
import { validateServices, ServiceErrors } from '@/utils/servicesValidator' 
import FormMessage from '@/components/ui/FormMessage'
import LoadingForm from '@/components/ui/loaders/LoadingForm'

export const UpdateServicesModal = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true) // Control de carga inicial
  const [errors, setErrors] = useState<ServiceErrors>({})
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsInitialLoading(true)
      getServices().then((data) => {
        setServices(data)
        setIsInitialLoading(false)
      })
      setErrors({})
      setStatus(null)
    }
  }, [isOpen])

  const handleInputChange = (id: string, field: keyof Service, value: string) => {
    setServices(prev => 
      prev.map(s => s.id === id ? { ...s, [field]: value } : s)
    )
    if (errors[id]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [id]: { ...prev[id], [field]: undefined }
      }))
    }
  }

  const handleSaveAll = async () => {
    const { errors: vErrors, isValid } = validateServices(services)
    setStatus(null);
    
    if (!isValid) {
      setErrors(vErrors);
      setStatus({ type: 'error', msg: "Por favor, corrige los errores en las tarjetas." });
      return
    }

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
      setStatus({ type: 'success', msg: "¡Todas las tarjetas se actualizaron con éxito!" });
      setTimeout(() => {
        closeModal();
        setStatus(null);
      }, 1500);
    } catch {
      setStatus({ type: 'error', msg: "Hubo un fallo en la conexión con el servidor." });
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={openModal}
        className="rounded bg-blue-900 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:bg-blue-800 cursor-pointer w-full"
      >
        <span>🛠️</span> Editar Servicios
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Configurar Servicios">
        <div className="space-y-6">
          
          {/* CARGA INICIAL (ESQUEMA) */}
          {isInitialLoading ? (
            <div className="py-20 flex flex-col items-center justify-center bg-gray-900 rounded border border-gray-800 animate-pulse">
              <LoadingForm />
              <p className="text-gray-500 text-[10px] font-bold mt-4 uppercase tracking-widest">Cargando servicios...</p>
            </div>
          ) : (
            <>
              {status && (
                <div className="mb-4 animate-in fade-in slide-in-from-top-2">
                  <FormMessage type={status.type} message={status.msg} />
                </div>
              )}

              <div className="bg-gray-900 overflow-y-auto pr-2 space-y-6 max-h-[60vh] custom-scrollbar">
                <p className="text-gray-500 text-sm">Modifica los datos de tus tarjetas de servicio:</p>
                
                {services.map((service, index) => {
                  const hasError = !!errors[service.id!];
                  return (
                    <div 
                      key={service.id || index} 
                      className={`p-4 rounded border transition-all ${
                        hasError ? 'bg-red-500/5 border-red-500/40' : 'bg-gray-800 border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-black uppercase tracking-wider ${hasError ? 'text-red-400' : 'text-blue-500'}`}>
                          Tarjeta #{index + 1} {hasError && "• Incompleta"}
                        </span>
                        <span className="text-xl">{service.icon}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Título</label>
                          <input
                            type="text"
                            value={service.title}
                            placeholder="Título"
                            onChange={(e) => handleInputChange(service.id!, 'title', e.target.value)}
                            className={`w-full p-2 rounded bg-gray-900 text-white text-sm outline-none border transition-colors ${
                              errors[service.id!]?.title ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Icono (Emoji)</label>
                          <input
                            type="text"
                            value={service.icon}
                            placeholder="Icono (Emoji)"
                            onChange={(e) => handleInputChange(service.id!, 'icon', e.target.value)}
                            className={`w-full p-2 rounded bg-gray-900 text-white text-sm outline-none border transition-colors ${
                              errors[service.id!]?.icon ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Descripción</label>
                          <textarea
                            value={service.description}
                            placeholder="Descripción"
                            rows={2}
                            onChange={(e) => handleInputChange(service.id!, 'description', e.target.value)}
                            className={`w-full p-2 rounded bg-gray-900 text-white text-sm outline-none border transition-colors ${
                              errors[service.id!]?.description ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="flex gap-3 mt-6 border-t border-gray-800 pt-4">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded cursor-pointer text-gray-400 hover:bg-gray-800 transition font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveAll}
                  disabled={loading}
                  className="flex-[2] px-4 py-3 bg-blue-600 text-white rounded cursor-pointer font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 min-h-[52px]"
                >
                  {loading ? <LoadingForm /> : "Guardar Todo"}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}