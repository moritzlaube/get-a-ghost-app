const jwt = require('jsonwebtoken')

exports.getRandomInt = (min, max) => {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}

exports.signJWT = (email, firstName, lastName) =>
  jwt.sign(
    {
      email,
      firstName,
      lastName,
    },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  )

exports.verifyJWT = token => jwt.verify(token, process.env.JWT_SECRET)
