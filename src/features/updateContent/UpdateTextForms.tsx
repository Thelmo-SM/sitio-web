'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Modal } from "@/components/ui/modals/Modal"
import { useModal } from "@/hooks/useModalForm"
import { UpdateServicesModal } from "./UpdateServicesForm"
import { UpdateWhyChooseUsModal } from "./UpdateWhyChooseUsModal"
import { updateHomeContent } from "@/services/updateContent" 
import { getHomeContent } from "@/services/content.service"
import { HomeContent } from "@/types/content"
import { validateHeroForm } from "@/utils/heroValidator"
import { FormMessage } from "@/components/ui/FormMessage"
import LoadingForm from "@/components/ui/loaders/LoadingForm" 
import { uploadImage as uploadToCloudinary } from "../updateContent/cloudinaryService"

export default function UpdateTextForms() {
  const { isOpen, openModal, closeModal } = useModal()
  const [homeData, setHomeData] = useState<HomeContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsInitialLoading(true)
      getHomeContent().then((data) => {
        setHomeData(data)
        setTimeout(() => setIsInitialLoading(false), 400)
      })
    }
  }, [isOpen])

  const handleSaveHero = async (newData: HomeContent) => {
    setLoading(true)
    const success = await updateHomeContent(newData)
    if (success) {
      setHomeData(newData)
      setTimeout(() => closeModal(), 1500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-slate-200 py-25 px-4">
      <div className="container mx-auto max-w-5xl space-y-12">
        <header className="relative pb-8 border-b border-slate-800">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-blue-600 rounded" />
          <h1 className="text-4xl font-black text-white tracking-tight">
            Actualizar <span className="text-blue-500">Contenido</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Gestiona el contenido visual y de contacto de tu tienda.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/40 border border-slate-800 p-6 rounded hover:border-blue-500/50 transition-all group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 bg-blue-500/10 rounded flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🏠</div>
              <h3 className="text-xl font-bold text-white mb-2">Inicio / Hero</h3>
              <p className="text-slate-400 text-sm mb-6">Modifica títulos, banners y contactos principales.</p>
            </div>
            <button onClick={openModal} className="w-full py-4 px-8 bg-blue-900 hover:bg-blue-800 text-white rounded font-bold text-sm transition-all shadow-lg shadow-blue-900/20 cursor-pointer text-center">
              🏠 Editar Portada
            </button>
          </div>
          <div className="bg-gray-800/40 border border-slate-800 p-6 rounded hover:border-purple-500/50 transition-all group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🛠️</div>
              <h3 className="text-xl font-bold text-white mb-2">Servicios</h3>
              <p className="text-slate-400 text-sm mb-6">Actualiza las tarjetas de reparación y soporte técnico.</p>
            </div>
            <UpdateServicesModal /> 
          </div>
          <div className="bg-gray-800/40 border border-slate-800 p-6 rounded hover:border-green-500/50 transition-all group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 bg-green-500/10 rounded flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Confianza</h3>
              <p className="text-slate-400 text-sm mb-6">Gestiona por qué los clientes eligen tu tienda.</p>
            </div>
            <UpdateWhyChooseUsModal />
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} title="Editar Contenido de Inicio">
          {isInitialLoading ? (
            <div className="py-20 bg-gray-900 flex flex-col items-center justify-center rounded border border-slate-800 animate-pulse">
               <LoadingForm />
               <p className="text-slate-500 text-[10px] font-bold uppercase mt-4 tracking-widest">Sincronizando Datos...</p>
            </div>
          ) : homeData && (
            <HeroForm 
              initialData={homeData} 
              onSave={handleSaveHero} 
              onClose={closeModal}
              isLoading={loading} 
            />
          )}
        </Modal>
      </div>
    </div>
  )
}

/* --- COMPONENTE INTERNO: HERO FORM --- */
interface HeroFormProps {
  initialData: HomeContent;
  onSave: (data: HomeContent) => void;
  onClose: () => void;
  isLoading: boolean;
}

