const express = require('express')
const User = require('../models/user-model')
const Ghost = require('../models/ghost-model')

const router = express.Router()

// init test data start
const users = []

const moritz = new Ghost('ml@moritzlaube.com', 'Moritz', 'Laube', 'Ghostwriter', '01703301300')
const embassy = new User('alex@embassy.de', 'Alex', 'Fischer', 'Embassy of Dreams', '01721234567')
embassy.requestGhost(moritz, "Hi, I'd like to request you!")
// init test data end

users.push(embassy)

/* GET users listing. */
router.get('/', (req, res) => {
  res.send(users)
})

module.exports = router
