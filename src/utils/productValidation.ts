import { Product } from '@/types/content';

export const validateProductForm = (data: Omit<Product, 'id'>): string | null => {
  // --- 1. Validaciones Globales (Para ambos: Teléfono y Accesorio) ---
  if (!data.brand.trim()) return "La marca es obligatoria.";
  if (!data.model.trim()) return "El modelo es obligatorio.";
  if (data.price <= 0) return "El precio debe ser mayor a 0.";
  
  // Validación de Imagen (Cloudinary)
  if (!data.image) return "Debes subir una imagen antes de registrar.";

  // --- 2. Validaciones Específicas por Tipo ---
  
  if (data.type === 'phone') {
    // Para Teléfonos: El almacenamiento es crítico (ej: 128GB)
    if (!data.storage?.trim()) {
      return "Indica el almacenamiento del teléfono (ej: 128GB).";
    }
    // La condición suele ser importante en teléfonos (Nuevo/Usado)
    if (!data.condition?.trim()) {
      return "Indica si el teléfono es Nuevo o Usado.";
    }
  }

  if (data.type === 'accessory') {
    // Para Accesorios: El campo 'storage' lo usamos para "Detalles/Color"
    if (!data.storage?.trim()) {
      return "Indica los detalles o color del accesorio.";
    }
  }

  return null; // Si llega aquí, todo está perfecto
};