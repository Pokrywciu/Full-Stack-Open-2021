import React from 'react'
import { useSelector } from 'react-redux'
const Blog = () => {

  const blogs = useSelector(state => state)

  return(
    blogs.map(blog =>
      <div key={blog._id}> {blog.title} {blog.author}</div>)
  )}


export default Blog