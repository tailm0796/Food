const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const OrderProduct = require('../models/orderProductModel');
const catchAsync = require('../utils/catchAsync');
const Cart = require('../cart');
const AppError = require('../utils/appError');
const Email = require('../utils/sendEmail');
const { cloudinary } = require('../cloudinary')
module.exports.createNewProduct = catchAsync(async (req, res, next) => {
  let idCategory;
  if (req.params.categoryID) idCategory = req.params.categoryID;
  if (req.body.category) idCategory = req.body.category;
  const categoryProduct = await Category.findById(idCategory);
  const product =  new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  })
  // req.files phai cai dat multer ben route
  if( req.files){
    product.images = req.files.map((f) => ({ url: f.path , fileName: f.filename }));
  }
  categoryProduct.products.push(product);
  await product.save();
  await categoryProduct.save();
  /* res.status(200).json({
    status: 'success',
    data: product,
  }) */
  res.redirect('/admin/dashboard');
});
module.exports.getAllProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: products,
  })
})
module.exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError ('Can\'t not found this product with this ID'), 400);
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
})
module.exports.updateProduct = catchAsync( async (req, res, next) => {
  let updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body ,{new: true});
  if (!updatedProduct) {
    return next(new AppError ('Can\'t not found this product with this ID'), 400);
  }
  if (req.files.length > 0) {
    const fileImg = [];
    for (let img of updatedProduct.images) {
      fileImg.push(img.fileName);
      await cloudinary.uploader.destroy(img.fileName);
    }
    updatedProduct = await Product.findByIdAndUpdate(req.params.id,{$pull: {images: {fileName: {$in: fileImg }}}},{new: true});
    const newImg = req.files.map(file => ({ url: file.path, fileName: file.filename }))
    updatedProduct.images.push(...newImg);
    await updatedProduct.save();

  }
 /*  res.status(200).json({
    status: 'success',
    data: updatedProduct,
  }); */
  res.redirect('/admin/dashboard');
})
module.exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if(!product) {
    return next(new AppError ('Can\'t not found this product with this ID'), 400);
  }
  for (let img of product.images) {
    await cloudinary.uploader.destroy(img.fileName);
  }
  await product.findByIdAndDelete(id);
  res.status(200).json({
    status: 'success',
    message: 'Delete success',
  })
})
module.exports.addCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const cart = new Cart(req.session.cart ? req.session.cart : {})
  cart.addtoCart(product, id);
  req.session.cart = cart;
  res.locals.cart = cart;
  res.render('cart/index')
})
module.exports.deleteItem =  (req, res, next) => {
  const { id } = req.params;
  const cart = new Cart (req.session.cart ? req.session.cart : {});
  cart.deleteFromCart(id);
  req.session.cart = cart ;
  res.locals.cart = cart;
  if (cart.listProduct.length <= 0) {
    req.session.destroy();
    res.clearCookie('session');
    res.locals.cart = undefined;
  } 
  res.render('cart/index')
};
module.exports.editQtyItem = (req, res, next) => {
  const { id } = req.params;
  const qty = req.params.qty *1;
  const cart = new Cart( req.session.cart ? req.session.cart : {});
  cart.editQtyItem(id, qty);
  req.session.cart = cart;
  res.locals.cart = cart;
  res.render('cart/index')
};
module.exports.order = catchAsync(async (req, res, next) => {
  const { username, email, phone, address, message, date } = req.body;
  const user = await User.findOne({ email: email });
  const order = new Order({
    user: user.id,
    message,
    phone,
    address,
    date,
    totalPrice: req.session.cart.totalPrice,
    totalQty: req.session.cart.totalQuantity
  })
  await order.save()
  req.session.cart.listProduct.forEach(async (product) =>  {
    const orderProduct = new OrderProduct({
      order: order.id,
      product: product.id, 
      qty: product.qty,
      price: product.price,
    })
  await orderProduct.save();
  })
  try {
    const url = "http://localhost:3000/home";
    const data = req.session.cart;
    const sendEmail = new Email(user,url,data);
    await sendEmail.sendMail();
  } catch (err) {
    console.log(err);
  }
  res.clearCookie('session');
  res.status(200).json({
    status: 'success',
    message: 'Order successfuly'
  });
})
module.exports.bestSeller = catchAsync(async (req, res, next) => {
  const bestSeller = await OrderProduct.aggregate()
    .group({
      _id: '$product',
      sumQty: { $sum: '$qty'}
    })
    .sort({sumQty: -1})
    .limit(5);
  const result = await Promise.all(bestSeller.map(async function (el) {
    const product = await Product.findById(el._id);
    return product;
  }));
  res.send(result);
})
