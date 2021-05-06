const mongoose = require('mongoose');

const Note = require('../models/Note');

const { api, server, initialNotes } = require('./helpers');


describe('Notes testing', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    
    let note = {};
    for (const noteContent of initialNotes) {
      note = new Note(noteContent);
      await note.save();
    }
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  test('Should return a response as a JSON.', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Should return the length of initialNotes.', async () => {
    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(initialNotes.length);
  });
  
  test('Should return all notes and contain the content of one item.', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(note => note.content);
    expect(contents).toContain(initialNotes[0].content);
  });

  test('Should return a specific note by id.', async () => {
    const response = await api.get('/api/notes');
    const firstNote = response.body[0];
    const reponseByID = await api.get(`/api/notes/${firstNote.id}`);
    expect(reponseByID.body.content).toBe(firstNote.content);
  });

  test('Should return error 400 for invalid id on getByID', async () => {
    await api
      .get('/api/notes/1234')
      .expect(400);
  });

  test('Should add a valid note', async () => {
    const newNote = {
      content: 'Nota agregada desde tests.',
      important: true
    };

    const response = await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.id).toBeDefined();

    const responseByID = await api.get(`/api/notes/${response.body.id}`);
    expect(responseByID.body.content).toBe(response.body.content);
  });

  test('Should return error if note has no content', async () => {
    const newNote = {
      important: true
    };
  
    const response = await api
      .post('/api/notes')
      .send(newNote)
      .expect(400);
    
    expect(response.body.err).toBe('No se ha recibido el contenido de la nota.');
  });

  test('Should update a note sucessfully', async () => {
    const response = await api.get('/api/notes');
    const firstNote = response.body[0];
    const newNote = {
      content: 'Cambiando contenido de nota en tests.',
      important: false
    };

    const responseUpdate = await api
      .put(`/api/notes/${firstNote.id}`)
      .send(newNote)
      .expect(200);
    
    expect(responseUpdate.body.content).toBe(newNote.content);
    expect(responseUpdate.body.important).toBe(newNote.important);
  });
  
  test('Should return status code 204 if a note can be deleted.', async () => {
    let response = await api.get('/api/notes');
    const firstNote = response.body[0];

    await api
      .delete(`/api/notes/${firstNote.id}`)
      .expect(204);

    response = await api.get('/api/notes');
    expect(response.body).toHaveLength(initialNotes.length - 1);
  });

  test('Should return status code 400 if a note does not exist in DB.', async () => {
    await api
      .delete('/api/notes/12345')
      .expect(400);
    
    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(initialNotes.length);  
  });
});
