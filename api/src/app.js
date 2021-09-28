const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const clientPromise = require('./config/database') // automatically connects to db through config/database.js

const Account = require('./models/account.model')

const ghostsRouter = require('./routes/ghosts')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

const cookie = {
  path: '/',
  httpOnly: true,
  sameSite: true,
  secure: false,
  maxAge: 14 * 24 * 60 * 60 * 1000,
}

const app = express()

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  cookie.secure = true // serve secure cookies
}

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // don't create session until something stored or until somone logged in
    resave: false, // don't save session if unmodified
    cookie,
    store: MongoStore.create({
      clientPromise,
    }),
  })
)

// Configure passport middleware
app.use(passport.initialize())
app.use(passport.session())

// use static authenticate method of model in LocalStrategy
passport.use(Account.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

/* ROUTES */
app.use('/ghosts', ghostsRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    ok: false,
    message: err.message,
    error: {},
  })
})

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1)
})

module.exports = app
