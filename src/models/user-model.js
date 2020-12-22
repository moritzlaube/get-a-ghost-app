const mongoose = require('mongoose')
const Request = require('./request-model')

const UserSchema = mongoose.Schema({
  schemaVersion: {
    type: Number,
    default: 1.0
  },
  email: String,
  firstName: String,
  lastName: String,
  company: String,
  proMembership: Boolean,
  mobilePhone: String,
  profilePicture: String,
})

// class User {
//   id = uuidv4()

//   #proMembership = false

//   constructor(email, firstName, lastName, company, mobilePhone) {
//     this.email = email
//     this.firstName = firstName
//     this.lastName = lastName
//     this.company = company
//     this.mobilePhone = mobilePhone
//     this.requests = []
//   }

//   get proMembership() {
//     return this.#proMembership
//   }

//   requestGhost(ghost, notification = '') {
//     const request = new Request()
//     request.ghost = ghost.id
//     request.requestedBy = this.id
//     request.requestNotification = notification
//     this.requests.push(request)
//   }
// }

module.exports = mongoose.model('User', UserSchema)
