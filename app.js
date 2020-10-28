const express = require('express');
const mongoose = require('mongoose');
/* const bodyParser = require('body-parser'); */
require('dotenv').config();

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT;
const booksdb = mongoose.connect('mongodb://localhost/mocked_data/booksApi');
const Book = require('./models/bookModel');

const config = {
  useNewUrlParser: true,
};

app.use('/', bookRouter);

app.get('/', (req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is runing on ${port}`);
});
