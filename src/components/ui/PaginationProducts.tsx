interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const PaginationProducts = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-3 py-2 rounded
          border border-gray-600
          text-sm text-gray-800
          bg-white
          hover:bg-gray-800 hover:text-white
          transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        ‹ Anterior
      </button>

      {/* Números */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1
        const isActive = currentPage === page

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-2 rounded
              border border-gray-600
              text-sm font-medium
              transition
              ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-800 hover:text-white'
              }
            `}
          >
            {page}
          </button>
        )
      })}

      {/* Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-3 py-2 rounded
          border border-gray-600
          text-sm text-gray-800
          bg-white
          hover:bg-gray-800 hover:text-white
          transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Siguiente ›
      </button>
    </div>
  )
}

export default PaginationProducts
