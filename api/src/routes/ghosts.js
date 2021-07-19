const express = require('express')
const ghostController = require('../controllers/ghost.controller')

const router = express.Router()

/* GET ghost listing. */
router.get('/', ghostController.getAllGhosts)

/* GET ghost by id. */
router.get('/:id', ghostController.getGhostById)

/* CREATE new ghost. */
router.post('/', ghostController.createGhost)

/* UPDATE ghost. */
router.put('/:id', ghostController.updateGhost)

module.exports = router
