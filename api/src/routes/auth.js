const router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/auth.controller')

router.post('/login', passport.authenticate('local'), authController.login)
router.post('/register', authController.register)
router.post('/verify', authController.verifyToken)
router.get('/logout', authController.logout)
router.post('/invite', authController.sendInvite)
router.get('/invite/:token', authController.verifyInvite)

module.exports = router
