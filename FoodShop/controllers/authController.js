const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => 
  jwt.sign({id: id}, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const cookieOption = {
  expires: new Date (
    new Date(Date.now() + 7 * 3600 * 24 * 1000 ) // het han trong 7 ngay
  ),
  httpOnly: true,
}
const sendJWTtoken  = (res, user, statusCode) => {
 const token = signToken(user._id);
 res.cookie('jwt', token, cookieOption);
 res.status(statusCode).json({
   status: 'success',
   token,
   user,
 })
}
module.exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({ 
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phone: req.body.phone,
    address: req.body.address,
  });
  sendJWTtoken(res, user, 201);
})
module.exports.login = catchAsync(async (req, res, next) => {
  const { email , password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password',404));
  }
  const user = await User.findOne({email: email});
  if (!user || !(await user.comparePassword(password, user.password)) ) {
    return next(new AppError('Email or passwornd incorrect.Try again',404))
  };
  sendJWTtoken(res, user, 200);
})
module.exports.protect = catchAsync(async (req, res, next) => {
  if (req.cookies.token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Your are not login. Please login'), 401);
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_TOKEN_SECRET
  );
  const currentUser = await User.findById(decoded.id);
  if(!currentUser) {
    return next(new AppError('The user belonging with this token not exist'), 401);
  }
  req.user = currentUser
  next();
})
module.exports.restrictTo =
  (...roles) =>
  // roles = [admin,user,guide];
  (req, res, next) => {
    //console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not allow to acess this route'), 403);
      //403 :authorization error
    }
    next();
    //cach truyen tham so vao vao middleware function la tra ve 1 function req,res,next
  };
module.exports.isLogin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next();
  }
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_TOKEN_SECRET
    );
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }
    res.locals.user = currentUser;
    req.user = currentUser;
    next();
  } catch {
    next();
  }
};
module.exports.loginAdmin = catchAsync(async (req, res, next) => {
  const { email , password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password',404));
  }
  const user = await User.findOne({email: email});
  if (!user || !(await user.comparePassword(password, user.password)) ) {
    return next(new AppError('Email or passwornd incorrect.Try again',404))
  };
  if (user.role !== 'Admin') return next(new AppError('Please login with admin account'),403);
  sendJWTtoken(res, user, 200);
})
module.exports.logout = (req, res) => {
  //Xoa session
  res.clearCookie("session");
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};