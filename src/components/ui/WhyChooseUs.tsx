'use client' // Importante para usar hooks

import { useEffect, useState } from "react";
import SectionDivider from "./SectionDivider";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { getWhyChooseUs } from "@/services/content.service";
import { WhyChooseUs as WhyChooseUsType } from "@/types/content"; // Importamos el tipo

export const WhyChooseUs = () => {
  // 1. Estado para almacenar los datos de Firebase
  const [reasons, setReasons] = useState<WhyChooseUsType[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Carga de datos al montar el componente
  useEffect(() => {
    const loadReasons = async () => {
      const data = await getWhyChooseUs();
      setReasons(data);
      setLoading(false);
    };
    loadReasons();
  }, []);

  // Si está cargando, podemos retornar null o un esqueleto simple
  if (loading && reasons.length === 0) return null;

  return (
    <section className="bg-gray-900 pb-20 scroll-mt-20" id="nosotros">
      <h2 className="text-center text-gray-400 pt-10 text-2xl md:text-4xl font-bold">
        ¿Por qué elegirnos?
      </h2>

      <div className="w-[85%] mx-auto ">
        <SectionDivider />
        <p className="text-center text-gray-500 my-5 pb-4 text-base md:text-lg">
          Confianza, experiencia y atención de calidad
        </p>

        <AnimateOnScroll animation="fade-left">
          {/* Grid */}
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="bg-gray-600/30 backdrop-blur rounded p-6 text-gray-900 shadow-lg transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-gray-400 mb-2 text-lg font-semibold">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default WhyChooseUs;