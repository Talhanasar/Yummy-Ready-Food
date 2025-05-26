const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  minimumPurchaseAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  maxUsageLimit: {
    type: Number,
    required: true,
    default: 1,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
