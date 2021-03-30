
import React, { useState } from 'react'

const Button =(props)=>(
  <button onClick={props.choice}>{props.name}</button>
)
const Statistic=({text, value})=>(
  <div>  
      {text}: {value}
  </div>
)

const Statistics = ({good,neutral,bad})=>{
  let all=good+neutral+bad
  
  return(
  <div>
    
    <Statistic text="good" value={good}/>
    <Statistic text="neutral" value={neutral}/>
    <Statistic text="bad" value={bad}/>
    <Statistic text="all" value={all}/>
    <Statistic text="average" value={((good-bad)/all).toFixed(2)}/>
    <Statistic text="positive[%]" value={(good/all*100).toFixed(2)}/>
    
  </div>
  )
}
const Condition =(props)=>{
  if(props.all===0){
    return(
      <div>no given feedback</div>
    )
  }
  return(
    <Statistics good={props.good} neutral={props.neutral} bad={props.bad}/>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increasegood=()=>setGood(good+1)
  const increaseneutral=()=>setNeutral(neutral+1)
  const increasebad=()=>setBad(bad+1)

  let all=good+neutral+bad


  return (
    <div>
      <h1>give feedback</h1>
      <Button choice={increasegood} name="Good"/>
      <Button choice={increaseneutral} name="Neutral"/>
      <Button choice={increasebad} name="Bad"/>
      <h1>Statistics</h1>
      <Condition all={all} good={good} neutral={neutral} bad={bad}/>
      
     
    </div>
  )
}

export default App