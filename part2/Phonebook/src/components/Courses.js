import React from 'react'
const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const total=parts.reduce((s,p)=>s+p.exercises,0)
    return(
      <p>Number of exercises {total}</p>
    ) 
  }
  const Part = ({part}) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
       </p>
      </div>
    )
  }
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part)=>(
          <Part key={part.id} part={part}/>
        ))}
       
      </div>
      
    )
  }
  const Course = ({course})=>{
    return(
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  const Courses=({courses})=>{
    return(
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course=>(
          <Course key={course.id} course={course}/>
        ))}
      </div>
    )
  }
  export default Courses