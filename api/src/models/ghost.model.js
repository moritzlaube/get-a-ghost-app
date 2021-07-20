/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const { Schema } = mongoose

const ghostSchema = new Schema(
  {
    type: [
      {
        type: String,
        enum: ['moodscout', 'ghostwriter'],
      },
    ],
    name: {
      first: String,
      last: String,
    },
    blocked: [{ start: Date, end: Date }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' },
  }
)

ghostSchema.virtual('getEssentialData').get(function () {
  return {
    id: this._id,
    name: `${this.name.first} ${this.name.last}`,
    type: this.type,
  }
})

module.exports = mongoose.model('Ghost', ghostSchema)
