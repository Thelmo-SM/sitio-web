import { Service } from "@/types/arraysServices" 

type ServiceCardProps = Pick<Service, 'title' | 'description' | 'icon'>

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="  bg-gray-600/30 backdrop-blur border-2 h-full
     rounded p-4 text-gray-900 shadow-lg transition-all duration-300
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:-translate-y-2">


      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-400">{title}</h3>
      <p className="text-sm md:text-base text-gray-500">{description}</p>
    </div>
  )
}
