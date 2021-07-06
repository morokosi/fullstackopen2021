const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
test('return empty', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(0)
})
test('add post', async () => {
  const newBlog = {
    title: 'hoge',
    author: 'me',
    url: 'https://www.example.com',
    likes: 100,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(1)
})
afterAll(async () => {
  await mongoose.connection.close()
})
