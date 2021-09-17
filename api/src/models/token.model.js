const mongoose = require('mongoose')

const { Schema } = mongoose

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  verfied: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Token', tokenSchema)
