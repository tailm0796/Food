const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
module.exports.getAllCategory = catchAsync(async (req, res, next) =>{ 
  const categories =  await Category.find();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: categories,
  });
})
module.exports.creatNewCategory = catchAsync(async (req, res, next) =>{ 
  const category = await Category.create(req.body);
  res.status(200).json({
    status: 'success',
    data :category,
  })
})
module.exports.getCategory = catchAsync(async (req, res, next) =>{ 
  const category = await Category.findById(req.params.id).populate('products');
  if (!category) {
    return next(new AppError('Can\'t not found document with this ID'), 400);
  }
  res.status(200).json({
    status: 'success',
    data :category,
  })
})
module.exports.updateCategory = catchAsync(async (req, res, next) =>{ 
  const category = await Category.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true,
  });
  if (!category) {
    return next(new AppError('Can\'t not found document with this ID'), 400);
  }
  res.status(200).json({
    status: 'success',
    data :category,
  })
})