function HeroForm({ initialData, onSave, onClose, isLoading: parentLoading }: HeroFormProps) {
  const [formData, setFormData] = useState<HomeContent>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof HomeContent, string>>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.heroImage);
  const [isCloudinaryLoading, setIsCloudinaryLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      
      // 1. Actualizamos el archivo físico para Cloudinary
      setImageFile(file);
      
      // 2. Actualizamos la vista previa visual
      setPreviewUrl(localUrl);
      
      // 3. ¡IMPORTANTE! Actualizamos el formData para que el validador lo vea
      setFormData(prev => ({ ...prev, heroImage: localUrl }));
      
      // 4. Limpiamos el error visualmente si existía
      if (errors.heroImage) {
        setErrors(prev => ({ ...prev, heroImage: undefined }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof HomeContent]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    
    const { errors: validationErrors, isValid } = validateHeroForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      setStatus({ type: 'error', msg: "Por favor, revisa los campos marcados en rojo." });
      return;
    }

    try {
      setIsCloudinaryLoading(true);
      const finalData = { ...formData };

      if (imageFile) {
        const uploadedUrl = await uploadToCloudinary(imageFile);
        if (uploadedUrl) {
          finalData.heroImage = uploadedUrl;
        } else {
          throw new Error("Error al subir a Cloudinary");
        }
      }

      await onSave(finalData);
      setStatus({ type: 'success', msg: "¡Cambios guardados correctamente!" });
      
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      setStatus({ type: 'error', msg: "Hubo un fallo al procesar la solicitud." });
    } finally {
      setIsCloudinaryLoading(false);
    }
  };

  const isAnyLoading = parentLoading || isCloudinaryLoading;

  const inputClass = (fieldName: keyof HomeContent) => `
    w-full bg-slate-900 rounded p-3 text-white outline-none transition-all focus:ring-2 border
    ${errors[fieldName] 
      ? "border-red-500 focus:ring-red-500/20" 
      : "border-slate-700 focus:ring-blue-500/50 focus:border-blue-500"}
  `;

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {status && <FormMessage type={status.type} message={status.msg} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2 space-y-2">
          <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-1">Imagen de Portada</label>
          <div 
            onClick={() => !isAnyLoading && fileInputRef.current?.click()}
            className={`relative h-48 w-full bg-slate-950 rounded border-2 border-dashed border-slate-800 overflow-hidden transition-all flex items-center justify-center group ${isAnyLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-blue-500'}`}
          >
            {previewUrl && (
              <Image 
                src={previewUrl} 
                alt="Vista previa de la portada" 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity" 
                fill
                sizes="(max-width: 768px) 100vw, 800px"
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📸</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-4">
                {imageFile ? "Imagen seleccionada" : "Click para seleccionar imagen"}
              </p>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-1">Título Principal</label>
          <input name="heroTitle" type="text" value={formData.heroTitle} onChange={handleChange} className={inputClass("heroTitle")} />
          {errors.heroTitle && <p className="text-red-500 text-[10px] font-bold px-1">{errors.heroTitle}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-1">Subtítulo</label>
          <input name="heroSubtitle" type="text" value={formData.heroSubtitle} onChange={handleChange} className={inputClass("heroSubtitle")} />
          {errors.heroSubtitle && <p className="text-red-500 text-[10px] font-bold px-1">{errors.heroSubtitle}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-1">WhatsApp</label>
          <input name="whatsapp" type="text" value={formData.whatsapp} onChange={handleChange} className={inputClass("whatsapp")} />
          {errors.whatsapp && <p className="text-red-500 text-[10px] font-bold px-1">{errors.whatsapp}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-1">Teléfono</label>
          <input name="phone" type="text" value={formData.phone} onChange={handleChange} className={inputClass("phone")} />
        </div>
      </div>

      <div className="pt-6 flex gap-3 border-t border-slate-800">
        <button type="button" onClick={onClose} className="flex-1 px-6 py-3 text-slate-400 font-bold rounded hover:bg-slate-800 transition-all cursor-pointer">
          Cancelar
        </button>
        <button type="submit" disabled={isAnyLoading} className="flex-[2] px-10 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer min-h-[52px]">
          {isAnyLoading ? <LoadingForm /> : "Guardar Cambios"}
        </button>
      </div>
    </form>
  )
}