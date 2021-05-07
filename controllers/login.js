const bcrypt = require('bcrypt');

const User = require('../models/User');

const { generateToken } = require('../helpers/jwt');

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const { _id: id, name } = user;
    const validPassword = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        error: 'Contraseña incorrecta.'
      });
    }

    const userToken = {
      id,
      username
    };
    const token = await generateToken(userToken);

    res.json({
      ok: true,
      user: {
        username,
        name,
        token
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  login
};
