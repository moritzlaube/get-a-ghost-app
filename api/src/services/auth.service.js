const jwt = require('jsonwebtoken')

exports.getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.signJWT = email => {
  return jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
}

exports.verifyJWT = token => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
