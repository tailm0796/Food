const express = require('express');
const multer =  require('multer');
const router = express.Router({ mergeParams:true });
const productController = require('../controllers/productController');
const { storage } = require('../cloudinary/index');
const { cloudinary } = require('../cloudinary')
const upload = multer({ storage });

// /product/
router.get('/bestSeller', productController.bestSeller);
router
  .route('/')
  .get(productController.getAllProduct)
  .post(upload.array('images'), productController.createNewProduct);
  //cai dat multer thi moi co req.files
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(upload.array('images'), productController.updateProduct)
  .delete(productController.deleteProduct);
router.get('/addCart/:id', productController.addCart);
router.get('/deleteItem/:id', productController.deleteItem);
router.get('/editQtyItem/:id/qty/:qty', productController.editQtyItem);
router.post('/order', productController.order);

module.exports = router;