const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const helper = require('../utils/list_helper')
const api = supertest(app)


beforeAll(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 100000)
  })

describe('when the blog is posted', () => {
    test('blog is posted', async () => {
    const newBlog = {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    }, 100000)
  })

describe('deletion of blog', () => {
  test('blog is deleted', async () =>{
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete._id)

      await api 
        .delete(`/api/blogs/${blogToDelete._id}`)
        .expect(204)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length-1)
  },100000)
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
})



afterAll(() => {
  mongoose.connection.close()
})
