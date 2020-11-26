const express = require('express');
const jwt = require('jsonwebtoken');

const tokenVarify = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// eslint-disable-next-line consistent-return
tokenVarify.use((req, res, next) => {
  const token = getTokenFrom(req);

  let decodedToken;
  try {
    // eslint-disable-next-line no-unused-vars
    decodedToken = jwt.verify(token, process.env.SECRET);
    req.body.token = decodedToken;
    next();
  } catch (e) {
    // if an error occured return request unauthorized error
    return res.status(401).send('token missing or invalid');
  }
});

module.exports = tokenVarify;
