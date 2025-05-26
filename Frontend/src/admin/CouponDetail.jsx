import React from 'react';
import { NavLink } from "react-router";
import { ArrowLeft, Calendar, Tag, Percent, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCoupon } from '../contexts/CouponContext';

export default function CouponDetails({ couponId }) {
    const { coupons, updateCoupon } = useCoupon();
    console.log(couponId,coupons);
    const coupon = coupons.find(coupon => coupon._id === couponId);

    if (!coupon) {
        return (
            <div className="flex-1 p-8 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Coupon not found</h2>
                    <NavLink to="/admin/coupons" className="text-orange-600 hover:text-orange-700">
                        ← Back to Coupons
                    </NavLink>
                </div>
            </div>
        );
    }

    const handleStatusUpdate = () => {
        updateCoupon({...coupon, isActive: !coupon.isActive});
    };

    return (
        <div className="flex-1 p-8 bg-gray-100 overflow-y-auto" data-lenis-prevent>
            <div className="max-w-4xl mx-auto">
                <NavLink to="/admin/coupons" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Coupons
                </NavLink>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Coupon: {coupon.code}</h1>
                        <span className={`px-2 py-1 rounded-full text-sm ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {coupon.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Coupon Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Tag className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Code: {coupon.code}</span>
                                </div>
                                <div className="flex items-center">
                                    <Percent className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Discount: {coupon.discountPercentage}%</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Valid Until: {new Date(coupon.validUntil).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Usage Limit: {coupon.maxUsageLimit}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Usage Statistics</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Times Used:</span>
                                    <span className="text-sm font-medium text-gray-800">{coupon.usageCount}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Remaining Uses:</span>
                                    <span className="text-sm font-medium text-gray-800">{coupon.maxUsageLimit - coupon.usageCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200">
                        <Button
                            className={`w-full ${coupon.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-200`}
                            onClick={handleStatusUpdate}
                        >
                            {coupon.isActive ? 'Deactivate Coupon' : 'Activate Coupon'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
