require('dotenv').config();
// require('./mongo');

const express = require('express');
const cors = require('cors');
// const Note = require('./models/Note');

const { json } = express;

const app = express();
// Body-parser necesario para recibir argumentos en el body del POST
app.use(json());
app.use(cors());

const NOTES = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
];

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// app.get('/api/notes', (req, res) => {
//   const notes = new Note();
//   res.json(notes);
// });

app.get('/api/notes', (req, res) => {
  res.json(NOTES);
});

app.get('/api/notes/:id', (req, res) => {
  const id = +req.params.id;
  const note = NOTES.find(note => note.id === id);
  res.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});