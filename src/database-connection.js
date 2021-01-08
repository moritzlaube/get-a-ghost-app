if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config()
}

const mongoose = require('mongoose')

const dbName = process.env.MONODB_DATABASE
const host = process.env.MONODB_HOST
const port = process.env.MONGODB_PORT

const connectionString = process.env.MONGODB_REMOTE_URI
  ? process.env.MONGODB_REMOTE_URI
  : `mongodb://${host}:${port}/${dbName}`

mongoose.set('debug', true)

module.exports = mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection established!'))
  .catch(console.error)

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', () => {
//   console.log('Connected!')
// })
