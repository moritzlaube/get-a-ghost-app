exports.getUser = (req, res) => {
  const user = {
    account_id: req.user._id,
    email: req.user.email,
    emailVerified: req.user.emailVerified,
    userData: {
      user_id: req.user.profile._id,
      name: req.user.profile.name,
      initials: req.user.profile.initials,
      company: req.user.profile.company,
      phone: req.user.profile.phone,
      address: req.user.profile.address,
    },
  }

  return res.status(200).json({
    ok: true,
    data: user,
  })
}
