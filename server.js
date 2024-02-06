// import bcrypt-nodejs
const bcrypt = require('bcrypt-nodejs')
// import cors
// import express
const express = require('express')
const cors = require("cors")
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// create express app 
const app = express()

// parser for json
app.use(express.json())
app.use(cors())

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'root',
      database : 'smartbrain'
    }
})

//db.select('*').from('users').then(response => {
//    console.log(response)
//})

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
    //res.json(database.users)
})

// signin
app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt)
})

// register
app.post('/register',(req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

// profile
app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
}) 

// image
app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
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

