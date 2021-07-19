const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

const { db } = require('./config/database')
const ghostsRouter = require('./routes/ghosts')

/* CONNECT TO MONGODB */
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB!')
})

const app = express()

/* MIDDLEWARES */
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  })
)
app.use(mongoSanitize())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json({ limit: '12kb' }))
app.use(express.urlencoded({ extended: false }))

/* ROUTES */
app.use('/ghosts', ghostsRouter)

module.exports = app
