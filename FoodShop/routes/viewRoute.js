const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.use(authController.isLogin);

router.get('/checkout',viewController.checkLogin,viewController.checkout);
router.get('/products',viewController.products);
router.get('/home', viewController.home);
router.get('/product/:slug',viewController.details);
router.get('/createProductForm',viewController.createProductForm);
router.get('/signup',viewController.signupForm);
router.get('/login',viewController.loginForm);
module.exports = router;