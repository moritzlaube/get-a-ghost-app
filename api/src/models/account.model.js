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
  isGhost: {
    type: Boolean,
    default: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: Number,
  verificationTokenExpire: Date,
})

accountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
})

module.exports = mongoose.model('Account', accountSchema)
