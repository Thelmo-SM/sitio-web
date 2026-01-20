'use client'

import { useEffect, useState } from 'react'
import { ServiceCard } from './ServicesCards'
import SectionDivider from './SectionDivider'
import { useInView } from '@/hooks/useInView'
import { getServices } from '@/services/content.service'
import { Service } from '@/types/content' // Importamos el tipo

export const ServicesComponents = () => {
  // 1. Estado para almacenar los servicios de Firebase
  const [homeServices, setHomeServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  // 2. Hook para la animación
  const { ref, isVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  // 3. Cargar los datos al montar el componente
  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices()
      setHomeServices(data)
      setLoading(false)
    }
    fetchServices()
  }, [])

  if (loading) return null // O un esqueleto de carga (skeleton)

  return (
    <section className="bg-gray-900 backdrop-blur pb-20 scroll-mt-20" id='servicios'>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center text-gray-400 pt-10 text-2xl md:text-4xl font-bold">
          Servicios
        </h1>
        <SectionDivider />
      </div>

      <div
        ref={ref}
        className={`
          grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4
          w-[85%] mx-auto
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        `}
      >
        {/* 4. Mapeamos los datos que vienen de Firebase */}
        {homeServices.map((service, index) => (
          <div
            key={service.id}
            style={{ transitionDelay: `${index * 100}ms` }}
            className={`
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesComponents