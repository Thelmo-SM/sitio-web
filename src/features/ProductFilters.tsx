'use client'

interface ProductFiltersProps {
  activeFilter: 'phone' | 'accessory'
  onChange: (filter: 'phone' | 'accessory') => void
}

const ProductFilters = ({ activeFilter, onChange }: ProductFiltersProps) => {
  return (
    <div className="flex justify-center gap-4 py-1.5  mb-6  bg-gray-600/30 backdrop-blur rounded">
      <button
        onClick={() => onChange('phone')}
        className={`
          px-5 py-2 rounded text-sm font-medium transition
          ${activeFilter === 'phone'
            ? 'bg-blue-900 text-gray-200'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
        `}
      >
        Teléfonos
      </button>

      <button
        onClick={() => onChange('accessory')}
        className={`
          px-5 py-2 rounded text-sm font-medium transition
          ${activeFilter === 'accessory'
            ? 'bg-blue-900 text-gray-200'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
        `}
      >
        Accesorios
      </button>
    </div>
  )
}

export default ProductFilters
