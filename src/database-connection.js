if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config()
}

const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://mongo/get-a-ghost'

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
