require('dotenv').config();
require('./mongo');

const express = require('express');
const cors = require('cors');
//Middlewares
const handleError = require('./middlewares/handleError');
const notFound = require('./middlewares/notFound');
//Models
const Note = require('./models/Note');

const { json } = express;

const app = express();
// Body-parser necesario para recibir argumentos en el body del POST
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Notes API! <small>by TheMatius</small></h1>');
});

app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then(notes => res.json(notes))
    .catch(next);
});

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  
  Note.findById(id).then(note => {
    if (!note) {
      return res.status(404).end();
    }
    res.json(note);
  }).catch(next);
});

app.post('/api/notes', (req, res, next) => {
  const note = req.body;

  if (!note.content) {
    return res.status(400).json({
      err: 'No se ha recibido el contenido de la nota.'
    });
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  });
  
  newNote.save()
    .then(savedNote => res.json(savedNote))
    .catch(next);
});

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  const { content, important } = req.body;

  Note.findByIdAndUpdate(id, { content, important }, { new: true })
    .then(updatedNote => res.json(updatedNote))
    .catch(next);
});

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(next);
});

app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };