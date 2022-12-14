const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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

app.get('/info', (req, res) => {
    let today = new Date()
    res.send(`<p>Phonebook has info for ${people.length} people</p><p>${today}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log('persons', persons)
    persons = persons.filter(person => person.id != id)

    res.status(204).end() // 204 no content
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * Math.pow(10, 6))

    const person = req.body
    person.id = id

    if ( !person.hasOwnProperty('name') || !person.hasOwnProperty('number') ) {
        res.status(400).json({
            error: 'content missing'
        })
    }
    
    if (persons.filter(p => p.name.toLowerCase() === person.name.toLowerCase())) {
        res.status(400).json({
            error: 'name already exists'
        })
    }

    persons.push(person)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})