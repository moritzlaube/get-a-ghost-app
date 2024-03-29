module.exports = function isAuthenticated(req, res, next) {
  if (!req.user) return next({ status: 401, message: 'Unauthorized' })
  return next()
}
