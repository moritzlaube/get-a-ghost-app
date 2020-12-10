const { v4: uuidv4 } = require('uuid')
const Request = require('./request')

class User {
  id = uuidv4()

  #proMembership = false

  constructor(email, firstName, lastName, company, mobilePhone) {
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.company = company
    this.mobilePhone = mobilePhone
    this.requests = []
  }

  get proMembership() {
    return this.#proMembership
  }

  requestGhost(ghost, notification = '') {
    const request = new Request()
    request.ghost = ghost.id
    request.requestedBy = this.id
    request.requestNotification = notification
    this.requests.push(request)
  }
}

module.exports = User
