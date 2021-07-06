const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = express.Router()
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const user = await User.findOne({})
  console.log(user)
  const blog = new Blog({ ...request.body, user: user._id })
  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const result = await Blog.updateOne(
    { _id: request.params.id },
    { $set: request.body }
  )
  response.status(200).json(result)
})

module.exports = blogRouter
