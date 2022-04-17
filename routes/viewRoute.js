const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

router.use(authController.isLogin);

router.get('/checkout',viewController.checkLogin,viewController.checkout);
router.get('/products',viewController.products);
// router.get('/home', viewController.home);
router.get('/', viewController.home);
router.get('/product/:slug',viewController.details);
router.get('/createProductForm',viewController.createProductForm);
router.get('/signup',viewController.signupForm);
router.get('/login',viewController.loginForm);
router.get('/blog',viewController.blog);
router.get('/blog/cach_lam_ga_ran_sot_cay',viewController.cach_lam_ga_ran_sot_cay);
router.get('/blog/cach_lam_hamburger_bo_pho_mai',viewController.cach_lam_hamburger_bo_pho_mai);
router.get('/blog/soda_blue_ocean_voi_mau_xanh_tuoi_mat_giai_khat_cho_mua_he_oi_buc',viewController.soda_blue_ocean_voi_mau_xanh_tuoi_mat_giai_khat_cho_mua_he_oi_buc);
module.exports = router;