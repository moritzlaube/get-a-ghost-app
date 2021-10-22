/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const { Schema } = mongoose

const ghostSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    active: {
      type: Boolean,
      default: false,
    },
    type: [
      {
        type: String,
        enum: ['moodscout', 'ghostwriter'],
        lowercase: true,
        trim: true,
      },
    ],
    name: {
      first: {
        type: String,
        trim: true,
      },
      last: {
        type: String,
        trim: true,
      },
    },
    ghostName: {
      type: String,
      default() {
        return `${this.name.first} ${this.name.last}`
      },
    },
    phone: String, // E.164 format -> npm package 'phone'
    address: {
      street: String,
      zip: String,
      country: String,
    },
    website: String,
    categories: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    about: {
      type: String,
      trim: true,
    },
    timezone: String,
    languages: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    blocked: [{ start: Date, end: Date }],
    // requests: [{ type: Schema.Types.ObjectId, ref: Request }],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
)

ghostSchema.virtual('initials').get(function () {
  return this.name.first.charAt(0).toUpperCase() + this.name.last.charAt(0).toUpperCase()
})

module.exports = mongoose.model('Ghost', ghostSchema)
