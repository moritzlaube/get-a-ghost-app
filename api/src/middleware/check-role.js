module.exports = role => (req, res, next) => {
  if (req.user.role !== role) return next({ status: 403, message: 'Forbidden' })
  return next()
}
