const express = require('express')
const User = require('../models/user-model')

const router = express.Router()

// init test data
router.get('/init', async (req, res) => {
  await User.create({
    email: 'axel@freese.com',
    firstName: 'Axel',
    lastName: 'Freese',
    company: 'Lidl',
    mobilePhone: '+1234565788',
    profilePicture: 'https://www.gcloud.com/profile',
  })

  await User.create({
    email: 'alva@gmail.com',
    firstName: 'Alva',
    lastName: 'Bocca',
    company: 'Embassy',
    mobilePhone: '+1234565788',
    profilePicture: 'https://www.gcloud.com/profile',
  })

  await User.create({
    email: 'mchael@burnham.com',
    firstName: 'Michael',
    lastName: 'Burnham',
    company: 'USS Discovery',
    mobilePhone: '+1234565788',
    profilePicture: 'https://www.gcloud.com/profile',
  })

  res.send('Users initialized')
})

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

module.exports = router
