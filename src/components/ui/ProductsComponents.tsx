import  PhoneCard  from "./PhonesCard";
import { arraysPhones } from "@/utils/arraysPhones";

export const ProductsComponents = () => {
    return (
        <section className="bg-white/90 backdrop-blur pb-20 border-8">
            <h2 className="text-4xl font-bold  text-center text-gray-700 py-6">Nuestros Productos</h2>

        <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-10">
          Celulares Disponibles
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {arraysPhones.map((phone) => (
            <PhoneCard 
    key={phone.id} 
    phone={{ ...phone, id: String(phone.id) } as any} 
  />
          ))}
        </div>
      </div>
        </section>
    )
}

export default ProductsComponents;