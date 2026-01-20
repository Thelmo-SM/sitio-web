'use client';
import { useState, useEffect } from 'react'; // 1. Agregamos useEffect
import { createProduct } from '@/services/products.service';
import { updateProduct } from '@/services/updateContent';
import { Product, ProductType } from '@/types/content'; 
import LoadingForm from '@/components/ui/loaders/LoadingForm';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import { validateProductForm } from '@/utils/productValidation';
import { uploadImage } from '@/lib/cloudinary';
import Image from 'next/image';

// Definimos props para recibir el producto a editar
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

interface FirebaseResponse {
  success: boolean;
  id?: string;
  error?: {
    message?: string;
    code?: string;
  } | string;
}

// 3. Pasamos las props al componente
export default function CreateProductForm({ initialData, onSuccess }: CreateProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const categories: { label: string, value: ProductType }[] = [
    { label: '📱 Teléfono', value: 'phone' },
    { label: '🔌 Accesorio', value: 'accessory' }
  ]

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    type: 'phone', 
    brand: '',
    model: '',
    price: 0,
    storage: '',
    condition: 'Nuevo',
    image: ''
  })

  // 4. EFECTO PARA EDITAR: Si recibimos initialData, cargamos el form
  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type,
        brand: initialData.brand,
        model: initialData.model,
        price: initialData.price,
        storage: initialData.storage || '',
        condition: initialData.condition || 'Nuevo',
        image: initialData.image || ''
      });
    }
  }, [initialData]);

  const extraFieldsConfig: Record<ProductType, { label: string, key: keyof Omit<Product, 'id'>, placeholder: string }[]> = {
    'phone': [
      { label: 'Almacenamiento', key: 'storage', placeholder: 'Ej: 128GB, 256GB' },
      { label: 'Condición', key: 'condition', placeholder: 'Nuevo / Usado' }
    ],
    'accessory': [
      { label: 'Detalles/Color', key: 'storage', placeholder: 'Ej: Color Negro, Carga rápida' }
    ]
  }

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateProductForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let isOperationSuccessful = false;

      // 5. LÓGICA DUAL
      if (initialData?.id) {
        // updateProduct devuelve boolean directamente
        const ok = await updateProduct(initialData.id, formData);
        isOperationSuccessful = ok; 
      } else {
        // createProduct devuelve un objeto { success: boolean, ... }
        const result = await createProduct(formData) as FirebaseResponse;
        isOperationSuccessful = result.success;
      }

      if (isOperationSuccessful) {
        setSuccess(true);
        
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
        
        // Solo reseteamos si es un producto nuevo
        if (!initialData) {
          setFormData({ 
            type: 'phone', 
            brand: '', 
            model: '', 
            price: 0, 
            storage: '', 
            condition: 'Nuevo', 
            image: '' 
          });
        }
      } else {
        setError("Error en la operación de base de datos. Inténtalo de nuevo.");
      }
    } catch (err: unknown) {
      console.error("Error crítico:", err);
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado de red");
    } finally {
      setLoading(false);
    }
  };


  // Cloudinary
const [uploading, setUploading] = useState(false);

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validación: No más de 5MB
  if (file.size > 5 * 1024 * 1024) {
    setError("La imagen es muy pesada (Máximo 5MB)");
    return;
  }

  // Validación: Solo imágenes
  if (!file.type.startsWith('image/')) {
    setError("El archivo debe ser una imagen");
    return;
  }

  setUploading(true);
  setError(null); // Limpiamos errores previos
  
  try {
    const url = await uploadImage(file);
    if (url) {
      setFormData(prev => ({ ...prev, image: url }));
    }
  } catch  {
    setError("Error al conectar con el servidor de imágenes");
  } finally {
    setUploading(false);
  }
};

