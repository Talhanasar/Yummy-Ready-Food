import React, { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { useProducts } from '../contexts/ProductContext'
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'
import axios from 'axios';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import Table from '../components/Table';

export default function AdminProducts() {
    const { products, setIsProductEditOpen, setProductToEdit, setProducts } = useProducts()
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const deleteProduct = async (id) => {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`)
        if (res.status === 200 ) {
            setProducts(products.filter(product => product._id !== id))
            toast.success('Product deleted successfully');
        } else {
            toast.error('Failed to delete product')
        }
    }

    const columns = [
        {
            key: 'imagePath',
            header: 'Image',
            render: (product) => <img src={product.imagePath} alt={product.name} className="h-16 w-16 object-cover rounded-md" />,
            className: 'w-1/5'
        },
        { key: 'name', header: 'Name', className: 'w-1/5' },
        { key: 'price', header: 'Price', render: (product) => `${product.price}৳`, className: 'w-1/5' },
        { key: 'itemAvailable', header: 'Stock', className: 'w-1/5' },
    ]

    const actions = [
        {
            icon: <Edit className="h-4 w-4" />,
            onClick: (product) => {
                setProductToEdit(product)
                setIsProductEditOpen(true)
            },
            className: "bg-blue-500 text-white hover:bg-blue-600"
        },
        {
            icon: <Trash2 className="h-4 w-4" />,
            onClick: (product) => deleteProduct(product._id),
            className: "bg-red-500 text-white hover:bg-red-600"
        }
    ]

    return (
        <main className="flex-1 p-8 overflow-hidden bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <Button className="bg-orange-500 text-white hover:bg-orange-600"
                        onClick={() => {
                            setProductToEdit(null)
                            setIsProductEditOpen(true)
                        }}
                    >
                        <Plus className="inline-block mr-2 h-5 w-5" />
                        Add Product
                    </Button>
                </div>
                <div className="mb-6 flex justify-between items-center">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search products"
                            className="w-[30vw] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={filteredProducts}
                    onRowClick={(product) => navigate(`/admin/product/${product._id}`)}
                    actions={actions}
                />
            </div>
        </main>
    )
}