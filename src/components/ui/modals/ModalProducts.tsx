"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const ModalProducts = ({ isOpen, onClose, title, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Usamos createPortal para que el modal se renderice fuera de la sección de productos
  return createPortal(
    <div className="fixed inset-0 top-0 left-0 w-full h-full z-[9999] flex items-center justify-center p-4">
      
      {/* Overlay Oscuro */}
      <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity" />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 rounded shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/10">
        
        {/* Header Fijo */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase">
            {title || "Detalle"}
          </h2>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:bg-gray-800 transition font-medium  text-xs rounded cursor-pointer"
          >
            CERRAR <span className="text-red-500">✕</span>
          </button>
        </div>

        {/* CONTENEDOR CON SCROLL INTERNO */}
        {/* max-h-[70vh] limita el tamaño para que no abrume y active el scroll */}
        <div className="p-6 overflow-y-auto max-h-[75vh] custom-scrollbar bg-gray-50/50 dark:bg-transparent">
          {children}
        </div>

        {/* Footer decorativo o informativo opcional */}
        <div className="p-3 bg-gray-100 dark:bg-slate-800/50 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Desliza para ver más detalles
          </p>
        </div>
      </div>
    </div>,
    document.body // Esto lo manda al final del HTML
  );
};