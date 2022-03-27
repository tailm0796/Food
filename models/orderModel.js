const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    default: "No message",
    required: true,
  },
  phone: {
    type: String,
    required:true,
  },
  address: {
    type:String,
    required:true,
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide name of category'],
  },
  totalQty: {
    type: Number,
    required: [true, 'Please provide name of category'],
  },
  date : {
    type: Date,
    default: Date.now,
  }
})
const Order = mongoose.model('Order', orderModel);
module.exports = Order;