const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

module.exports = mongoose.connection.getClient()
