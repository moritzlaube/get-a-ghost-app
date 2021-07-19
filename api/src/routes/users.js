const express = require('express')
const ghostController = require('../controllers/ghost.controller')

const router = express.Router()

/* GET users listing. */
router.get('/', ghostController.getAllGhosts)

/* GET users listing. */
router.post('/', ghostController.createGhost)

module.exports = router
