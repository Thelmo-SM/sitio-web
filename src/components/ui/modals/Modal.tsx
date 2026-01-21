'use client';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose} 
      />

      {/* Contenedor de la Modal */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden rounded border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header - Corregido para móvil */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight pr-4 line-clamp-1">
            {title}
          </h3>
          
          {/* Botón de cierre optimizado para touch */}
          <button 
            onClick={onClose}
            className="shrink-0 w-10 h-10 flex items-center cursor-pointer justify-center bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
            aria-label="Cerrar modal"
          >
            <span className="text-xl font-bold">✕</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-transparent">
          {children}
        </div>
      </div>
    </div>
  );
};