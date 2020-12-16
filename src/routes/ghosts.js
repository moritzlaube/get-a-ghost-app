const express = require('express')
const Ghost = require('../models/ghost-model')

const router = express.Router()

// init test data start
const ghosts = []

const moritz = new Ghost('ml@moritzlaube.com', 'Moritz', 'Laube', 'Ghostwriter', '01703301300')
// init test data end
ghosts.push(moritz)

/* GET ghosts listing. */
router.get('/', (req, res) => {
  res.send(ghosts)
})

module.exports = router
