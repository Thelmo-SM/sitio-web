import { HomeContent } from "@/types/content"; 

export const validateHeroForm = (data: HomeContent) => {
  const newErrors: Partial<Record<keyof HomeContent, string>> = {};

  if (!data.heroTitle.trim()) newErrors.heroTitle = "El título es obligatorio";
  if (!data.heroSubtitle.trim()) newErrors.heroSubtitle = "El subtítulo es obligatorio";
  if (!data.whatsapp.trim()) newErrors.whatsapp = "El WhatsApp es necesario";
  
  if (!data.heroImage.trim()) {
    newErrors.heroImage = "La imagen es obligatoria";
  } else if (
    !data.heroImage.startsWith('http') && 
    !data.heroImage.startsWith('blob:') // <-- ESTA LÍNEA ES LA CLAVE
  ) {
    newErrors.heroImage = "Debe ser una URL válida o un archivo seleccionado";
  }

  return {
    errors: newErrors,
    isValid: Object.keys(newErrors).length === 0
  };
};