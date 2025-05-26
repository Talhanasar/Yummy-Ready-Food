import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProductEditOpen, setIsProductEditOpen] = useState(false)
    const [productToEdit, setProductToEdit] = useState({})
    const [deletingProduct,setDeletingProduct] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Replace this with your actual API endpoint
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
            setProducts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getProduct = (id) => {
        return products.find(product => product.id === id);
    };

    const updateProduct = async (product) => {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/product/${product._id}`, product)
        if (res.status === 200) {
            setProducts(products.map(p => p._id === product._id ? res.data : p))
            toast.success('Product updated successfully')
        } else {
            throw new Error('Failed to update product')
        }
    }

    const addProduct = async (product) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/product`, product)
        if (res.status === 201) {
            setProducts([...products, res.data])
            toast.success('Product added successfully')
        } else {
            throw new Error('Failed to add product')
        }
    }

    return (
        <ProductContext.Provider value={{
            products,
            setProducts,
            loading,
            error,
            getProduct,
            fetchProducts,
            isProductEditOpen,
            setIsProductEditOpen,
            productToEdit,
            setProductToEdit,
            updateProduct,
            addProduct,
            deletingProduct,
            setDeletingProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};