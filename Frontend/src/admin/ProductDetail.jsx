import React from 'react';
import { NavLink } from "react-router";
import { ArrowLeft, DollarSign, Package, Tag, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import { useProducts } from '../contexts/ProductContext';

export default function ProductDetails({ productId }) {
    const { products, setIsProductEditOpen, setProductToEdit } = useProducts();
    const product = products.find(product => product._id === productId);

    if (!product) {
        return (
            <div className="flex-1 p-8 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
                    <NavLink to="/admin/products" className="text-orange-600 hover:text-orange-700">
                        ← Back to Products
                    </NavLink>
                </div>
            </div>
        );
    }

    const handleEdit = () => {
        setProductToEdit(product);
        setIsProductEditOpen(true);
    };

    return (
        <div className="flex-1 p-8 bg-gray-100 overflow-y-auto" data-lenis-prevent>
            <div className="max-w-4xl mx-auto">
                <NavLink to="/admin/products" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Products
                </NavLink>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                        <Button
                            className="bg-orange-500 text-white hover:bg-orange-600"
                            onClick={handleEdit}
                        >
                            Edit Product
                        </Button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img src={product.imagePath} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Price: {product.price}৳</span>
                                </div>
                                <div className="flex items-center">
                                    <Package className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Stock: {product.itemAvailable} units</span>
                                </div>
                                <div className="flex items-center">
                                    <Tag className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Category: {product.category}</span>
                                </div>
                                <div className="flex items-start">
                                    <FileText className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                                    <div>
                                        <span className="text-sm font-semibold text-gray-600">Description:</span>
                                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}