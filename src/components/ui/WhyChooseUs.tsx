import { arraysReason } from "@/utils/arraysReason";
import SectionDivider from "./SectionDivider";
import { AnimateOnScroll } from "./AnimateOnScroll";

export const WhyChooseUs = () => {
    return (
        <section className="bg-gray-900  pb-20 ">
            <h2 className="text-center text-gray-400 pt-10
            text-2xl md:text-4xl font-bold">¿Por qué elegirnos?</h2>


        <div className="w-[85%] mx-auto ">
          <SectionDivider />
        <p className="text-center text-gray-500 my-5 pb-4
        text-base md:text-lg">
          Confianza, experiencia y atención de calidad
        </p>
        <AnimateOnScroll animation="fade-left">
        {/* Grid */}
        <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          {arraysReason.map((reason) => (
            <div
              key={reason.id}
              className=" bg-gray-600/30 backdrop-blur rounded p-6 text-gray-900 shadow-lg transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:-translate-y-2
              "
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