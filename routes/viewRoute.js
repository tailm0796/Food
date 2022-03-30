const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
router.use(authController.isLogin);

router.get(
  '/checkout',
  viewController.checkLogin,
  viewController.checkout,
  function (req, res) {
    res.render('checkout', { title: 'Checkout' });
  }
);
router.get('/products', viewController.products);
router.get('/', viewController.home);
router.get('/product/:slug', viewController.details, function (req, res) {
  res.render('productDetails', { title: 'Product Detail' });
});
router.get(
  '/createProductForm',
  viewController.createProductForm,
  function (req, res) {
    res.render('productForm', { title: 'Create Product Form' });
  }
);
router.get('/signup', viewController.signupForm, function (req, res) {
  res.render('registerForm', { title: 'Sign up' });
});
router.get('/login', viewController.loginForm, function (req, res) {
  res.render('registerForm', { title: 'Log in' });
});
router.get('/blog', viewController.blog, function (req, res) {
  res.render('blog', { title: 'Blog' });
});
module.exports = router;
