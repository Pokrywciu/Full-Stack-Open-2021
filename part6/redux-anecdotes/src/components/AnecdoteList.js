import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () =>{

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
      }
    
      return (
        <div>
          <h2>Anecdotes</h2>
          {anecdotes.sort((a,b) => (a.votes >b.votes ?-1 :1)) &&
          anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
            
          )}
          </div>
      )}

export default AnecdoteList