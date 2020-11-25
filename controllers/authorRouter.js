const express = require('express');
const Author = require('../models/authorModel');

const autherRouter = express.Router();

autherRouter
  .get('/', async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
  });

autherRouter.use('/author/:authorId', (req, res, next) => {
  Author.findById(req.params.authorId, (err, author) => {
    if (err) {
      return res.send(err);
    }
    if (author) {
      req.author = author;
      return next();
    }
    return res.sendStatus(404);
  });
});

autherRouter
  .get('/author/:authorId', (req, res) => {
    res.json(req.author);
  });

module.exports = autherRouter;
