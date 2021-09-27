const router = require('express').Router()
const isAuthenticated = require('../middleware/is-authenticated')
const userController = require('../controllers/user.controller')

router.get('/me', isAuthenticated, userController.getUser)

module.exports = router
