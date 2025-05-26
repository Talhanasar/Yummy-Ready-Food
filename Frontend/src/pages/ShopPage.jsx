import React, { useEffect, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ProductList from '../components/ProductList';
import { useProducts } from '../contexts/ProductContext';

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('Alphabetically, A-Z');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { products } = useProducts();

  const categories = ['All Categories'];

  const filteredProducts = selectedCategory === 'All Categories'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.title = "Yummy Ready Food || Shop";
  }, []);

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-orange-600">
          Yummy Ready Food Shop
        </h1>
        <p className="max-w-2xl text-gray-600 text-center mx-auto mb-8">
          Discover our curated selection of high-quality, ready-to-cook meals and elevate your dining experience.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Filters */}
          <aside className={`w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            <h3 className="font-bold text-xl mb-4 text-gray-800">Filters</h3>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Categories</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer py-2 px-3 rounded transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-100 text-orange-600 font-semibold'
                        : 'hover:bg-orange-50'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-4">
                <select
                  className="border border-gray-300 rounded-md p-2 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="Alphabetically, A-Z">Sort: A-Z</option>
                  <option value="Alphabetically, Z-A">Sort: Z-A</option>
                  <option value="Price, Low to High">Price: Low to High</option>
                  <option value="Price, High to Low">Price: High to Low</option>
                </select>
                <Button
                  className="md:hidden bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                >
                  <Filter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <ProductList 
              products={searchedProducts}
              sortOption={sortOption}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;