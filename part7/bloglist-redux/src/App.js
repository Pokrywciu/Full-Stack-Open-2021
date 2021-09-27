import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { getBlogs, addBlog } from './reducers/blogReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

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

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blogObject)) 
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login" type="submit">login</button>
    </form>
  )

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])


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
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      <h2>blogs</h2>
      <Notification message={message}/>
      <Blog/>
    </div>
  )
}


export default App