const router = require('express').Router()
const ghostController = require('../controllers/ghost.controller')
const isAuthenticated = require('../middleware/is-authenticated')
const checkRole = require('../middleware/check-role')

/* GET ghost listing. */
router.get('/', ghostController.searchGhosts)

/* Init Ghosts in DB */
router.get('/init', ghostController.init)

/* GET ghost by id. */
router.get('/:id', isAuthenticated, ghostController.getGhostById)

/* POST request to ghost by id. */
router.post('/:id/request', isAuthenticated, checkRole('User'), ghostController.requestGhost)

/* CREATE new ghost. */
router.post('/', ghostController.createGhost)

/* UPDATE ghost. */
router.put('/:id', isAuthenticated, checkRole('Ghost'), ghostController.updateGhost)

module.exports = router
