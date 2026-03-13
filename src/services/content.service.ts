import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { HomeContent, Product, Service, WhyChooseUs } from "@/types/content"
import { unstable_noStore as noStore } from "next/cache"

export const getHomeContent = async (): Promise<HomeContent | null> => {
  try {
    noStore()

    const ref = doc(db, "content", "home")
    const snap = await getDoc(ref)

    if (!snap.exists()) return null

    return snap.data() as HomeContent
  } catch (error) {
    console.error("Error getting home content:", error)
    return null
  }
}

export const getServices = async (): Promise<Service[]> => {
  try {
    const colRef = collection(db, "services")
    const snapshot = await getDocs(colRef)
    
    // Transformamos cada documento de Firebase en un objeto de tipo Service
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Service[]
  } catch (error) {
    console.error("Error al obtener servicios:", error)
    return []
  }
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const colRef = collection(db, "products")
    const snapshot = await getDocs(colRef)
    
    return snapshot.docs.map(doc => {
      const data = doc.data()
      
      return {
        id: doc.id,
        // CAMPOS BASE
        type: data.type,
        brand: data.brand,
        model: data.model,
        price: Number(data.price),
        image: data.image,
        status: data.status || 'available',

        // CAMPOS DE IMAGENES (El array que te faltaba)
        images: Array.isArray(data.images) ? data.images : [],

        // ESPECIFICACIONES (Mapeo exacto a tus minúsculas de Firebase)
        storage: data.storage || undefined,
        condition: data.condition || undefined,
        battery: data.battery || undefined, // ¡Importante para el undefined%!
        color: data.color || undefined,
        camera: data.camera || undefined,
        screen: data.screen || undefined,
        description: data.description || undefined,
        
        createdAt: data.createdAt
      } as Product
    })
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}

export const getWhyChooseUs = async (): Promise<WhyChooseUs[]> => {
  try {
    const colRef = collection(db, "whyChooseUs")
    const snapshot = await getDocs(colRef)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WhyChooseUs[]
  } catch (error) {
    console.error("Error al obtener WhyChooseUs:", error)
    return []
  }
}
