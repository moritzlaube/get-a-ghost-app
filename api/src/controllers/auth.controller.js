const Account = require('../models/account.model')

exports.register = async (req, res) => {
  const { email, password } = req.body
  try {
    const createdAccount = await Account.register(
      {
        email,
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
