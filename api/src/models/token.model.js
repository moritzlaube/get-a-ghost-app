const mongoose = require('mongoose')

const { Schema } = mongoose

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  expires: { type: Date, expires: '3d', default: Date.now },
})

module.exports = mongoose.model('Token', tokenSchema)
