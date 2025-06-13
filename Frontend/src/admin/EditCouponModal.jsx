import React, { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCoupon } from '../contexts/CouponContext';
import { toast } from 'react-toastify';

const EditCouponModal = () => {
  const { couponToEdit, isCouponEditOpen, setIsCouponEditOpen, updateCoupon, addCoupon } = useCoupon();
  const [editedCoupon, setEditedCoupon] = useState({
    code: '',
    discountPercentage: '',
    validUntil: '',
    minimumPurchaseAmount: '',
    maxUsageLimit: '',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (couponToEdit) {
      setEditedCoupon({
        ...couponToEdit,
        validUntil: new Date(couponToEdit.validUntil).toISOString().split('T')[0],
      });
    } else {
      setEditedCoupon({
        code: '',
        discountPercentage: '',
        validUntil: '',
        minimumPurchaseAmount: '',
        maxUsageLimit: '',
        isActive: true,
      });
    }
  }, [couponToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedCoupon(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (couponToEdit) {
        await updateCoupon(editedCoupon);
      } else {
        await addCoupon(editedCoupon);
      }
    } catch (error) {
      console.error('Failed to save coupon:', error);
      toast.error('Failed to save coupon');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCouponEditOpen) return null;

  const isNewCoupon = !couponToEdit;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{isNewCoupon ? 'Add New Coupon' : 'Edit Coupon'}</h2>
          <button onClick={() => setIsCouponEditOpen(false)} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow" data-lenis-prevent>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <Input
                  id="code"
                  name="code"
                  placeholder="Enter Coupon Code"
                  value={editedCoupon.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage
                </label>
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="number"
                  placeholder="Enter Discount Percentage"
                  value={editedCoupon.discountPercentage}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700 mb-1">
                  Valid Until
                </label>
                <Input
                  id="validUntil"
                  name="validUntil"
                  type="date"
                  value={editedCoupon.validUntil}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="minimumPurchaseAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Purchase Amount
                </label>
                <Input
                  id="minimumPurchaseAmount"
                  name="minimumPurchaseAmount"
                  type="number"
                  placeholder="Enter Minimum Purchase Amount"
                  value={editedCoupon.minimumPurchaseAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="maxUsageLimit" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Usage Limit
                </label>
                <Input
                  id="maxUsageLimit"
                  name="maxUsageLimit"
                  type="number"
                  placeholder="Enter Max Usage Limit"
                  value={editedCoupon.maxUsageLimit}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={editedCoupon.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              {!isSubmitting && <Button type="button" onClick={() => setIsCouponEditOpen(false)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                Cancel
              </Button>}
              <Button type="submit" disabled={isSubmitting} className="bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed min-w-[7rem] flex items-center justify-center">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (isNewCoupon ? 'Add Coupon' : 'Save Changes')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCouponModal;
