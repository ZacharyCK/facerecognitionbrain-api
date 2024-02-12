// import bcrypt-nodejs
import bcrypt from 'bcrypt-nodejs'
// import cors
// import express
import express from 'express'
import cors from 'cors'
import knex from 'knex/knex.js'
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import handleImage from './controllers/image.js'
import handleProfile from './controllers/profile.js'

// create express app 
const app = express()

// parser for json
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
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
    handleSignin(req, res, db, bcrypt)
})

// register
app.post('/register',(req, res) => {
    handleRegister(req, res, db, bcrypt)
})

// profile
app.get('/profile/:id', (req, res) => {
   handleProfile(req, res, db)
}) 

// image
app.put('/image', (req, res) => {
    handleImage(req, res, db)
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

