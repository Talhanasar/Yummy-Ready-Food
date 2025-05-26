const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const { sendTelegramMessage } = require('../utils/telegramBot');

// Get all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find().populate('products.productId', 'name price imagePath');
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Post a new order
router.post('/', async (req, res, next) => {
  const { customerName, phoneNumber, location, area, products, couponCode, subTotal, discountPercentage, totalPrice, extraNote } = req.body;
  let productsArray = [];
  try {
    // Validate and update product quantities
    for (let product of products) {
      const foundProduct = await Product.findById(product.productId);
      if (!foundProduct) {
        const error = new Error(`Product with id ${product.productId} not found`);
        error.statusCode = 404;
        throw error;
      }
      // Decrease the quantity of the product
      foundProduct.itemAvailable -= product.quantity;
      if (foundProduct.itemAvailable < 0) {
        const error = new Error(`Not enough stock for product ${foundProduct.name}`);
        error.statusCode = 400;
        throw error;
      }
      await foundProduct.save();
      productsArray.push({name: foundProduct.name, quantity: product.quantity});
    }

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });
      if (coupon) {
        coupon.usageCount += 1;
        await coupon.save();
      }
    }

    const newOrder = new Order({
      customerName,
      phoneNumber,
      location,
      area,
      products,
      totalPrice,
      couponUsed: couponCode || null,
      subTotal,
      discountPercentage,
      extraNote: extraNote || ''
    });

    const savedOrder = await newOrder.save();
    sendTelegramMessage(savedOrder, productsArray);
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
});

// Edit an order
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// Delete an order
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;