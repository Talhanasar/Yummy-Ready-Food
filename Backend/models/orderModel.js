const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location:{
    type: String,
  },
  area: {
    type: String,
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  couponUsed: {
    type: String,
    default: null,
  },
  subTotal: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  extraNote: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'pending',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
