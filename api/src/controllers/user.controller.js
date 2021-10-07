const User = require('../models/user.model')
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
  const { name, company, phone, email: newEmail } = req.body
  const user = await User.findById(req.user.profile.id)

  user.name = name
  user.company = company
  user.phone = phone

  const updatedUser = await user.save()

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
    try {
      await sendMail(newEmail, verificationPIN)
    } catch (error) {
      console.error('Sendgrid Error', error.message)
    }
  }

  res.status(200).json({ ok: true, data: req.session })
}
