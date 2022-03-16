
const AppError = require('../utils/appError');
const handlerValidationErrorDB = (err) => {
  const errMessage = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input. ${errMessage.join('. ')}`;
  return new AppError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something was wrong.Try Again later';
  if (err.name === 'ValidationError') err = handlerValidationErrorDB(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    //stack: err.stack
  })
  next()
}