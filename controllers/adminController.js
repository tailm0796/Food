const Product = require('../models/productModel');
const Order =  require('../models/orderModel');
const Category = require ('../models/categoryModel');
const OrderProduct = require('../models/orderProductModel');
const catchAsync = require('../utils/catchAsync');

module.exports.loginForm = (req, res, ) => {
  res.render('users/adminForm')
}
module.exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    res.redirect('/admin/login');
  }
  next();
}
module.exports.dashboard = catchAsync(async (req, res, next) => {
  const products= await Product.find();
  res.render('admin/admin', {products})
})
module.exports.createProductForm = catchAsync(async (req, res) => {
  const categories = await Category.find();
  res.render('products/productForm', { categories });
});
module.exports.updateProductForm =  catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('products/updateProductForm', { product });
})
module.exports.order = catchAsync(async (req, res) => {
  const orders = await Order.find().populate({
    path: "user",
    select: "username -_id",
  });
  res.render('admin/order', {orders});
})
module.exports.orderDetails = catchAsync(async (req, res) => {
  const orderDetails = await OrderProduct.find({order: req.params.id});
  res.render('admin/orderDetails', { orderDetails });
})
module.exports.showChart = (req, res) => {
  res.render('admin/chart');
}
module.exports.showChartData = catchAsync(async (req, res) => {
  const salesByMonth = await Order.aggregate()
    .group({
      _id: {$month: "$date"},
      sumPrice: { $sum: '$totalPrice'}
    })
    .sort({_id: 1}) //1 tang dan -1 giam dan
  res.status(200).json({
    status: 'success',
    data: salesByMonth,
  });
})
