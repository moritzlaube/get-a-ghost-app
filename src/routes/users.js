const express = require('express')
const User = require('../models/user-model')
const Ghost = require('../models/ghost-model')

const router = express.Router()

// init test data start

// const michael = new User({
//   email: 'mchael@burnham.com',
//   firstName: 'Michael',
//   lastName: 'Burnham',
//   company: 'USS Discovery',
//   mobilePhone: '+1234565788',
//   profilePicture: 'https://www.gcloud.com/profile'
// })

// const alva = new User({
//   email: 'alva@gmail.com',
//   firstName: 'Alva',
//   lastName: 'Bocca',
//   company: 'Embassy',
//   mobilePhone: '+1234565788',
//   profilePicture: 'https://www.gcloud.com/profile'
// })

// const axel = new User({
//   email: 'axel@freese.com',
//   firstName: 'Axel',
//   lastName: 'Freese',
//   company: 'Lidl',
//   mobilePhone: '+1234565788',
//   profilePicture: 'https://www.gcloud.com/profile'
// })

// axel.save()
// alva.save()
// michael.save()

// init test data end


/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

module.exports = router
