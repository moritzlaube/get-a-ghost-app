const express = require('express')
const User = require('../models/user-model')

const router = express.Router()

// init test data start

// const danny = new User({
//   email: 'mchael@burnham.com',
//   firstName: 'Michael',
//   lastName: 'Burnham',
//   company: 'USS Discovery',
//   mobilePhone: '+1234565788',
//   profilePicture: 'https://www.gcloud.com/profile'
// })

// const sophie = new User({
//   email: 'alva@gmail.com',
//   firstName: 'Alva',
//   lastName: 'Bocca',
//   company: 'Embassy',
//   mobilePhone: '+1234565788',
//   profilePicture: 'https://www.gcloud.com/profile'
// })

// const markus = new User({
//   email: 'axel@freese.com',
//   firstName: 'Axel',
//   lastName: 'Freese',
//   company: 'Lidl',
//   mobilePhone: '+1234565788',
//   profilePicture: 'https://www.gcloud.com/profile'
// })

// markus.save()
// sophie.save()
// danny.save()

// init test data end

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

module.exports = router
