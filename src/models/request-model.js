/* eslint-disable lines-between-class-members */
const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
  ghost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ghost'
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  requestedDates: {
    requestedStartDate: {
      type: Date,
      default: true
    },
    requestedEndDate: {
      type: Date,
      default: true
    }
  },
  requestBody: String
})

module.exports = mongoose.model('Request', RequestSchema)
