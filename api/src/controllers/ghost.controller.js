const Ghost = require('../models/ghost.model')

exports.getAllGhosts = async (req, res) => {
  try {
    const ghosts = await Ghost.find().select()

    return res.status(200).json({ status: 'ok', data: ghosts })
  } catch (error) {
    return res.status(500).json({ status: 'failed', error })
  }
}

exports.createGhost = async (req, res) => {
  const { type, firstName, lastName } = req.body

  try {
    const savedGhost = await Ghost.create({
      type,
      name: {
        first: firstName,
        last: lastName,
      },
    })
    return res.status(200).json({ status: 'ok', data: savedGhost.getEssentialData })
  } catch (error) {
    return res.status(500).json({ status: 'failed', error })
  }
}
