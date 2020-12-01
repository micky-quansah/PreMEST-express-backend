const express = require('express');
const Author = require('../models/authorModel');
const Book = require('../models/bookModel');

const autherRouter = express.Router();

autherRouter
  .get('/', async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
  });

autherRouter.use('/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId, (err, author) => {
    if (err) {
      return res.send(err);
    }
    if (author) {
      req.author = author;
      console.log(req.author);
      return next();
    }
    return res.sendStatus(404);
  });
});

autherRouter
/*   .delete('/:authorId', (req, res) => {
    req.author.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  }) */
  .get('/:authorId', async (req, res) => {
    const { name } = req.author;
    const returnedBooks = await Book.find({ name });
    console.log(name);
    res.json(returnedBooks);
  });

module.exports = autherRouter;
