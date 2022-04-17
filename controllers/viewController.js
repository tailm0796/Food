const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const OrderProduct = require('../models/orderProductModel');
const catchAsync = require('../utils/catchAsync');
module.exports.home = catchAsync(async (req, res, next) => {
  /* const products = await Product.find().limit(8); */
  const bestSeller = await OrderProduct.aggregate()
    .group({
      _id: '$product',
      sumQty: { $sum: '$qty'}
    })
    .sort({sumQty: -1})
    .limit(8);
  const products = await Promise.all(bestSeller.map(async function (el) {
    const product = await Product.findById(el._id);
    return product;
  }));
  res.render('layout/home', { products });
});
module.exports.signupForm = (req, res) => {
  res.render('users/registerForm');
}
module.exports.loginForm = (req, res) => {
  res.render('users/loginForm');
}
module.exports.createProductForm = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.render('products/productForm', { categories });
});
module.exports.details = catchAsync(async(req, res) => {
  const product = await Product.findOne({ slug: req.params.slug});
  res.render('layout/productDetails', {product});
})
module.exports.checkLogin = (req, res, next) => {
  if (!req.user) return res.redirect('/signup');
  next();
}
module.exports.checkout = (req , res) => {
  res.render('layout/checkout');
} 
module.exports.products = catchAsync(async(req, res) => {
  const products = await Product.find();
  const categories = await Category.find().select('_id , name');
  res.render('layout/category', {products,categories});
})
module.exports.blog = (req , res) => {
  res.render('layout/blog');
}
module.exports.cach_lam_ga_ran_sot_cay = (req , res) => {
  res.render('layout/cach_lam_ga_ran_sot_cay');
}
module.exports.cach_lam_hamburger_bo_pho_mai = (req , res) => {
  res.render('layout/cach_lam_hamburger_bo_pho_mai');
}
module.exports.soda_blue_ocean_voi_mau_xanh_tuoi_mat_giai_khat_cho_mua_he_oi_buc = (req , res) => {
  res.render('layout/soda_blue_ocean_voi_mau_xanh_tuoi_mat_giai_khat_cho_mua_he_oi_buc');
}