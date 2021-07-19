const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('./routes/users')

const app = express()

/* MIDDLEWARES */
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  })
)
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* ROUTES */
app.use('/users', usersRouter)

module.exports = app
