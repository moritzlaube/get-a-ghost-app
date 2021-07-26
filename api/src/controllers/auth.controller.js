const Account = require('../models/account.model')
const authService = require('../services/auth.service')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  return res.status(200).json({ ok: true, data: req.user })
}

exports.register = async (req, res) => {
  const { email, password } = req.body

  try {
    const createdAccount = await Account.register(
      {
        email,
        verificationToken: authService.getRandomInt(1000, 9999),
        verificationTokenExpire: new Date(Date.now() + 1000 * 3600 * 24),
      },
      password
    )

    req.login(createdAccount, err => {
      if (err) throw new Error(err)
      return res.status(200).json({ ok: true, data: { id: createdAccount._id } })
    })
  } catch (error) {
    return res.status(500).json({ ok: false, data: error })
  }
}

exports.logout = (req, res) => {
  try {
    req.logout()
    return res.status(200).json({ ok: true, data: req.user })
  } catch (err) {
    return res.status(500).json({ ok: false, data: error })
  }
}

exports.sendInvite = (req, res) => {
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

  return res.status(200).json({ ok: true, data: { token: signedToken } })
}

exports.verifyInvite = async (req, res) => {
  const token = req.params.token

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    if (await Account.findOne({ email }).exec())
      return res.status(500).json({ ok: false, message: 'User already exists' })
    return res.status(200).json({ ok: true, message: 'Token verified' })
  } catch (error) {
    return res.status(401).json({ ok: false, data: error })
  }
}
