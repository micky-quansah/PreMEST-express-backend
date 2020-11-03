/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  number_of_pages: { type: Number },
  category: { type: String },
  rating: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

bookModel.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-underscore-dangle
    returnedObject.id = returnedObject.user._id.toString;
    // delete returnedObject._id;
    // eslint-disable-next-line no-underscore-dangle
    delete returnedObject.__v;
    delete returnedObject.user.passwordHash;
    delete returnedObject.user.name;
    delete returnedObject.user.username;
    delete returnedObject.user.notes;
  },
});

module.exports = mongoose.model('Book', bookModel);
