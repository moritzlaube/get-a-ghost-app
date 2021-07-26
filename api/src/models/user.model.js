const { Schema } = require('mongoose')

const userSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  name: {
    first: String,
    last: String,
  },
  company: String,
  phone: String, // E.164 format -> npm package 'phone'
  address: {
    street: String,
    zip: String,
    country: String,
  },
})
