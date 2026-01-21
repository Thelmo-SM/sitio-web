// src/features/admin/utils/services.validator.ts
import { Service } from "@/types/content";

// Definimos la forma de los errores para UN solo servicio
export type SingleServiceError = Partial<Record<keyof Service, string>>;

// Definimos el diccionario de errores (ID del servicio -> Errores de ese servicio)
export interface ServiceErrors {
  [serviceId: string]: SingleServiceError;
}

export const validateServices = (services: Service[]) => {
  const allErrors: ServiceErrors = {};

  services.forEach((s) => {
    // En lugar de 'any', usamos nuestro tipo definido
    const serviceErrors: SingleServiceError = {};

    if (!s.title?.trim()) serviceErrors.title = "Título requerido";
    if (!s.description?.trim()) serviceErrors.description = "Descripción requerida";
    if (!s.icon?.trim()) serviceErrors.icon = "Icono requerido";

    // Si el objeto de errores tiene alguna llave, lo guardamos usando su ID
    if (Object.keys(serviceErrors).length > 0 && s.id) {
      allErrors[s.id] = serviceErrors;
    }
  });

  return {
    errors: allErrors,
    isValid: Object.keys(allErrors).length === 0,
  };
};