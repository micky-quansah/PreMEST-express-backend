const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  number_of_pages: { type: Number },
  category: { type: String },
  rating: { type: Number },
});

module.exports = mongoose.model('/book', bookModel);
