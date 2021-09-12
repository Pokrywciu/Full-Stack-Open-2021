const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Blog = require('../models/Blog')
const User = require('../models/User')


const blogsRouter = require('express').Router()

  
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    blog = {
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  })

  module.exports = blogsRouter
 