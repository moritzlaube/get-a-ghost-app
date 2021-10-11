/* eslint-disable no-underscore-dangle */
const { verifyJWT, signJWT, getRandomInt } = require('../services/auth.service')
const Account = require('../models/account.model')
const User = require('../models/user.model')
const Token = require('../models/token.model')
const sendMail = require('../services/mail.service')

/** Register User */
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
        verificationTokenExpire: new Date(Date.now() + 1000 * 3600 * 24),
      },
      password
    )

    // Send mail via SG with PIN to verify email
    const subject = '👻 Please verify your Email address'
    const html = `Please verify your email with this pin: <strong>${verificationPIN}</strong><br>Note that it will expire in 24 hours.`

    try {
      await sendMail(email, subject, html)
    } catch (error) {
      console.error('Sendgrid Error', error.message)
    }

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

    return res.status(200).json({ ok: true, data: { id: createdAccount._id } })
  } catch (error) {
    return res.status(500).json({ ok: false, data: error })
  }
}

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

exports.logout = (req, res) => {
  try {
    req.logout()
    return res.status(200).json({ ok: true, data: req.user })
  } catch (err) {
    return res.status(500).json({ ok: false, data: err })
  }
}

// Controllers to create and verify Ghost-invites
exports.sendInvite = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]

  if (token !== process.env.BEARER_TOKEN) return res.status(401).json({ ok: false, message: 'Unauthorized' })

  const { email } = req.body

  const signedToken = signJWT(email)

  const t = new Token({
    token: signedToken,
  })

  await t.save()

  const subject = '👻 Welcome to Get-A-Ghost!'
  const html = `Just a few more steps and you're one of us! Please follow this link to finish your sign-up process:<br>${process.env.BASE_URL}/invite?token=${signedToken}`

  try {
    await sendMail(email, subject, html)
  } catch (error) {
    console.log(error)
  }

  return res.status(200).json({ ok: true, data: { token: signedToken } })
}

exports.verifyInvite = async (req, res) => {
  const { token } = req.params

  const { email } = verifyJWT(token)

  // try {
  //   console.log(email)
  // } catch (error) {
  //   return res.status(401).json({ ok: false, data: error })
  // }

  const hasAccount = await Account.exists({ email })
  const hasToken = await Token.exists({ token })

  if (!hasToken || hasAccount)
    return res.status(409).json({ ok: false, message: 'Wrong Token or Account with that email already exists' })

  // const returnedToken = await Token.find({ token })
  // returnedToken.verfied = true
  // await returnedToken.save()

  return res.status(200).json({ ok: true, data: email })
}
