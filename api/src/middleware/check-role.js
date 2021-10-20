module.exports = role => (req, res, next) => {
  if (req.user.roleModel !== role) return next({ status: 403, message: 'Unauthorized' })
  return next()
}
