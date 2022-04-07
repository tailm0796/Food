const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.route('/login')
  .get(adminController.loginForm)
  .post(authController.loginAdmin)

router.use(authController.isLogin);
router.use(adminController.isAdmin);
router.get('/dashboard',adminController.dashboard);
router.get('/createProduct', adminController.createProductForm);
router.get('/updateProduct/:id', adminController.updateProductForm);

router.get('/order', adminController.order); 
router.get('/order/:id', adminController.orderDetails);

router.get('/salesByMonth',adminController.showChartData);
router.get('/chart',adminController.showChart);
module.exports = router