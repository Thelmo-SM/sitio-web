import { Modal } from '@/components/ui/modals/Modal'
import LoadingForm from '@/components/ui/loaders/LoadingForm'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
  itemName: string
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, loading, itemName }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación">
      <div className="p-4 space-y-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl animate-pulse">
          ⚠️
        </div>
        
        <div className="space-y-2">
          <p className="text-slate-300 text-lg">
            ¿Estás seguro de que quieres eliminar este producto?
          </p>
          <p className="text-white font-bold text-xl uppercase italic tracking-tight">
            {itemName}
          </p>
          <p className="text-red-500/60 text-[10px] uppercase font-black tracking-widest">
            Esta acción no se puede deshacer
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded bg-slate-800 text-slate-400 font-bold hover:bg-slate-700 transition-colors uppercase text-xs"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-4 rounded bg-red-900 cursor-pointer text-white font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-900/20 disabled:opacity-50 uppercase text-xs flex items-center justify-center"
          >
            {loading ? <LoadingForm /> : "Eliminar permanentemente"}
          </button>
        </div>
      </div>
    </Modal>
  )
}