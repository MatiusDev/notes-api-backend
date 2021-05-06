const supertest = require('supertest');

const User = require('../models/User');

const { app, server } = require('../index');

const api = supertest(app);

const initialNotes = [
  {
    content: 'Mi nueva nota desde los tests',
    important: true,
    date: new Date()
  },
  {
    content: 'Segunda nota probando los test',
    important: true,
    date: new Date()
  },
  {
    content: 'Probando test con una nota adicional',
    important: true,
    date: new Date()
  }
];

const getUsers = async () => {
  const usersDB = await User.find({});
  return usersDB.map(user => user.toJSON());
};

module.exports = { 
  initialNotes,
  api,
  server,
  users: {
    getUsers
  }
};