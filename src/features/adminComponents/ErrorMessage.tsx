import React from 'react';

interface ErrorMessageProps {
  message: string | null;
  onDismiss?: () => void;
}

const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/40 p-4 rounded flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3">
        {/* Icono de Alerta */}
        <div className="bg-red-500 p-1 rounded-full text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Error del sistema</p>
          <p className="text-sm font-bold text-red-500 uppercase">{message}</p>
        </div>
      </div>

      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="text-red-500/50 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;