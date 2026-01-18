import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
// Importas tu tipo Product
import { Product } from "@/types/content"; 

export const createProduct = async (productData: Omit<Product, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error al crear producto:", error);
    return { success: false, error };
  }
};