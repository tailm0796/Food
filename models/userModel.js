const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (val) {
        return emailRex.test(val);
      },
      message: 'Not a valid Email. Please enter a email address again',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    maxlength: 16,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please provide your password comfirm'],
    minlength: 8,
    maxlength: 16,
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: 'Incorrect password comfirm.Please try again',
    },
  },
  role : {
    type: String,
    enum: ['Khách hàng','Admin'],
    default: 'Khách hàng',
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  address: {
    type: String,
    require: [true, 'Please provide your address'],
  }
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
})
userSchema.methods.comparePassword = async function(enterPassword, userPassword) {
  return bcrypt.compare(enterPassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;