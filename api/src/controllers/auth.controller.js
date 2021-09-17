/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const Account = require('../models/account.model')
const User = require('../models/user.model')
const Token = require('../models/token.model')
const authService = require('../services/auth.service')

exports.login = async (req, res) => res.status(200).json({ ok: true, data: req.user })

exports.register = async (req, res) => {
  const { email, password, company, name } = req.body

  try {
    // create Account with barebones info.
    const createdAccount = await Account.register(
      {
        email,
        roleModel: 'User',
        verificationToken: authService.getRandomInt(1000, 9999),
        verificationTokenExpire: new Date(Date.now() + 1000 * 3600 * 24),
      },
      password
    )
    // TODO: send verificationToken to email via Sendgrid

    const createdUser = await User.create({
      account: createdAccount._id,
      name,
      company,
    })

    createdAccount.role = createdUser._id
    await createdAccount.save()

    return req.login(createdAccount, err => {
      if (err) throw new Error(err)
      return res.status(200).json({ ok: true, data: { id: createdAccount._id } })
    })
  } catch (error) {
    return res.status(500).json({ ok: false, data: error })
  }
}

// TODO: Verify Token
exports.verifyToken = async (req, res) => {
  const { token } = req.body
  const verifiedAccount = await Account.findOne({ verificationToken: token })

  if (verifiedAccount !== null) {
    verifiedAccount.emailVerified = true
    await verifiedAccount.save()
  }

  return res.status(200).json({ ok: true, data: verifiedAccount })
}

exports.logout = (req, res) => {
  try {
    req.logout()
    return res.status(200).json({ ok: true, data: req.user })
  } catch (err) {
    return res.status(500).json({ ok: false, data: err })
  }
}

exports.getUser = (req, res) => {
  return res.status(200).json({ ok: true, data: req.user })
}

exports.sendInvite = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  if (token !== process.env.BEARER_TOKEN) return res.status(401).json({ ok: false, message: 'Unauthorized' })

  const { email } = req.body

  const signedToken = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  const t = new Token({
    token: signedToken,
  })

  await t.save()

  return res.status(200).json({ ok: true, data: { token: signedToken } })
}

exports.verifyInvite = async (req, res) => {
  const { token } = req.params

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const hasAccount = await Account.exists({ email })
    const hasToken = await Token.exists({ token })
    if (!hasToken || hasAccount)
      return res.status(404).json({ ok: false, message: 'Wrong Token or Account with that email already exists' })

    const token = await Account.find({ token })
    token.verfied = true
    await token.save()

    return res.status(200).json({ ok: true, data: { email }, message: 'Token verified' })
  } catch (error) {
    return res.status(401).json({ ok: false, data: error })
  }
}
