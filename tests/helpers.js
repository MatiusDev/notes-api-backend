const supertest = require('supertest');

const { app } = require('../index');

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

module.exports = { 
  initialNotes,
  api
};