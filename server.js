// import express
const express = require('express')
// import bcrypt-nodejs
// const bcrypt = require('bcrypt-nodejs')
// import cors
const cors = require("cors")

// create express app 
const app = express()

// parser for json
app.use(express.json())
app.use(cors())

// database
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@aol.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@aol.com',
            password: 'brownies',
            entries: 0,
            joined: new Date()
        }
    ]
}

// route for root
app.get('/', (req, res) => {
    res.json(database.users)
})

// signin
app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0])
    } else {
        res.status(400).json('Error. Could not log in.')
    }
})

// register
app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

// profile
app.get('/profile/:id', (req, res) => {
    const {id} = req.params
    let found = false
    database.users.forEach(user => {
        if(user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if(!found) {
        res.status(400).json('User not found.')
    }
}) 

// image
app.put('/image', (req, res) => {
    const {id} = req.body
    let found = false
    database.users.forEach(user => {
        if(user.id === id) {
            found = true
            user.entries += 1
            return res.json(user.entries)
        }
    })
    if(!found) {
        res.status(400).json('User not found.')
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000!')
})

/*
/ --> res = This is working!
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid = GET = user
/image --> PUT --> user
*/

