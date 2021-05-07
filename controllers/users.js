const bcrypt = require('bcrypt');

const User = require('../models/User');

const getAll = async (req, res, next) => {
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
};

const create = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  create
};