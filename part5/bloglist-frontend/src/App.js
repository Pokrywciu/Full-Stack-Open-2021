import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
        .then(returnedBlog =>{
          setMessage({
            text: `Added ${title}`,
            type: "success"
          })
          setTimeout(()=>{
            setMessage(null)
          },3000)
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
        })
  }

  const handleLogout = async (event) =>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleTitleChange = (event) =>{
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) =>{
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) =>{
    setUrl(event.target.value)
  }

  const short = {
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      <p>{user.name} logged-in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} short={short}/>
      </Togglable>
      <h2>blogs</h2>
      <Notification message={message}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}


export default App