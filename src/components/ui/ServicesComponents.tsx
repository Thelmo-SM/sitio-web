'use client'

import { ServiceCard } from './ServicesCards'
import { arraysServices } from '@/utils/arraysServices'
import SectionDivider from './SectionDivider'
import { useInView } from '@/hooks/useInView'

export const ServicesComponents = () => {
  const { ref, isVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section className="bg-gray-900 backdrop-blur pb-20">
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
        {arraysServices.map((service, index) => (
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
