const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const app = express()

// Enable CORS requests for the origin
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

dotenv.config()
const { HOST, PORT } = require('./config')
const { routes, adminRoutes, publicRoutes } = require('../routes')
const passport = require('passport')
require('../db').connection

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('../auth/passportAuth')(passport)
app.use('/api/v1', routes())
app.use('/api/v1/admin', adminRoutes())
app.use('/api/v1', publicRoutes())

app.listen(PORT, HOST, (err) => {
  if (err) console.log(err)
  else console.log(`Running on ${HOST}:${PORT}`)
})
