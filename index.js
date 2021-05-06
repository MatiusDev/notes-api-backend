require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');
//Middlewares
const handleError = require('./middlewares/handleError');
const notFound = require('./middlewares/notFound');
//Controllers
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');

const { json } = express;

const app = express();
// Body-parser necesario para recibir argumentos en el body del POST
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Notes API! <small>by TheMatius</small></h1>');
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };