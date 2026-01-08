'use client'


import SectionDivider from "./SectionDivider";
import { useContactForm } from "@/hooks/useContactForm";
import FormMessage from "./FormMessage";
import { AnimateOnScroll } from "./AnimateOnScroll";


const FormularioContacto = () => {

    const {
    values,
    isValid,
    status,
    errors,
    loading,
    handleChange,
    handleSubmit,
  } = useContactForm()

  return (
    <section className="bg-black backdrop-blur pb-20">
    <div className="min-h-screen py-16 px-4 font-sans">
      {/* Título Principal */}
      <AnimateOnScroll animation="zoom" delay={200}>
      <h2 className="text-center text-slate-400 mb-16 text-2xl md:text-4xl font-bold">
        Contáctanos
      </h2>
      </AnimateOnScroll >
      <SectionDivider />

      <AnimateOnScroll animation="blur">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 ">
        
        {/* Columna Izquierda: Formulario */}
         <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="space-y-6 bg-gray-600/30 backdrop-blur p-6 rounded-lg"
    >
      {/* Nombre */}
      <div>
        <label className="text-slate-400 text-sm">Nombre</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          className="w-full mt-2 p-3 bg-gray-800 rounded
            focus:ring-2 focus:ring-blue-500/30 outline-none"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-slate-400 text-sm">Correo</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="w-full mt-2 p-3 bg-gray-800 rounded
            focus:ring-2 focus:ring-blue-500/30 outline-none"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label className="text-slate-400 text-sm">Mensaje</label>
        <textarea
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          className="w-full mt-2 p-3 bg-gray-800 rounded resize-none
            focus:ring-2 focus:ring-blue-500/30 outline-none"
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message}</p>
        )}
      </div>
      <button
  onClick={handleSubmit}
  disabled={!isValid || loading}
  className={`
    px-8 py-3 rounded font-medium transition-all
    ${
      !isValid || loading
        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
        : 'bg-blue-900 text-gray-200 hover:bg-blue-800'
    }
  `}
>
  {loading ? 'Enviando...' : 'Enviar mensaje'}
</button>
      {status && (
  <FormMessage
    type={status.type}
    message={status.message}
  />
)}

    </form>





















        

        {/* Columna Derecha: Card de Información */}
        <div className="p-10 rounded shadow-sm  bg-gray-600/30 backdrop-blur animate-fade-up">
          <h3 className="text-lg font-semibold text-slate-400 mb-10 ">
            Otras formas de contacto
          </h3>

          <div className="space-y-8">
            {/* Teléfono */}
            <div className="flex items-start gap-5">
              <div className="bg-[#dbeafe] p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm md:text-base  text-slate-400">Teléfono</p>
                <p className="text-lg font-semibold text-slate-500">+1 234 567 890</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="bg-[#dbeafe] p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm md:text-base  text-slate-400">Correo electrónico</p>
                <p className="text-lg font-semibold text-slate-500">contacto@techfixmobile.com</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-5">
              <div className="bg-[#dbeafe] p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm md:text-base  text-slate-400">WhatsApp</p>
                <p className="text-lg font-semibold text-slate-500">+1 234 567 890</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="text-lg font-semibold text-slate-400 mb-6">Síguenos</h4>
            <div className="flex gap-4">
              {/* Círculos sociales neutros */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-11 h-11 bg-[#f1f5f9] rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
            </AnimateOnScroll>
    </div>
    </section>
  );
};

export default FormularioContacto;