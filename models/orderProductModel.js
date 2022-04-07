const mongoose = require('mongoose');

const orderProductModel = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
orderProductModel.pre(/^find/, function(next) {
  this.populate('product');
  next();
})
const OrderProduct = mongoose.model('OrderProduct',orderProductModel)
module.exports = OrderProduct;