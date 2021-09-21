import React from 'react'
const Blog = ({ blog,key }) => (
  <li key={key}>
    {blog.title} {blog.author}
  </li>
)

export default Blog