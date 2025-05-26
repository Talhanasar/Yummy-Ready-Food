import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Button from './ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProductList({ products, sortOption }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortedProducts = [...currentProducts].sort((a, b) => {
    switch (sortOption) {
      case 'Alphabetically, A-Z':
        return a.name.localeCompare(b.name);
      case 'Alphabetically, Z-A':
        return b.name.localeCompare(a.name);
      case 'Price, Low to High':
        return a.price - b.price;
      case 'Price, High to Low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <>
      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <Button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            {[...Array(totalPages).keys()].map((number) => (
              <Button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === number + 1
                    ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {number + 1}
              </Button>
            ))}
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}

export default ProductList;