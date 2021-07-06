const express = require('express')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const userRouter = express.Router()
userRouter.get('/', async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})

userRouter.post('/', async (request, response) => {
  const newUser = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds)

  const blog = new User({
    username: newUser.username,
    name: newUser.name,
    passwordHash,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

userRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await User.findByIdAndDelete(id)
  response.status(204).end()
})

userRouter.put('/:id', async (request, response) => {
  const result = await User.updateOne(
    { _id: request.params.id },
    { $set: request.body }
  )
  response.status(200).json(result)
})

module.exports = userRouter
