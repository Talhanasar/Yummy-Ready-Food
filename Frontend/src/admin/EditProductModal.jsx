import React, { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useProducts } from '../contexts/ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProductModal = () => {
  const { productToEdit, isProductEditOpen, setIsProductEditOpen, updateProduct, addProduct, } = useProducts();
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    itemAvailable: '',
    imagePath: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setEditedProduct({
        name: productToEdit.name ?? '',
        price: productToEdit.price ?? '',
        description: productToEdit.description ?? '',
        category: productToEdit.category ?? '',
        itemAvailable: productToEdit.itemAvailable ?? '',
        imagePath: productToEdit.imagePath ?? '',
      });
      setPreviewImage(productToEdit.imagePath || null);
    } else {
      setEditedProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        itemAvailable: '',
        imagePath: '',
      });
      setPreviewImage(null);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      setIsUploading(true);
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        formData
      );
      console.log('Cloudinary response:', response.data);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = editedProduct.imagePath;

    if (imageFile) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
      } catch (error) {
        // Handle error (e.g., show error message to user)
        console.error('Failed to upload image:', error);
        toast.error('Failed to upload image');
        setIsUploading(false);
        return;
      }
    }

    const updatedProduct = { ...editedProduct, imagePath: imageUrl };

    try {
      if (productToEdit) {
        setIsUploading(true);
        await updateProduct(updatedProduct);
      } else {
        await addProduct(updatedProduct);
      }
      setIsProductEditOpen(false);
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error('Failed to save product');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isProductEditOpen) return null;

  const isNewProduct = !productToEdit;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{isNewProduct ? 'Add New Product' : 'Edit Product'}</h2>
          <button onClick={() => setIsProductEditOpen(false)} className="text-gray-400 hover:text-gray-500 cursor-pointer">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow" data-lenis-prevent>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Product Name"
                  value={editedProduct.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter Product Price"
                  value={editedProduct.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter Product Description"
                  value={editedProduct.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Enter Product Category"
                  value={editedProduct.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="itemAvailable" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <Input
                  id="itemAvailable"
                  name="itemAvailable"
                  type="number"
                  placeholder="Enter Product Stock"
                  value={editedProduct.itemAvailable}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="newImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                {previewImage && (
                  <img src={previewImage} alt="Product preview" className="mb-2 w-full h-40 object-cover rounded-md" />
                )}
                <input
                  id="newImage"
                  name="newImage"
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required={isNewProduct}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              {!isUploading && <Button type="button" onClick={() => setIsProductEditOpen(false)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                Cancel
              </Button>}
              <Button type="submit" disabled={isUploading} className="bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed min-w-[7rem] flex items-center justify-center">
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isNewProduct ? 'Add Product' : 'Save Changes')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
