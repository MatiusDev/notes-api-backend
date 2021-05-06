const { Router } = require('express');

const Note = require('../models/Note');

const notesRouter = Router();

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    next(err);
  }
});
  
notesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).end();
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
});
  
notesRouter.post('/', async (req, res, next) => {
  const note = req.body;
  
  try {
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
    
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    next(err);
  }
});
  
notesRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { content, important } = req.body;
  
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { content, important }, { new: true });
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
});
  
notesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = notesRouter;