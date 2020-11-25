const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = require('express').Router();
const User = require('../models/userModel');

userRouter
  .get('/login', async (request, response) => {
    const users = await User.find({});
    response.json(users);
  })
  .post('/login', async (request, response) => {
    const { body } = request;

    const user = await User.findOne({ username: body.username });
    const ifHashed = await bcrypt.compare(body.password, user.passwordHash);

    const passwordCorrect = user === null
      ? false
      : ifHashed;

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userForToken = {
      username: user.username,
      // eslint-disable-next-line no-underscore-dangle
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return response.status(200).send({ token, username: user.username, name: user.name });
  });
/* .post('/login', async (req, res) => {
    const { body } = req;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
  }); */

module.exports = userRouter;
