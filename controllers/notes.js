const { Router } = require('express');

const Note = require('../models/Note');
const User = require('../models/User');

const notesRouter = Router();

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note
      .find({})
      .populate('user', {
        username: 1,
        name: 1
      });
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
  const { 
    content, 
    important = false,
    userId 
  } = req.body;
  
  try {
    const user = await User.findById(userId);

    if (!content) {
      return res.status(400).json({
        err: 'No se ha recibido el contenido de la nota.'
      });
    }
    //Se usa user._id y no user.id porque aun no ha pasado por el toJSON: user.toJSON().id
    const newNote = new Note({
      content,
      date: new Date(),
      important: important,
      user: user._id
    });
    
    const savedNote = await newNote.save();

    user.notes = [...user.notes, savedNote._id];
    await user.save();
    res.status(201).json(savedNote);
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