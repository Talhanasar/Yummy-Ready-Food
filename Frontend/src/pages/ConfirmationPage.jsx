import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { confirmOrderInfo, setConfirmOrderInfo } = useCart();

  useEffect(() => {
    if (Object.keys(confirmOrderInfo).length === 0) {
      toast.error("Wrong path!")
      navigate('/');
    }
  }, [confirmOrderInfo, navigate]);

  if (Object.keys(confirmOrderInfo).length === 0) {
    return null; // or a loading indicator
  }

  const { cart, discount } = confirmOrderInfo;

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate discount amount
  const discountAmount = (subtotal * discount) / 100;
  const shipping = 50;
  
  // Calculate total after discount and shipping
  const total = subtotal - discountAmount + shipping;

  const handleBackToHome = () => {
    setConfirmOrderInfo({});
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Order Confirmed!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>
        <div className="mt-8 bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
          <dl className="mt-4 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <dt className="text-sm font-medium text-gray-500">{item.name} (x{item.quantity})</dt>
                <dd className="text-sm font-medium text-gray-900">{item.price * item.quantity}৳</dd>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                <dd className="text-base font-medium text-gray-900">{subtotal}৳</dd>
              </div>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-green-600">
                <dt className="text-sm font-medium">Discount ({discount}%)</dt>
                <dd className="text-sm font-medium">-{discountAmount}৳</dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-900">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">{shipping}৳</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <dt className="text-lg font-bold text-gray-900">Total</dt>
                <dd className="text-lg font-bold text-gray-900">{total}৳</dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="mt-6">
          <Button
            onClick={handleBackToHome}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