// 2. Función para quitar la imagen seleccionada
const removeImage = () => {
  setFormData(prev => ({ ...prev, image: '' }));
};



  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 min-h-[37.5em] flex flex-col justify-center">
      {!success ? (
        <form 
          onSubmit={handleSubmit} 
          className="bg-slate-900 border border-slate-800 p-8 rounded shadow-2xl transition-all animate-in fade-in duration-500"
        >
          <header className="mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
              {/* 6. Título dinámico */}
              {initialData ? 'Editar' : 'Nuevo'} <span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">Producto</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest">
              {initialData ? 'Actualizar Datos' : 'Gestión de Inventario'}
            </p>
          </header>

          <div className="space-y-8">
            <div className="flex gap-3 bg-slate-800/20 p-2 rounded w-fit border border-slate-700/50">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: cat.value })}
                  className={`px-6 py-3 rounded text-xs font-black uppercase tracking-widest transition-all ${
                    formData.type === cat.value 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Marca" placeholder="Ej: Apple" value={formData.brand} 
                     onChange={(v) => setFormData({...formData, brand: v})} />
              
              <Field label="Modelo" placeholder="Ej: iPhone 15 Pro" value={formData.model} 
                     onChange={(v) => setFormData({...formData, model: v})} />
              
              <Field label="Precio (USD)" type="number" placeholder="0.00" value={formData.price} 
                     onChange={(v) => setFormData({...formData, price: Number(v)})} />

              {extraFieldsConfig[formData.type].map((field) => (
                <Field 
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof typeof formData] as string | number} 
                  onChange={(v) => setFormData({...formData, [field.key]: v})}
                />
              ))}

<div className="space-y-4">
  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
    Imagen del Producto
  </p>

  {!formData.image ? (
    // Mostrar botón de subida si NO hay imagen
    <label className={`flex items-center justify-center gap-3 w-full py-4 rounded border-2 border-dashed transition-all cursor-pointer
      ${uploading 
        ? 'bg-slate-800/50 border-slate-700 pointer-events-none' 
        : 'bg-slate-950 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900'}`}
    >
      {uploading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase">Subiendo...</span>
        </div>
      ) : (
        <>
          <span className="text-lg">📷</span>
          <span className="text-[10px] font-black text-slate-400 uppercase">Click para subir foto</span>
        </>
      )}
      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
    </label>
  ) : (
<div className="relative group animate-in fade-in zoom-in duration-300">
  <div className="p-3 bg-slate-950 rounded border border-slate-800 flex items-center gap-4">
    <div className="relative w-16 h-16 shrink-0 group">
      <Image 
        src={formData.image} 
        alt="Preview" 
        fill 
        className="object-cover rounded border border-slate-800 shadow-2xl group-hover:opacity-40 transition-opacity"
      />
      {/* Botón flotante para cambiar rápido img */}
      <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
        <span className="text-[10px] font-bold text-white bg-blue-600/80 px-2 py-1 rounded">CAMBIAR</span>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      </label>
    </div>
    
    <div className="flex-1 overflow-hidden">
      <p className="text-[9px] text-blue-500 font-black uppercase italic">
        {uploading ? "Subiendo nueva..." : "Imagen cargada"}
      </p>
      <p className="text-[8px] text-slate-500 truncate italic">{formData.image}</p>
    </div>

    <button 
      type="button"
      onClick={removeImage}
      className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-full transition-colors"
      title="Eliminar imagen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
    </button>
  </div>
</div>
  )}
</div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800/50">
              <ErrorMessage message={error} onDismiss={() => setError(null)} />
              <button 
                disabled={loading}
                className="w-full py-5 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-black rounded shadow-xl transition-all disabled:opacity-50 flex items-center justify-center uppercase tracking-widest"
              >
                {/* 7. Texto dinámico del botón */}
                {loading ? <LoadingForm /> : (initialData ? "GUARDAR CAMBIOS" : "REGISTRAR PRODUCTO")}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <SuccessMessage 
          title={initialData ? "¡ACTUALIZADO!" : "¡REGISTRADO!"}
          message={`${formData.brand} se guardó correctamente.`}
          onReset={() => {
            setSuccess(false);
            if(onSuccess) onSuccess();
          }}
          buttonText={initialData ? "VOLVER AL INVENTARIO" : "REGISTRAR OTRO PRODUCTO"}
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
        type={type}
        placeholder={placeholder}
        value={value ?? ''} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950/50 border border-slate-800 p-4 rounded text-white placeholder:text-slate-700 outline-none focus:border-blue-500/50 transition-all font-medium"
      />
    </div>
  )
}