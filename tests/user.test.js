/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../index');

describe('/users', () => {
  it('POST : passing correct body', async () => {
    const payload = {
      username: 'test@gmail.com',
      password: 'usersPassword!',
    };
    await supertest(app).post('/login').send(payload).expect(200);
  });
});
