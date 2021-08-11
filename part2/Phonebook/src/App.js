import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Contact from './components/Contact'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'

const App = () => {
  const [person, setPerson] = useState([])
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState()
  const [ newNumber, setNewNumber]=useState()
  const [filtr, setFiltr]=useState()

  const hook = () =>{
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        console.log('promise fulfilled')
        setPerson(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', person.length, 'persons')

  const addPerson=(event)=>{
    event.preventDefault()
    const nameObject={
      name: newName,
      number: newNumber,
      id: persons.length+1,
    }
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewNumber("")
  }


  const nameToShow=(persons.find(name=>name.name===newName))
  ? (window.alert(`${newName} is already added to your phonebook`),
   persons)
  :  persons

 

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  const handleSearchChange=(event)=>{
    setFiltr(event.target.value)
  }
 
  const filtredPerson=person.filter(item=>item.name.toLowerCase().includes(filtr))
  
  const short = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    handleSearchChange,
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search:</h2>
        <Filter filtr={filtr} short={short}/>
      <h2>Add New:</h2>
          <ContactForm addPerson={addPerson} short={short}/>
      <h2>Numbers</h2>
      <ul>
          <Contacts contacts={filtr ? filtredPerson :person}/>
      </ul>
    </div>
  )
}

export default App