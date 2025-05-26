import React, { useState } from 'react'
import { ShoppingCart, Star, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button';
import { useParams, useNavigate } from "react-router"
import { useCart } from '../contexts/CartContext'
import { useProducts } from '../contexts/ProductContext'

export default function ProductDetails() {
  const { addToCart,toggleCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const { products } = useProducts();
  const {name} = useParams()
  const navigate = useNavigate()
  const product = products.find(product => product.name === name)

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="mb-4 flex items-center text-orange-400 hover:text-orange-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                <img src={product.imagePath} alt={product.name} className="w-full h-full object-center object-cover" />
              </div>
              {/* <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img src={product.image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-center object-cover" />
                  </div>
                ))}
              </div> */}
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">{product.reviews} reviews</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 flex items-center">{product.price}<span className="text-2xl font-extrabold">&#2547;</span></p>
              <p className="text-gray-700">{product.description}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="px-3 py-1">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <Button className={`bg-orange-500 text-white  ${product.itemAvailable === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                  onClick={() => {
                    addToCart(product, quantity)
                    toggleCart()
                  }}
                  disabled={product.itemAvailable === 0}
                >
                  <ShoppingCart className="inline-block mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
              <p className={`text-sm ${product.itemAvailable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.itemAvailable > 0 ? 'In stock' : 'Out of stock'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}