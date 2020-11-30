/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorModel = new Schema({
  name: { type: String },
  rating: { type: String },
  books: { title: String },
  authorId: { type: String },
});

authorModel.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Authors', authorModel);
