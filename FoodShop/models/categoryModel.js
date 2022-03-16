const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name of category'],
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    default: function () {
        return slugify(this.name, {
            lower: true,
        });
    },
  },
  products: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Product'   
    }
  ]
})
const Category = mongoose.model('Category', categorySchema);
module.exports = Category; 