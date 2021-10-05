const router = require('express').Router()
const ghostController = require('../controllers/ghost.controller')
const isAuthenticated = require('../middleware/is-authenticated')
const checkRole = require('../middleware/check-role')

/* GET ghost listing. */
router.get('/', ghostController.getAllGhosts)

/* Init Ghosts in DB */
router.get('/init', ghostController.init)

/* GET ghost by id. */
router.get('/:id', isAuthenticated, ghostController.getGhostById)

/* POST request to ghost by id. */
router.post('/:id/request', isAuthenticated, ghostController.requestGhost)

/* CREATE new ghost. */
router.post('/', isAuthenticated, checkRole('Ghost'), ghostController.createGhost)

/* UPDATE ghost. */
router.put('/:id', isAuthenticated, checkRole('Ghost'), ghostController.updateGhost)

module.exports = router
