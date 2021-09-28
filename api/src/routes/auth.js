const router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const usersController = require('../controllers/user.controller')

router.post('/login', passport.authenticate('local'), usersController.getUser)
router.post('/register', authController.registerUser)
router.post('/verify', authController.verifyToken)
router.get('/logout', authController.logout)
router.post('/invite', authController.sendInvite)
router.get('/invite/:token', authController.verifyInvite)

module.exports = router
