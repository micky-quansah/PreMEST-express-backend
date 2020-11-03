const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = require('express').Router();
const User = require('../models/userModel');

userRouter
  .get('/login', async (request, response) => {
    const users = await User.find({});
    response.json(users);
  })
  .delete('/login', (req, res) => {
    User.deleteMany();
    res.sendStatus(202);
  })
  .post('/login', async (req, res) => {
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
  });

module.exports = userRouter;
