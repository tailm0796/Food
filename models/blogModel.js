const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title of blog'],
  },
  description: { type: String },
  image: {
    type: String,
  },
  content: {
    type: String,
  },
  writtenBy: {
    type: String,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: { type: Date },
  createdAt: { type: Date },
  hastag: { type: String },
  topic: { type: String },
});
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
