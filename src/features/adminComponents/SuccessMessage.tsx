import React from 'react';

interface SuccessMessageProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  buttonText?: string;
}

const SuccessMessage = ({ 
  title = "¡LISTO!", 
  message = "La operación se ha realizado con éxito.", 
  onReset,
  buttonText = "VOLVER A EMPEZAR"
}: SuccessMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-400 rounded animate-in fade-in zoom-in duration-500">
      {/* Icono de Check Natural */}
      <div className="w-20 h-20 bg-green-100 rounded flex items-center justify-center mb-6 shadow-sm">
        <svg 
          className="w-10 h-10 text-green-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Texto Estilo Font-Black */}
      <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter mb-4">
        {title}
      </h2>
      
      <p className="text-lg text-gray-800 font-medium max-w-xs mb-8">
        {message}
      </p>

      {/* Botón de Acción Opcional */}
      {onReset && (
        <button 
          onClick={onReset}
          className="w-full py-5 bg-blue-900 hover:bg-blue-800 text-white font-black rounded shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;