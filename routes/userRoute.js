const express = require('express')
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.route('/signup')
  .get(userController.signupForm)
  .post(authController.signup)
router.route('/login')
  .get(userController.loginForm)
  .post(authController.login)
router.get('/logout', authController.logout);
 /*  router.get('/home', authController.isLogin, (req,res) =>{
    res.send("hello");
}) */
module.exports = router;