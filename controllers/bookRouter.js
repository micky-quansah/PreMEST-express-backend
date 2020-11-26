const express = require('express');
const User = require('../models/userModel');

function routes(Book) {
  const bookRouter = express.Router();

  /* returns all the books in the collection */

  bookRouter
    // eslint-disable-next-line consistent-return
    .post('/', async (req, res) => {
      const { body } = req;

      const decodedToken = body.token;

      const user = await User.findById(decodedToken.id);

      const book = new Book({
        title: body.title,
        author: body.author,
        number_of_pages: body.number_of_pages,
        category: body.category,
        rating: body.rating,
        user,
      });

      const savedNote = await book.save();

      res.send(savedNote);

      // eslint-disable-next-line no-underscore-dangle
      /* User.notes = user.notes.concat(savedNote._id);
      await user.save();
      return res.status(201).json(book); */
    })
    .get('/', async (req, res) => {
      const books = await Book.find({});
      res.json(books);
    });

  /* make search queries */

  /* bookRouter.route('/books')
  .get((req, res) => {
    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    } else if (req.query.author) {
      query.author = req.query.author;
    } else {
      query.title = req.query.title;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }); */

  /* use middleware to handle retrieving books from the db */

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  /* get individual book */

  bookRouter
    .delete('/books/:bookId', (req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    .get('/books/:bookId', (req, res) => {
      res.json(req.book);
    });

  return bookRouter;
}

module.exports = routes;
