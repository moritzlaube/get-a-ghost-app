const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

module.exports = new Promise((resolve, reject) => {
  resolve(mongoose.connection.getClient())
  reject(new Error('MongoClient Error'))
})
