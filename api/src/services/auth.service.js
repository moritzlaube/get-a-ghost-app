const jwt = require('jsonwebtoken')

exports.getRandomInt = (min, max) => {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}

exports.signJWT = email =>
  jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

exports.verifyJWT = token => jwt.verify(token, process.env.JWT_SECRET)
