import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, CircleX, Trash } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from './ui/Button';
import { useCart } from '../contexts/CartContext';
import { useCoupon } from '../contexts/CouponContext';
import { toast } from 'react-toastify';

export default function SideCart() {
  const { isCartOpen, cart, removeFromCart, updateQuantity, toggleCart, clearCart } = useCart();
  const { usedCoupon, applyCoupon, removeCoupon, discount, coupons } = useCoupon();
  const navigate = useNavigate();

  const [addCoupon, setAddCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  // Calculate total and apply discount
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total - (total * discount) / 100;

  useEffect(() => {
    // Control overflow based on the cart state
    if (isCartOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isCartOpen]);

  const handleApplyCoupon = () => {
    if (couponCode) {
      applyCoupon(couponCode, total);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.info('Coupon removed.', { autoClose: 700 });
    setCouponCode('');
  };

  const handleClearCart = () => {
    clearCart();
    removeCoupon();
    toast.info('Cart cleared.', { autoClose: 700 });
  };

  const handleRemoveFromCart = (productId) => {
    const newTotal = cart.reduce((sum, item) => {
      if (item._id !== productId) {
        return sum + item.price * item.quantity;
      }
      return sum;
    }, 0);

    if (usedCoupon) {
      const coupon = coupons.find(c => c.code === usedCoupon);
      if (coupon && newTotal < coupon.minimumPurchaseAmount) {
        toast.error(`Minimum purchase amount ${coupon.minimumPurchaseAmount}৳ is required to use this coupon`);
        return;
      }
    }

    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const newTotal = cart.reduce((sum, item) => {
      if (item._id === productId) {
        return sum + item.price * newQuantity;
      }
      return sum + item.price * item.quantity;
    }, 0);

    if (usedCoupon) {
      const coupon = coupons.find(c => c.code === usedCoupon);
      if (coupon && newTotal < coupon.minimumPurchaseAmount) {
        toast.error(`Minimum purchase amount ${coupon.minimumPurchaseAmount}৳ is required to use this coupon`);
        return;
      }
    }

    updateQuantity(productId, newQuantity);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      ></div>

      {/* Side Cart */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-1/2 lg:w-1/3 bg-white shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-black/50">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <Button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4" data-lenis-prevent>
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item._id} className="flex items-center space-x-4">
                      <img src={item.imagePath} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.price}৳</p>
                        <div className="flex items-center mt-2">
                          <Button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={20} />
                      </Button>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handleClearCart}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 flex items-center justify-center"
                >
                  <Trash className="mr-2" size={20} />
                  Remove All Items
                </Button>
              </>
            )}
          </div>

          {/* Coupon Code Input */}
          <div className="p-4 border-t border-black/50 flex justify-center items-center">
            {usedCoupon ? (
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-xl py-1 pl-4 pr-2 text-sm flex justify-between items-center gap-3">
                  {usedCoupon}
                  <span className="cursor-pointer" onClick={handleRemoveCoupon}>
                    <CircleX size={19} />
                  </span>
                </div>
              </div>
            ) : addCoupon ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-grow p-2 border rounded-md"
                />
                <Button onClick={handleApplyCoupon} className="ml-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Apply
                </Button>
              </div>
            ) : (
              <p className="cursor-pointer underline hover:text-gray-700" onClick={() => setAddCoupon(true)}>
                Have any Coupon?
              </p>
            )}
          </div>

          {/* Total and Discount */}
          <div className="p-4 border-t border-black/50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className={`text-lg font-semibold ${discount > 0 ? 'line-through text-gray-500' : ''}`}>{total}৳</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg text-green-600">Discount Applied: {discount}%</span>
                  <span className="text-sm text-gray-500">You saved {(total * discount) / 100}৳!</span>
                </div>
                <span className="font-semibold text-xl text-green-600">{discountedTotal}৳</span>
              </div>
            )}

            {/* Proceed to Checkout */}
            <Button
              disabled={cart.length === 0}
              className={`block w-full text-center bg-orange-500 text-white py-2 rounded  transition duration-200 ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
              onClick={()=>{
                navigate('/checkout');
                toggleCart();
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
