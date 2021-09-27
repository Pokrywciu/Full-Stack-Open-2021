import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        <h2>create new blog</h2>
        <p>title: <input id="title" value={title} onChange={handleTitleChange} /></p>
        <p>author: <input id="author" value={author} onChange={handleAuthorChange}/></p>
        <p>url: <input id="url" value={url} onChange={handleUrlChange}/></p>
      </div>
      <div>
        <button id="createButton" type="submit">save</button>
      </div>
    </form>
  )
}

export default BlogForm