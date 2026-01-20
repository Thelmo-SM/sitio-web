import SectionDivider from "./SectionDivider";
import { AnimateOnScroll } from "./AnimateOnScroll";

export const LocationComponent = () => {
  return (
    <section className="bg-gray-900 pb-20 scroll-mt-20" id="direccion">
      {/* Título */}
      <AnimateOnScroll animation="fade-left">
        <h2 className="text-center text-gray-400 pt-10 text-2xl md:text-4xl font-bold">
          Visítanos
        </h2>
      </AnimateOnScroll>

      <SectionDivider />

      <div className="py-16">
        <AnimateOnScroll animation="fade-left">
          {/* 🔒 MISMO ANCHO QUE LAS DEMÁS SECCIONES */}
          <div
            className="
              w-[85%] mx-auto
              flex flex-col lg:flex-row
              gap-8
            "
          >
            {/* Información */}
            <div
              className="
                w-full lg:w-[30%]
                bg-gray-600/30 backdrop-blur
                p-4 rounded
              "
            >
              <h4 className="text-xl font-semibold mb-4 text-gray-400">
                📍 Dirección
              </h4>

              <p className="text-gray-500 mb-6 text-xs md:text-sm">
                Av. Principal #123, Colonia Centro <br />
                Tu Ciudad, Estado 12345
              </p>

              <h4 className="text-xl font-semibold mb-4 text-gray-400">
                ⏰ Horario
              </h4>

              <ul className="text-gray-500 space-y-2 text-xs md:text-sm">
                <li className="flex justify-between">
                  <span>Lunes a Viernes:</span>
                  <span className="text-gray-400 font-bold">
                    9:00 AM - 7:00 PM
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Sábados:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingos:</span>
                  <span>Cerrado</span>
                </li>
              </ul>
            </div>

            {/* Mapa */}
            <div className="w-full lg:flex-1">
              <div
                className="
                  h-96
                  bg-gray-200
                  rounded
                  overflow-hidden
                  shadow-md
                "
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123456.7890123456!2d-99.12345678901234!3d19.123456789012345"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default LocationComponent;
