/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const { Schema } = mongoose

const accountSchema = new Schema({
  role: {
    type: Schema.Types.ObjectId,
    refPath: 'roleModel',
  },
  roleModel: {
    type: String,
    enum: ['User', 'Ghost'],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
})

accountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  // populateFields: 'invoices',
})

module.exports = mongoose.model('Account', accountSchema)
