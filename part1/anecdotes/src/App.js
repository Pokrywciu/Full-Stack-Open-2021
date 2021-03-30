import React, { useState } from 'react'

const Button =(props)=>(
  <div>
  <button onClick={props.handleClick}>{props.text}</button>
  </div>
)
const Display =(props)=>{
  if(props.counter===0){
    return(
      <div>Click the button</div>
    )
  }
  return(
    <div>{props.anecdote}
      <p>Has {props.vote} Votes.</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  
  const [selected, setSelected] = useState(0)
  const [points, setPoints]=useState(new Uint8Array(anecdotes.length))
  const [vote, setVote]= useState(0)
  const [counter, setCounter] = useState(0)
  
  const clickRandom=()=>{
    setSelected(Math.floor(Math.random()*anecdotes.length))
    setCounter(counter+1)
  }
  
  const clickVote=()=>{
    const copy=[...points]
    copy[selected]+=1
    setPoints(copy)
  }
  console.log(Math.max(...points))
  return (
    <div>
      <h1>Anecdote: </h1>
      <Display counter={counter} anecdote={anecdotes[selected]} vote={points[selected]}/>
      <Button handleClick={clickRandom} text="random anecdotes"/>
      <Button handleClick={clickVote} text="vote"/>
      <h1>Anecdote with the most votes</h1>
      <Display counter={counter} vote={Math.max(...points)} anecdote={anecdotes[points.indexOf(Math.max(...points))]}/>
      
    </div>
  )
}

export default App