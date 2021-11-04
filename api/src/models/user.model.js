const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
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
    company: String,
    countryCode: String,
    phone: String, // E.164 format -> npm package 'phone'
    address: {
      street: String,
      zip: String,
      country: String,
    },
    requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
)

userSchema.virtual('initials').get(function () {
  return this.name.first.charAt(0).toUpperCase() + this.name.last.charAt(0).toUpperCase()
})

module.exports = mongoose.model('User', userSchema)
