const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')

function initTimezoneOffset() {
      return new Date().getTimezoneOffset() / 60
    }

const GhostSchema = mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  proMembership: Boolean,
  profession: String,
  mobilePhone: Number,
  profilePicture: String,
  aboutText: String,
  timezoneOffset: {
    type: Number,
    default: initTimezoneOffset
  },
  categories: Array,
  languages: Array,
  blockedDates: [{
    startBlockedDate: Date,
    endBlockedDate: Date
  }],
  portfolio: Array,
  ratings: Array,
  requests: Array,
  createdAt: { type: Date, default: Date.now }
})
// class Ghost {
//   id = uuidv4()

//   #proMembership = false

//   constructor(email, firstName, lastName, profession, mobilePhone) {
//     this.email = email
//     this.firstName = firstName
//     this.lastName = lastName
//     this.profession = profession
//     this.mobilePhone = mobilePhone
//     this.profilePicture = ''
//     this.aboutText = ''
//     this.categories = []
//     this.languages = []
//     this.blockedDates = []
//     this.portfolio = []
//     this.ratings = []
//     this.requests = []
//     this.accountCreated = Date.now()

//     this.initTimezoneOffset()
//   }

//   get proMembership() {
//     return this.#proMembership
//   }

//   initTimezoneOffset() {
//     this.timezoneOffset = new Date().getTimezoneOffset() / 60
//   }
// }

module.exports = mongoose.model('Ghost', GhostSchema)
