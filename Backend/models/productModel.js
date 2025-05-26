const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  reviews: {
    type: Number,
    default: 120,
  },
  itemAvailable: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  isSpecial: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
