/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const { Schema } = mongoose

const accountSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    refPath: 'role',
    autopopulate: true,
  },
  role: {
    type: String,
    enum: ['User', 'Ghost'],
  },
  isGhost: {
    type: Boolean,
    default: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: Number, // possible candidate for index (index: true)
  verificationTokenExpire: Date,
})

accountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
})
accountSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Account', accountSchema)
