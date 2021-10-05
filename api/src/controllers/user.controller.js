const User = require('../models/user.model')
/* eslint-disable no-underscore-dangle */
exports.getUser = (req, res) => {
  // const user = {
  //   account_id: req.user._id,
  //   email: req.user.email,
  //   emailVerified: req.user.emailVerified,
  //   userData: {
  //     user_id: req.user.profile._id,
  //     name: req.user.profile.name,
  //     initials: req.user.profile.initials,
  //     company: req.user.profile.company,
  //     phone: req.user.profile.phone,
  //     address: req.user.profile.address,
  //   },
  // }

  res.status(200).json({
    ok: true,
    data: req.user,
  })
}

exports.updateUser = async (req, res) => {
  // destructure info from frontend and then mutate Object by user[key] = value
  const newUserInfo = req.body
  const user = await User.findById(req.user.profile.id)

  const updatedUser = Object.assign(user, newUserInfo)

  // const savedUser = await user.save()

  res.status(200).json({ ok: true, data: updatedUser })
}
