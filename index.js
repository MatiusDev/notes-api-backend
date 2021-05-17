require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');
//Middlewares
const handleError = require('./middlewares/handleError');
const notFound = require('./middlewares/notFound');
//Controllers
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const { json } = express;

const app = express();

//Start Middlewares
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Notes API! <small>by TheMatius</small></h1>');
});
//Routes
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);
//End Middlewares
app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };