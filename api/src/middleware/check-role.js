module.exports = role => (req, res, next) => {
  if (!req.user) return next({ status: 401, message: 'Unauthorized' })
  if (req.user.roleModel !== role) return next({ status: 401, message: 'Unauthorized' })
  return next()
}
