'use client'

import { useState, useEffect } from 'react';
import ProductCard from './PhonesCard';
import PaginationProducts from './PaginationProducts';
import ProductFilters from '@/features/ProductFilters';
import SectionDivider from './SectionDivider';
import { AnimateOnScroll } from './AnimateOnScroll';
import { getProducts } from '@/services/content.service';
import { Product } from '@/types/content'; // Importa tu tipo

const ITEMS_PER_PAGE = 10

export const ProductsSection = () => {
  // 1. Estados para los datos de Firebase
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'phone' | 'accessory'>('phone');

  // 2. Cargar productos desde Firebase al iniciar
  useEffect(() => {
    const loadData = async () => {
      const data = await getProducts();
      setAllProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // 3. Filtrar por tipo (usando los datos de la base de datos)
  const filteredProducts = allProducts.filter(
    (product) => product.type === filter
  );

  // 4. Paginación basada en el filtro
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Si está cargando, puedes mostrar un spinner o nada
  if (loading) return <div className="bg-black py-20 text-center text-white">Cargando productos...</div>;

  return (
    <section className="bg-black backdrop-blur pb-20 scroll-mt-20" id='productos'>
      <div className="mx-auto w-[85%]">
        <AnimateOnScroll animation="zoom" delay={200}>
          <h2 className="text-center text-gray-400 pt-10 text-2xl md:text-4xl font-bold">
            Nuestros Productos
          </h2>
        </AnimateOnScroll>
        <SectionDivider />

        {/* Filtros */}
        <ProductFilters
          activeFilter={filter}
          onChange={(value) => {
            setFilter(value as 'phone' | 'accessory');
            setCurrentPage(1);
          }}
        />

        {/* Lista de Productos Reales */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 min-h-[42em] items-start">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product.id} phone={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-20">
              No hay {filter === 'phone' ? 'teléfonos' : 'accesorios'} disponibles.
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <PaginationProducts
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
};

export default ProductsSection;