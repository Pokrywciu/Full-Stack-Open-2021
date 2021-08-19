require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')



app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('post', (request) => {
  if (request.method === 'POST')
    return(JSON.stringify(request.body))
  else
    return('')
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Wellcome to backend Phonebook!</h1>')
})

app.get('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(persons=>persons.id===id)

    if (person){
        response.send(person)
    }
    else{
        response.status(404).end()
    }
})

app.get('/info', (request, response)=>{
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p>`+ date)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person=>{
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person=>person.id!==id)
    response.status(204).end()
})

app.post('/api/persons', (request, response)=>{
    const number_of_id = 10000
    const generateID = Math.floor(Math.random()*number_of_id)
    const body = request.body

    if(!body.name){
      return response.status(400).json({
        error: 'Name missing'
      })
    }
    if(!body.number){
      return response.status(400).json({
        error: 'Number missing'
      })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateID,
    })

    /*if(persons.find(n=>n.name===person.name)){
      return response.status(400).json({
        error: 'Name must be unique'
      })
    }
    else
      {persons = persons.concat(person)
      response.json(person)} */
    person.save().then(savedPerson=>{
      response.json(savedPerson)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})