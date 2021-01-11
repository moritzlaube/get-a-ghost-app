const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  schemaVersion: {
    type: Number,
    default: 1.0,
  },
  email: String,
  firstName: String,
  lastName: String,
  company: String,
  proMembership: Boolean,
  mobilePhone: String,
  profilePicture: String,
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
    },
  ],
  createdAt: {
    type: Date,
    default: null,
  },
})

UserSchema.pre('save', function (next) {
  const now = Date.now()

  this.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now
  }

  // Call the next function in the pre-save chain
  next()
})

// const userSchema = new Schema({ email: String })
// class UserClass {
//   // `gravatarImage` becomes a virtual
//   get gravatarImage() {
//     const hash = md5(this.email.toLowerCase())
//     return `https://www.gravatar.com/avatar/${hash}`
//   }

//   // `getProfileUrl()` becomes a document method
//   getProfileUrl() {
//     return `https://mysite.com/${this.email}`
//   }

//   // `findByEmail()` becomes a static
//   static findByEmail(email) {
//     return this.findOne({ email })
//   }
// }

// // `schema` will now have a `gravatarImage` virtual, a `getProfileUrl()` method,
// // and a `findByEmail()` static
// userSchema.loadClass(UserClass)

module.exports = mongoose.model('User', UserSchema)
