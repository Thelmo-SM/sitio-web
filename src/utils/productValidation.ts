import { Product } from '@/types/content';

export const validateProductForm = (data: Omit<Product, 'id'>): string | null => {
  // --- 1. Validaciones Globales ---
  if (!data.brand.trim()) return "La marca es obligatoria.";
  if (!data.model.trim()) return "El modelo es obligatorio.";
  if (data.price <= 0) return "El precio debe ser un número positivo.";
  
  // Imagen y Galería
  if (!data.image) return "La imagen principal es obligatoria.";
  if (!data.images || data.images.length === 0) {
    return "Debes subir al menos una imagen a la galería.";
  }

  // Color y Condición
  if (!data.color?.trim()) return "El color es obligatorio.";
  if (!data.condition?.trim()) return "Indica si es Nuevo o Usado.";

  // --- 2. Validación de Descripción (NUEVA) ---
  if (!data.description?.trim()) {
    return "La descripción es obligatoria. Detalla qué incluye el producto.";
  }
  if (data.description.length < 10) {
    return "La descripción es muy corta. Da más detalles (mínimo 10 caracteres).";
  }

  // --- 3. Validaciones por Tipo ---
  if (data.type === 'phone') {
    if (!data.storage?.trim()) return "Indica el almacenamiento (ej: 128GB).";
    if (!data.screen?.trim()) return "El tamaño de pantalla es obligatorio.";
    if (!data.battery?.toString().trim()) {
    return "La salud de batería es obligatoria.";
    }
    if (!data.camera?.trim()) return "Las specs de la cámara son obligatorias.";
  }

  // if (data.type === 'accessory') {
  //   if (!data.storage?.trim()) return "Indica el tipo o capacidad del accesorio.";
  // }

  return null; 
};