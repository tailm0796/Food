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
    res.render('checkout');
  }
);
router.get('/products', viewController.products);
router.get('/', viewController.home);
router.get('/product/:slug', viewController.details);
router.get('/createProductForm', viewController.createProductForm);
router.get('/signup', viewController.signupForm, function (req, res) {
  res.render('registerForm', { title: 'Sign up' });
});
router.get('/login', viewController.loginForm);
router.get('/blog', viewController.blog, function (req, res) {
  res.render('blog', { title: 'Blog' });
});
module.exports = router;
