const mongoose = require('mongoose')
const config = require('../utils/config')
const Blog = require('../models/Blog')
const { request } = require('http')
const { response } = require('express')
const { findByIdAndUpdate } = require('../models/Blog')

const blogsRouter = require('express').Router()


  
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
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
 