const express = require('express');
const route = express.Router();
const categoryController = require('../controllers/categoryController');
const productRoute = require('./productRoute');
//category/3132412/product/

route.use('/:categoryID/product', productRoute);   

route
  .route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.creatNewCategory);
route
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory);

module.exports = route;