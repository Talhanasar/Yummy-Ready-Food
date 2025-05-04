import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart, toggleCart } = useCart();

    return (
        <div className="flex flex-col rounded-lg shadow-lg bg-white cursor-pointer"
        >
            <div className="image h-[70%] rounded-t-lg relative">
                <img
                    alt={product.name}
                    className="object-cover w-full"
                    src={product.imagePath}
                />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.price}<span className="text-xl">&#2547;</span></p>
                <Button className={`w-full bg-orange-500 text-white ${product.itemAvailable === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600 '}`}
                    disabled={product.itemAvailable === 0}
                >
                    {product.itemAvailable > 0 ? <><ShoppingCart className="inline-block mr-2 h-4 w-4" /> Add to Cart</> : 'Out of Stock'}
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;