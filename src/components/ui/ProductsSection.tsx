'use client'

import { useState } from 'react';
import { arraysPhones } from '@/utils/arraysPhones';
import ProductCard from './PhonesCard';
import PaginationProducts from './PaginationProducts';
import ProductFilters from '@/features/ProductFilters';
import SectionDivider from './SectionDivider';
import { AnimateOnScroll } from './AnimateOnScroll';

const ITEMS_PER_PAGE = 10

export const ProductsSection = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<'phone' | 'accessory'>('phone')

  // 1️⃣ Filtrar por tipo
  const filteredProducts = arraysPhones.filter(
    (product) => product.type === filter
  )

  // 2️⃣ Paginación basada en filtro
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  return (
    <section className="bg-black backdrop-blur pb-20">
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
            setFilter(value)
            setCurrentPage(1)
          }}
        />

        <div   className="
    grid gap-6
    sm:grid-cols-2
    lg:grid-cols-5
    min-h-[42rem]
    items-start
  ">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} phone={product} />
          ))}
        </div>

        <PaginationProducts
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  )
}

export default ProductsSection
