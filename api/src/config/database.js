const mongoose = require('mongoose')

// if (process.env.NODE_ENV === 'development') mongoose.set('debug', true)

const connectionString = process.env.MONGODB_CONNECTION_STRING
const clientPromise = mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(m => m.connection.getClient())

module.exports = { clientPromise, db: mongoose.connection }
