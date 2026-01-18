'use client';
import { useState, useEffect } from 'react'; // 1. Agregamos useEffect
import { createProduct } from '@/services/products.service';
import { updateProduct } from '@/services/updateContent';
import { Product, ProductType } from '@/types/content'; 
import LoadingForm from '@/components/ui/loaders/LoadingForm';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import { validateProductForm } from '@/utils/productValidation';

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

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 min-h-[600px] flex flex-col justify-center">
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

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Imagen del Producto
                </label>
                <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 bg-slate-950/30 hover:border-blue-500/50 transition-colors">
                  {formData.image ? (
                    <div className="relative group w-full max-h-48 overflow-hidden rounded-lg">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                      >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-6">
                       <p className="text-slate-600 text-xs font-bold uppercase italic tracking-tighter">Esperando Imagen</p>
                       <input 
                         type="url" 
                         placeholder="Pega el link de Cloudinary"
                         value={formData.image}
                         onChange={(e) => setFormData({...formData, image: e.target.value})}
                         className="mt-4 w-full bg-transparent text-center text-[10px] text-slate-500 outline-none"
                       />
                    </div>
                  )}
                </div>
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