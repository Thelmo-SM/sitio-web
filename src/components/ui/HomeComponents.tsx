import Image from 'next/image'
import portadaP from '../../../public/contenido_interno/portadaPNG.png'
import { AnimateOnScroll } from './AnimateOnScroll'

export default function HomeComponents() {
  return (
    <section className="relative h-[80vh] overflow-hidden bg-gray-800">
      {/* Imagen de fondo */}
      <Image
        src={portadaP}
        alt="Portada tienda de celulares"
        fill
        priority
        className="object-cover animate-fade-in"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <AnimateOnScroll animation="blur">
          <div className="w-full max-w-5xl text-center">
            {/* Título */}
            <h1
              className="
                mb-4
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                font-bold
                text-gray-100
                leading-tight
              "
            >
              Reparación y Venta de Celulares
            </h1>

            {/* Descripción */}
            <p
              className="
                mx-auto
                max-w-xl
                text-sm sm:text-base md:text-lg
                text-gray-200
              "
            >
              Accesorios, reparaciones profesionales y los mejores precios en tu zona
            </p>

            {/* Botones */}
            <div
              className="
                mt-8
                flex flex-col sm:flex-row
                items-center justify-center
                gap-4
              "
            >
              <a
                href="tel:+18090000000"
                className="
                  w-full sm:w-auto
                  rounded
                  bg-blue-900
                  px-8 py-4
                  text-sm sm:text-base
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-blue-800
                  hover:scale-105
                "
              >
                📞 Llama ahora
              </a>

              <a
                href="https://wa.me/18090000000"
                target="_blank"
                className="
                  w-full sm:w-auto
                  rounded
                  bg-white/10
                  px-8 py-4
                  text-sm sm:text-base
                  font-semibold
                  text-white
                  backdrop-blur
                  transition
                  hover:bg-green-800
                  hover:text-gray-100
                  hover:scale-105
                "
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
