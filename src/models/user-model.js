const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
  requests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],
  createdAt: {
    type: Date,
    default: null
  }
})

UserSchema.pre('save', function (next) {
  let now = Date.now()
   
  this.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now
  }
  
  // Call the next function in the pre-save chain
  next()    
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
