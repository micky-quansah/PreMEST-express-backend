const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const Book = require('./models/bookModel');
const bookRouter = require('./controllers/bookRouter')(Book);
const usersRouter = require('./controllers/users');
const authorRouter = require('./controllers/authorRouter');
const tokenVarify = require('./controllers/tokenVarification');

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

// eslint-disable-next-line no-unused-vars
const booksdb = mongoose.connect(process.env.LOCAL_MONGO_URI, config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server working');
});
app.use('/admin', usersRouter);
app.use('/authors', tokenVarify, authorRouter);
app.use('/books', tokenVarify, bookRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is runing on ${port}`);
});
