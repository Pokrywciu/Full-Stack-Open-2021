const Blog = require('../models/Blog')
const User = require('../models/User')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if (blogs.length === 1){
        const like = blogs[0].likes
        return like}

    else 
        return blogs.reduce((total, blog) => total + blog.likes,0)   
}

const favoriteBlog = (blogs) => {
    
    return blogs.reduce((blog1, blog2) =>
        blog2.likes > blog1.likes ? blog2 : blog1)
}

const initialBlogs = [
  {
    id: 2,
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    initialBlogs,
    blogsInDb,
    usersInDb,
  }