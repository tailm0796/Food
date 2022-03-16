const mongoose = require('mongoose');
const slugify = require('slugify');
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  fileName: {
    type: String,
  }    
})
/* imageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload','/upload/w_180,h_180');
}) */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
  },
  slug: {
    type: String,
    default: function () {
        return slugify(this.name, {
          lower: true,
        });
    },
  },
  images: [imageSchema],
})
const Product = mongoose.model('Product', productSchema);
module.exports = Product;