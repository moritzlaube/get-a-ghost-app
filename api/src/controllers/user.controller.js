const User = require('../models/user.model')
const Ghost = require('../models/ghost.model')
const Account = require('../models/account.model')
const { getRandomInt } = require('../services/auth.service')
const sendMail = require('../services/mail.service')

/* eslint-disable no-underscore-dangle */
exports.getUser = (req, res) => {
  res.status(200).json({
    ok: true,
    data: req.user,
  })
}

exports.updateUser = async (req, res) => {
  // destructure info from frontend and then mutate Object by user[key] = value
  const { name, company = null, ghostName = null, phone, email: newEmail } = req.body

  let user

  if (req.user.isGhost) {
    user = await Ghost.findById(req.user.profile.id)
    user.ghostName = ghostName
  } else {
    user = await User.findById(req.user.profile.id)
    user.company = company
  }

  user.name = name
  user.phone = phone

  await user.save()

  if (req.user.email !== newEmail) {
    const verificationPIN = getRandomInt(1000, 9999)
    const account = await Account.findByUsername(req.user.email)
    account.email = newEmail
    account.emailVerified = false
    account.verificationToken = verificationPIN
    account.verificationTokenExpire = new Date(Date.now() + 1000 * 3600 * 24)
    await account.save()

    req.session.passport.user = newEmail
    req.session.save()

    // Send mail via SG with PIN to verify email
    const subject = '👻 You successfully changed your email address'
    const html = `Please verify your new email address with the following pin: ${verificationPIN}`

    try {
      await sendMail(newEmail, subject, html)
    } catch (error) {
      console.error('Sendgrid Error', error.message)
    }
  }

  res.status(200).json({ ok: true, message: 'Successfully updated user' })
}
