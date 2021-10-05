const router = require('express').Router()
const isAuthenticated = require('../middleware/is-authenticated')
const userController = require('../controllers/user.controller')

// GET active user
router.get('/me', isAuthenticated, userController.getUser)

// UPDATE active user
router.put('/me', isAuthenticated, userController.updateUser)

module.exports = router
