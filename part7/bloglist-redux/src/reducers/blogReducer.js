import blogService from '../services/blogs'

const reducer = (state=[], action) => {
  switch (action.type){
  case 'GET_BLOGS':
    return action.data
  case 'ADD':
    return [...state, action.data]
  default:
    return state
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export default reducer