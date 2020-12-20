const express = require('express')
const User = require('../models/user-model')
const Ghost = require('../models/ghost-model')

const router = express.Router()

// init test data start
const users = []



// init test data end


/* GET users listing. */
router.get('/', (req, res) => {
  res.send(users)
})

module.exports = router
