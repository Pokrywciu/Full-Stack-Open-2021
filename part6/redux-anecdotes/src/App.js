import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { useDispatch } from 'react-redux'
import { getAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAnecdotes())
  }, [dispatch])

  return(
    <div>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App