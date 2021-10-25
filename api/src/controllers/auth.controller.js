/* eslint-disable no-underscore-dangle */
const pug = require('pug')
const path = require('path')

const { verifyJWT, signJWT, getRandomInt } = require('../services/auth.service')
const sendMail = require('../services/mail.service')

const Account = require('../models/account.model')
const User = require('../models/user.model')
const Token = require('../models/token.model')

/* **************
  REGISTER USER
************** */

exports.registerUser = async (req, res) => {
  /**
   * @typedef {object} req.body
   * @property {string} email
   * @property {string} password
   * @property {string} company
   * @property {object} name
   * @property {string} name.first
   * @property {string} name.last
   */
  /** @type {req.body} */
  const { email, password, company, name, phone } = req.body
  const verificationPIN = getRandomInt(1000, 9999)

  try {
    // Create new Account instance
    const createdAccount = await Account.register(
      {
        email,
        role: 'User',
        verificationToken: verificationPIN,
        verificationTokenExpire: new Date(Date.now() + 1000 * 3600 * 24 * 3),
      },
      password
    )

    // Create a new User instance and link it to new Account
    const createdUser = await User.create({
      account: createdAccount._id,
      name,
      company,
      phone,
    })

    // Link new User to new Account
    createdAccount.profile = createdUser._id
    await createdAccount.save()

    // Send mail via SG with PIN to verify email
    const subject = '👻 Welcome to Get A Ghost!'
    const html = pug.renderFile(path.join(__dirname, '../', 'templates', 'verification.pug'), {
      verificationPIN,
      firstName: name.first,
    })

    try {
      await sendMail(email, subject, html)
    } catch (error) {
      console.error('Sendgrid Error', error.message)
    }

    return res.status(200).json({ ok: true, data: { id: createdAccount._id } })
  } catch (error) {
    return res.status(500).json({ ok: false, data: error })
  }
}

/* **************
  VERIFY EMAIL
************** */

exports.verifyToken = async (req, res) => {
  const { pin } = req.body

  try {
    const verifiedAccount = await Account.findOne({ verificationToken: pin })

    if (verifiedAccount === null) return res.status(404).json({ ok: false, message: 'No Account with this PIN' })
    if (verifiedAccount.emailVerified) return res.status(409).json({ ok: false, message: 'Email already verified' })

    verifiedAccount.emailVerified = true
    await verifiedAccount.save()

    return res.status(200).json({ ok: true, message: 'Email verified' })
  } catch (err) {
    return res.status(500).json({ ok: false, data: err })
  }
}

/* **************
  LOGOUT USER
************** */

exports.logout = (req, res) => {
  try {
    req.logout()
    return res.status(200).json({ ok: true, data: req.user })
  } catch (err) {
    return res.status(500).json({ ok: false, data: err })
  }
}

/* *******************
  SEND INVITE TO GHOST
******************* */

exports.sendInvite = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  if (token !== process.env.BEARER_TOKEN) return res.status(401).json({ ok: false, message: 'Unauthorized' })

  const { email, firstName, lastName } = req.body

  const signedToken = signJWT(email, firstName, lastName)

  const t = new Token({
    token: signedToken,
  })

  await t.save()

  const subject = '👻 Welcome to Get-A-Ghost!'
  const html = pug.renderFile(path.join(__dirname, '../', 'templates', 'invite.pug'), {
    firstName,
    signedToken,
    baseUrl: process.env.BASE_URL,
  })

  try {
    await sendMail(email, subject, html)
  } catch (error) {
    console.log(error)
  }

  return res.status(200).json({ ok: true, data: { token: signedToken } })
}

/* ******************
  VERIFY GHOST INVITE
****************** */

exports.verifyInvite = async (req, res) => {
  const { token } = req.params
  const hasToken = await Token.exists({ token })
  if (!hasToken)
    return res.status(404).json({
      ok: false,
      message:
        "We don't have your token in our database. It might be wrong or expired. Please send us an email and require a new one.",
    })

  let email
  let firstName
  let lastName

  try {
    ;({ email, firstName, lastName } = verifyJWT(token))
  } catch (error) {
    return res
      .status(404)
      .json({ ok: false, message: 'Your Token expired. Please send us an email and require a new one.' })
  }

  const hasAccount = await Account.exists({ email })

  if (hasAccount)
    return res
      .status(409)
      .json({ ok: false, message: 'You already have an account. Please login and fill out your profile.' })

  const returnedToken = await Token.findOne({ token })

  if (returnedToken.verified) {
    return res
      .status(200)
      .json({ ok: true, data: { email, firstName, lastName }, message: 'You already have been verified.' })
  }

  returnedToken.verified = true
  await returnedToken.save()

  return res.status(200).json({ ok: true, data: { email, firstName, lastName } })
}
