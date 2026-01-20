'use client';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // Cerrar con la tecla Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // Bloquear scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Overlay con blur más profesional */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose} 
      />

      {/* Contenedor de la Modal - Adaptado para Responsive */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
        
        {/* Header - Siempre visible arriba */}
        <div className="flex items-center justify-between p-5 border-b dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer text-slate-500 hover:text-red-500"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>

        {/* Body - Con scroll independiente si el contenido es largo */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};