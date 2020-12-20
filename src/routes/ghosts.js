const express = require('express')
const Ghost = require('../models/ghost-model')

const router = express.Router()

// init test data start
const ghosts = []

const moritz = new Ghost({
  email: 'ml@moritzlaube.com',
  firstName: 'Moritz',
  lastName: 'Laube'
})

moritz.save().then('ghost saved')

// init test data end


/* GET ghosts listing. */
router.get('/', (req, res) => {
  res.send(ghosts)
})

module.exports = router
