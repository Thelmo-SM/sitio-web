'use client'

import Image from 'next/image'
import { AnimateOnScroll } from './AnimateOnScroll'
import SectionDivider from './SectionDivider'
import img from '../../../public/contenido_interno/reparacion_celulares_img.jpg';

export default function RepairServices() {
  return (
    <section
      id="reparaciones"
      className="
        bg-gray-900
        backdrop-blur
        pb-24
        pt-20
        scroll-mt-20
        overflow-hidden
      "
    >
      <AnimateOnScroll animation="fade-left">
        <div className="w-[85%] mx-auto">

          {/* HEADER */}
          <div className="text-center">
            <h2
              className="
              text-center text-gray-400 pt-10 text-2xl md:text-4xl font-bold
              "
            >
               Reparación de <span className="text-blue-500"> Celulares </span>
            </h2>

            <p
              className="
                text-gray-500
                max-w-3xl
                mx-auto
                mt-6
                text-sm md:text-base
                leading-relaxed
              "
            >
              Ofrecemos servicios de reparación para diferentes tipos de
              fallas en dispositivos móviles, trabajando con atención
              profesional, diagnósticos precisos y soluciones enfocadas en
              recuperar el funcionamiento de tu equipo.
            </p>
          </div>

          <SectionDivider />

          {/* CONTENIDO */}
          <div
            className="
              mt-16
              grid grid-cols-1 lg:grid-cols-2
              gap-8
              items-stretch
            "
          >
            {/* DOCUMENTO */}
            <div
              className="
                relative
                rounded
                overflow-hidden
                shadow
              "
            >
              {/* BODY */}
              <div className="p-8 md:p-10">

                {/* INTRO */}
                <div className="mb-10">


                  <p
                    className="
                      text-slate-600
                      leading-relaxed
                      text-sm md:text-base
                    "
                  >
                    Nuestro servicio técnico está enfocado en detectar y
                    solucionar fallas comunes y avanzadas en celulares y
                    dispositivos móviles. Cada equipo es revisado
                    cuidadosamente para ofrecer soluciones claras y seguras.
                  </p>
                </div>

                {/* ITEMS */}
                <div className="space-y-7">

                  {/* ITEM */}
                  <div className="border-l-4 border-blue-500 pl-5">
                    <h4
                      className="
                        text-slate-900
                        font-black
                        text-lg
                        mb-2
                      "
                    >
                      Cambio de Pantalla
                    </h4>

                    <p
                      className="
                        text-slate-600
                        text-sm md:text-base
                        leading-relaxed
                      "
                    >
                      Reemplazamos pantallas rotas, táctiles dañados y
                      displays con fallas visuales utilizando componentes de
                      calidad para recuperar la imagen y sensibilidad del
                      equipo.
                    </p>
                  </div>

                  {/* ITEM */}
                  <div className="border-l-4 border-blue-500 pl-5">
                    <h4
                      className="
                        text-slate-900
                        font-black
                        text-lg
                        mb-2
                      "
                    >
                      Cambio de Batería
                    </h4>

                    <p
                      className="
                        text-slate-600
                        text-sm md:text-base
                        leading-relaxed
                      "
                    >
                      Solucionamos problemas relacionados con baterías
                      descargadas, poca duración, sobrecalentamiento o
                      dispositivos que se apagan inesperadamente.
                    </p>
                  </div>

                  {/* ITEM */}
                  <div className="border-l-4 border-blue-500 pl-5">
                    <h4
                      className="
                        text-slate-900
                        font-black
                        text-lg
                        mb-2
                      "
                    >
                      Problemas de Carga
                    </h4>

                    <p
                      className="
                        text-slate-600
                        text-sm md:text-base
                        leading-relaxed
                      "
                    >
                      Diagnosticamos y reparamos fallas relacionadas con el
                      centro de carga, conectores dañados y problemas de
                      carga lenta o intermitente.
                    </p>
                  </div>

                  {/* ITEM */}
                  <div className="border-l-4 border-blue-500 pl-5">
                    <h4
                      className="
                        text-slate-900
                        font-black
                        text-lg
                        mb-2
                      "
                    >
                      Reparación de Software
                    </h4>

                    <p
                      className="
                        text-slate-600
                        text-sm md:text-base
                        leading-relaxed
                      "
                    >
                      Corregimos errores del sistema, bloqueos,
                      actualizaciones fallidas y optimización general del
                      dispositivo para mejorar su rendimiento.
                    </p>
                  </div>
                </div>

                {/* FOOTER BOX */}
                <div
                  className="
                    mt-10
                    bg-gray-600/30
                    border border-blue-500/20
                    rounded
                    p-6
                  "
                >
                  <h4
                    className="
                      text-gray-400
                      font-black
                      mb-3
                    "
                  >
                    Transparencia y confianza
                  </h4>

                  <p
                    className="
                      text-gray-400
                      leading-relaxed
                      text-sm md:text-base
                    "
                  >
                    Antes de realizar cualquier reparación, revisamos el
                    estado del equipo para identificar correctamente la falla
                    y explicar el proceso de trabajo de forma clara y
                    profesional.
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative">

              <div
                className="
                relative
                h-full
                min-h-[500px]
                rounded
                overflow-hidden
                shadow-2xl
                "
              >
                <Image
                  src={img}
                  alt="Servicio técnico"
                  fill
                  priority
                  className="object-cover"
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-gray-900
                    via-gray-900/20
                    to-transparent
                  "
                />

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 p-8 md:p-10">

                  <span
                    className="
                      inline-block
                      px-4 py-2
                      rounded-full
                      border border-blue-400/20
                      bg-blue-500
                      text-blue-300
                      text-[10px]
                      md:text-xs
                      font-black
                      uppercase
                      tracking-[0.25em]
                    "
                  >
                    Diagnóstico Profesional
                  </span>

                  <h3
                    className="
                      text-white
                      text-3xl md:text-5xl
                      font-black
                      uppercase
                      mt-5
                      leading-tight
                    "
                  >
                    Soluciones
                    <span className="block text-blue-500">
                      profesionales
                    </span>
                  </h3>

                  <p
                    className="
                      text-gray-300
                      mt-5
                      text-sm md:text-base
                      leading-relaxed
                      max-w-md
                    "
                  >
                    Trabajamos con atención técnica, revisión detallada y
                    soluciones enfocadas en recuperar el funcionamiento de tu
                    dispositivo de forma segura y profesional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}