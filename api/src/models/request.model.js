const mongoose = require('mongoose')

const { Schema } = mongoose

const requestSchema = new Schema(
  {
    // remove word request
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    requestedGhost: {
      type: Schema.Types.ObjectId,
      ref: 'Ghost',
    },
    requestedDates: {
      start: Date,
      end: Date,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Request', requestSchema)
