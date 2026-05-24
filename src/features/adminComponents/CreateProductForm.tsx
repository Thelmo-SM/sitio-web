'use client';
import { useState, useEffect } from 'react';
import { createProduct } from '@/services/products.service';
import { updateProduct } from '@/services/updateContent';
import { Product, ProductStatus, ProductType } from '@/types/content'; 
import LoadingForm from '@/components/ui/loaders/LoadingForm';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import { validateProductForm } from '@/utils/productValidation';
import { uploadImage } from '@/lib/cloudinary';
import Image from 'next/image';

interface CreateProductFormProps {
  initialData?: Product | null;
  onSuccess?: () => void;
}

interface FieldProps {
  label: string
  placeholder: string
  value: string | number | undefined
  onChange: (v: string) => void
  type?: "text" | "number" | "url"
}

interface CreateProductResponse {
  success: boolean;
  id?: string;
  error?: string;
}

export default function CreateProductForm({ initialData, onSuccess }: CreateProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const categories: { label: string, value: ProductType }[] = [
    { label: '📱 Teléfono', value: 'phone' },
    { label: '🔌 Accesorio', value: 'accessory' }
  ]

const [formData, setFormData] = useState<Omit<Product, 'id'>>({
  type: 'phone', 
  status: 'available',
  brand: '',
  model: '',
  price: 0,
  storage: '',
  condition: 'Nuevo',
  image: '',
  images: [],
  battery: '',
  camera: '',
  screen: '',
  color: '',        // <--- Agregado
  description: '',  // <--- Agregado
  createdAt: Date.now(),
})
useEffect(() => {
  if (initialData) {
    setFormData({
      ...initialData, // Esto copia todo lo existente
      status: initialData.status || 'available',
      storage: initialData.storage || '',
      condition: initialData.condition || 'Nuevo',
      image: initialData.image || '',
      images: initialData.images || [],
      battery: initialData.battery || '',
      camera: initialData.camera || '',
      screen: initialData.screen || '',
      color: initialData.color || '',              // <--- Agregado
      description: initialData.description || '',  // <--- Agregado
      createdAt: initialData.createdAt || Date.now()
    });
  }
}, [initialData]);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (formData.images && formData.images.length >= 3) {
      setError("Máximo 3 imágenes permitidas");
      return;
    }

    setUploading(true);
    setError(null);
    
    try {
      const url = await uploadImage(file);
      if (url) {
        setFormData(prev => {
          const newImages = [...(prev.images || []), url];
          return { 
            ...prev, 
            image: prev.image || url, // La primera subida es la principal
            images: newImages 
          };
        });
      }
    } catch {
      setError("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = prev.images?.filter((_, i) => i !== index) || [];
      return {
        ...prev,
        images: newImages,
        image: newImages.length > 0 ? newImages[0] : '' // Si borras la principal, la siguiente toma el mando
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateProductForm(formData);
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      let ok = false;
      if (initialData?.id) {
        ok = await updateProduct(initialData.id, formData);
      } else {
        const result = await createProduct(formData) as CreateProductResponse;
        ok = result.success;
      }

      if (ok) {
        setSuccess(true);
        if (onSuccess) setTimeout(onSuccess, 2000);
      } else {
        setError("Error al guardar en la base de datos.");
      }
    } catch {
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4">
      {!success ? (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded shadow-2xl space-y-8">
          <header>
            <h2 className="text-3xl font-black text-white uppercase italic">
              {initialData ? 'Editar' : 'Nuevo'} <span className="text-blue-500">Producto</span>
            </h2>
          </header>
          {/* Selector de Status */}
<div className="flex flex-col gap-2 mb-4 w-full md:w-64">
  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Disponibilidad</label>
  <select 
    value={formData.status}
    onChange={(e) => setFormData({...formData, status: e.target.value as ProductStatus})}
    className="bg-slate-950 border border-slate-800 p-3 rounded text-white text-xs font-bold outline-none focus:border-blue-500/50 transition-all cursor-pointer"
  >
    <option value="available">✅ DISPONIBLE</option>
    <option value="out_of_stock">❌ AGOTADO</option>
    <option value="coming_soon">⏳ PRÓXIMAMENTE</option>
  </select>
</div>

{/* Categorías */}
          <div className="flex gap-3 bg-slate-800/20 p-2 rounded w-fit border border-slate-700/50">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setFormData({ ...formData, type: cat.value })}
                className={`px-6 py-3 rounded text-xs font-black uppercase tracking-widest transition-all ${
                  formData.type === cat.value ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Campos Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Marca" placeholder="Ej: Apple" value={formData.brand} onChange={(v) => setFormData({...formData, brand: v})} />
            <Field label="Modelo" placeholder="Ej: iPhone 15 Pro" value={formData.model} onChange={(v) => setFormData({...formData, model: v})} />
            <Field label="Precio (USD)" type="number" placeholder="0.00" value={formData.price} onChange={(v) => setFormData({...formData, price: Number(v)})} />
              {formData.type === 'phone' && (
             <Field 
              label="Almacenamiento"
              placeholder="Ej: 128GB, 256GB..."
              value={formData.storage} 
              onChange={(v) => setFormData({...formData, storage: v})} 
              />
              )}
          </div>

          {/* Especificaciones Detalladas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-800 pt-6">
            {formData.type === 'phone' && (
              <>
                <Field label="Batería" placeholder="Ej: 95% o Nueva" value={formData.battery} onChange={(v) => setFormData({...formData, battery: v})} />
                <Field label="Cámara" placeholder="Ej: Triple 48MP" value={formData.camera} onChange={(v) => setFormData({...formData, camera: v})} />
                <Field label="Pantalla" placeholder="Ej: 6.1 pulgadas" value={formData.screen} onChange={(v) => setFormData({...formData, screen: v})} />
              </>
            )}
            <Field label="Color" placeholder="Ej: Titanium, Negro" value={formData.color} onChange={(v) => setFormData({...formData, color: v})} />
            <Field label="Condición" placeholder="Ej: Nuevo, Open Box" value={formData.condition} onChange={(v) => setFormData({...formData, condition: v})} />
          </div>
          
          {/* Descripción */}
          <div className="space-y-2 border-t border-slate-800 pt-6">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Descripción corta</label>
            <textarea 
              placeholder="Detalles adicionales (ej: incluye mica de regalo, estado 10/10)"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-950/50 border border-slate-800 p-4 rounded text-white outline-none focus:border-blue-500/50 transition-all font-medium min-h-[100px] resize-none"
            />
          </div>

          {/* Galería de Imágenes */}
          <div className="space-y-4 border-t border-slate-800 pt-6">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
              Galería de Fotos ({formData.images?.length || 0}/3)
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              {formData.images?.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-slate-950 rounded border border-slate-800 group overflow-hidden">
                  <Image src={img} fill className="object-cover" alt={`Preview ${idx}`} />
                  
                  <button 
                    type="button" 
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>

                  {idx === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-blue-600 text-[8px] font-bold text-white text-center py-1 uppercase tracking-widest">
                      Principal
                    </span>
                  )}
                </div>
              ))}

              {(formData.images?.length || 0) < 3 && (
                <label className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploading ? (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-2xl text-slate-600">+</span>
                      <span className="text-[9px] font-bold text-slate-500 mt-2">SUBIR</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
            <button 
              disabled={loading || uploading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded shadow-xl transition-all disabled:opacity-50 uppercase tracking-widest cursor-pointer"
            >
              {loading ? <LoadingForm /> : (initialData ? "GUARDAR CAMBIOS" : "REGISTRAR PRODUCTO")}
            </button>
          </div>
        </form>
      ) : (
        <SuccessMessage 
          title={initialData ? "¡ACTUALIZADO!" : "¡REGISTRADO!"}
          message={`${formData.brand} se guardó correctamente.`}
          onReset={() => { setSuccess(false); if(onSuccess) onSuccess(); }}
          buttonText="CONTINUAR"
        />
      )}
    </div>
  )
}

function Field({ label, placeholder, value, onChange, type = "text" }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type} placeholder={placeholder} value={value ?? ''} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950/50 border border-slate-800 p-4 rounded text-white outline-none focus:border-blue-500/50 transition-all font-medium"
      />
    </div>
  )
}