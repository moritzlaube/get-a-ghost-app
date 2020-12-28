// const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')

function initTimezoneOffset() {
      return new Date().getTimezoneOffset() / 60
    }

const GhostSchema = new mongoose.Schema({
  schemaVersion: {
    type: Number,
    default: 1.0
  },
  email: String,
  firstName: String,
  lastName: String,
  proMembership: Boolean,
  occupation: String,
  mobilePhone: String,
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
  createdAt: {
    type: Date,
    default: null
  }
})

GhostSchema.pre('save', function (next) {
  let now = Date.now()
   
  this.updatedAt = now
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now
  }
  
  // Call the next function in the pre-save chain
  next()    
})

module.exports = mongoose.model('Ghost', GhostSchema)
