import { doc, updateDoc } from "firebase/firestore"; // Funciones nativas de Firebase
import { db } from "@/lib/firebase"; // Tu configuración de Firebase (ajusta la ruta según tu proyecto)
import { HomeContent, Product, Service, WhyChooseUs } from "@/types/content"; // El tipo de dato que definimos antes

/**
 * Actualiza el documento 'home' en la colección 'content'
 * @param newData - Objeto parcial con los campos a actualizar (heroTitle, heroSubtitle, etc.)
 * @returns boolean - true si tuvo éxito, false si hubo error
 */
export const updateHomeContent = async (newData: Partial<HomeContent>): Promise<boolean> => {
  try {
    // Referencia al documento específico
    const docRef = doc(db, "content", "home");
    
    await updateDoc(docRef, newData);
    
    return true;
  } catch (error) {
    console.error("Error al actualizar Home:", error);
    return false;
  }
};

export const updateServiceContent = async (id: string, newData: Partial<Service>): Promise<boolean> => {
  try {
    // Referencia al documento específico dentro de la colección 'services'
    const docRef = doc(db, "services", id);
    
    await updateDoc(docRef, newData);
    
    console.log(`Servicio ${id} actualizado con éxito`);
    return true;
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    return false;
  }
};

export const updateWhyChooseUs = async (id: string, newData: Partial<WhyChooseUs>): Promise<boolean> => {
  try {
    // Referencia al documento por su ID
    const docRef = doc(db, "whyChooseUs", id);
    
    // Aplicar los cambios
    await updateDoc(docRef, newData);
    
    return true;
  } catch (error) {
    console.error("Error al actualizar WhyChooseUs:", error);
    return false;
  }
};

export const updateProduct = async (id: string, newData: Partial<Product>): Promise<boolean> => {
  try {
    // Referencia al producto por su ID
    const docRef = doc(db, "products", id);
    
    // Actualizamos el documento
    await updateDoc(docRef, newData);
    
    console.log(`Producto ${id} actualizado`);
    return true;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return false;
  }
};