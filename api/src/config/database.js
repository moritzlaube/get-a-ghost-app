const mongoose = require('mongoose')

const db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

module.exports = new Promise(function (resolve, reject) {
  resolve(mongoose.connection.getClient())
  reject(new Error('MongoClient Error'))
})
