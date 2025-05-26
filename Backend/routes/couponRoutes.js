const express = require('express');
const router = express.Router();
const Coupon = require('../models/couponModel');

// Get all coupons
router.get('/', async (req, res, next) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    next(error);
  }
});

// Post new coupon
router.post('/', async (req, res, next) => {
  const { code, discountPercentage, validUntil, minimumPurchaseAmount, maxUsageLimit, isActive } = req.body;

  const newCoupon = new Coupon({ 
    code, 
    discountPercentage, 
    validUntil, 
    minimumPurchaseAmount, 
    maxUsageLimit,
    isActive 
  });

  try {
    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (error) {
    next(error);
  }
});

// Edit coupon by ID
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCoupon) {
      const error = new Error('Coupon not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(updatedCoupon);
  } catch (error) {
    next(error);
  }
});

// Delete coupon by ID
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      const error = new Error('Coupon not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;