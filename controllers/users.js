const { Router } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const usersRouter = Router();

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate('notes', {
        content: 1,
        date: 1
      });
    res.json(users);
  } catch (error) {
    next(error); 
  }
});

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

usersRouter.use((error, req, res, next) => {
  error.type = `user_${error.errors.username.kind}`.toUpperCase();
  next(error);
});

module.exports = usersRouter;