import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Find from './components/Find'
import Country from './components/Country'
import Countries from './components/Countries'

const App = () =>{

  const [countries, setCountries] = useState([])
  const [find, setFind] = useState()

  const hook = () =>{
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response=>{
      console.log('fulfilled')
      setCountries(response.data)
    })
  }
  useEffect(hook, [])
  console.log('render', countries.length, 'countries')

  const handleSearchChange =(event)=>{
    setFind(event.target.value)
  }
  const short = {
    handleSearchChange
  }
  const filtredCountries=countries.filter(item=>item.name.toLowerCase().includes(find))

  

  return(
    <div>
      <h1>Data for countries</h1>
      <Find filtr={find} short={short}/>
      <Countries countries={find ? filtredCountries : countries} />
    </div>
  )
}

export default App;
