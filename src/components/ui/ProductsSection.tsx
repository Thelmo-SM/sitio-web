'use client'

import { useState, useEffect } from 'react';
import ProductCard from './PhonesCard';
import PaginationProducts from './PaginationProducts';
import ProductFilters from '@/features/ProductFilters';
import SectionDivider from './SectionDivider';
import { AnimateOnScroll } from './AnimateOnScroll';
import { getProducts } from '@/services/content.service';
import { Product } from '@/types/content';

// IMPORTAMOS TUS NUEVOS COMPONENTES ESPECÍFICOS
import { ModalProducts } from './modals/ModalProducts';  
import { useModalProducts } from '@/hooks/useModalProducts'; // Ajusta la ruta según tu carpeta
import ProductDetail from './ProductDetail'; // El contenido que creamos
import ProductCardSkeleton from './loaders/ProductCardSkeleton';

const ITEMS_PER_PAGE = 10

export const ProductsSection = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'phone' | 'accessory'>('phone');

  // USAMOS TU HOOK PERSONALIZADO
  const { isOpen, openModal, closeModal } = useModalProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getProducts();
      setAllProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Función para manejar el clic en el producto
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    openModal();
  };

  const filteredProducts = allProducts.filter(
    (product) => product.type === filter
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
  return (
    <section
      className="bg-black backdrop-blur pb-20 scroll-mt-20"
      id="productos"
    >
      <div className="mx-auto w-[85%]">

        <h2 className="text-center text-gray-400 pt-10 text-2xl md:text-4xl font-bold">
          Nuestros Productos
        </h2>

        <SectionDivider />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 min-h-[42em] items-start">

          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        </div>
      </div>
    </section>
  )
}

  return (
    <section className="bg-black backdrop-blur pb-20 scroll-mt-20" id='productos'>
      <div className="mx-auto w-[85%]">
        <AnimateOnScroll animation="zoom" delay={200}>
          <h2 className="text-center text-gray-400 pt-10 text-2xl md:text-4xl font-bold">
            Nuestros Productos
          </h2>
        </AnimateOnScroll>
        <SectionDivider />

        <ProductFilters
          activeFilter={filter}
          onChange={(value) => {
            setFilter(value as 'phone' | 'accessory');
            setCurrentPage(1);
          }}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 min-h-[42em] items-start">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product)}
                className="cursor-pointer transform transition-transform hover:scale-[1.02] active:scale-95"
              >
                <ProductCard phone={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-20">
              No hay {filter === 'phone' ? 'teléfonos' : 'accesorios'} disponibles.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <PaginationProducts
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* --- TU NUEVO MODAL ESPECÍFICO DE PRODUCTOS --- */}
        <ModalProducts 
          isOpen={isOpen} 
          onClose={closeModal} 
          title={selectedProduct ? `${selectedProduct.brand} ${selectedProduct.model}` : "Detalle"}
        >
          {selectedProduct && (
            <ProductDetail product={selectedProduct} />
          )}
        </ModalProducts>
      </div>
    </section>
  );
};

export default ProductsSection;