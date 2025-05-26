import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// Create the CouponContext
const CouponContext = createContext();

// Create a provider component
export function CouponProvider({ children }) {
    const [coupons, setCoupons] = useState([]);
    const [couponToEdit, setCouponToEdit] = useState(null);
    const [isCouponEditOpen, setIsCouponEditOpen] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [usedCoupon, setUsedCoupon] = useState('');

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/coupon`);
                setCoupons(response.data);
            } catch (error) {
                console.error('Error fetching coupons:', error);
                toast.error('Failed to fetch coupons');
            }
        };

        fetchCoupons();
    }, []);

    // Apply coupon logic
    const applyCoupon = (code, totalAmount) => {
        const matched = coupons.find(coupon => coupon.code === code);
        if (matched) {
            const currentDate = new Date();
            if (currentDate > new Date(matched.expiryDate)) {
                toast.error('This coupon has expired');
                return;
            }else if (totalAmount < matched.minimumPurchaseAmount) {
                toast.error(`Minimum purchase amount of ${matched.minimumPurchaseAmount}৳ required for this coupon`);
                return;
            }else if (matched.usageCount >= matched.maxUsageLimit) {
                toast.error('This coupon has reached its maximum usage limit');
                return;
            }else if(matched.isActive === false){
                toast.error('This coupon is not active',{autoClose:700});
                return;
            }
            toast.success(`Congratulations! ${matched.discountPercentage}% discount applied.`, { autoClose: 700 });
            setDiscount(matched.discountPercentage);
            setUsedCoupon(code);
        } else {
            toast.error('Invalid coupon code');
            setDiscount(0);
            setUsedCoupon('');
        }
    };

    // Remove applied coupon
    const removeCoupon = () => {
        setDiscount(0);
        setUsedCoupon(''); // Reset coupon data when removed
    };
    const deleteCoupon = async (couponId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/coupon/${couponId}`);
            setCoupons(coupons.filter(coupon => coupon._id !== couponId));
            toast.success('Coupon deleted successfully');
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    const addCoupon = async (coupon) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/coupon`, coupon);
            setCoupons([...coupons, response.data]);
            toast.success('Coupon added successfully');
            setIsCouponEditOpen(false);
        } catch (error) {
            console.error('Error adding coupon:', error);
            toast.error('Failed to add coupon');
        }
    };
    const updateCoupon = async (coupon) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/coupon/${coupon._id}`, coupon);
            setCoupons(coupons.map(c => c._id === coupon._id ? coupon : c));
            toast.success('Coupon updated successfully');
            setIsCouponEditOpen(false);
        } catch (error) {
            console.error('Error updating coupon:', error);
            toast.error('Failed to update coupon');
        }
    };

    return (
        <CouponContext.Provider value={{ 
            coupons, 
            discount, 
            usedCoupon, 
            applyCoupon, 
            removeCoupon,
            deleteCoupon,
            couponToEdit,
            setCouponToEdit,
            isCouponEditOpen,
            setIsCouponEditOpen,
            addCoupon,
            updateCoupon
        }}>
            {children}
        </CouponContext.Provider>
    );
}

// Custom hook to use the CouponContext
export function useCoupon() {
    return useContext(CouponContext);
}