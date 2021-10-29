const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('connection established'))
  .catch(err => {
    console.error(err)
  })

const clientPromise = mongoose.connection.asPromise().then(connection => connection.getClient())

module.exports = clientPromise
