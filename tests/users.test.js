
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const { api, server, users: { getUsers } } = require('./helpers');

describe('Users tests', () => {
  beforeEach(async() => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User ({ 
      username: 'Tests',
      name: 'Tests Owner',
      passwordHash
    });
    await user.save();
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  test('Should expect a user created.', async () => {
    const usersAtStart = await getUsers();

    const newUser = { 
      username: 'Tests1',
      name: 'Tests Owner 1',
      password: 'test12345'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const usersAtEnd = await getUsers();
    const usernames = usersAtEnd.map(user => user.username);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(usernames).toContain(newUser.username);
  });
  
  test('Should not create a user and fails if username is already taken.', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'Tests',
      name: 'Tests Owner 2',
      password: 'test1234'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(500);
    
    const usersAtEnd = await getUsers();

    expect(response.body.error).toContain('El nombre de usuario ya existe.');
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

});
