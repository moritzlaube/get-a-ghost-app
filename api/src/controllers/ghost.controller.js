const Ghost = require('../models/ghost.model')

exports.getAllGhosts = async (req, res) => {
  let query
  console.log(req.query)
  if (req.query) {
    const {type} = req.query
    query = {type: { $in: [type] }}
  } else {
    query = {}
  }

  try {

    const ghosts = await Ghost.find(query)

    return res.status(200).json({ status: 'ok', data: ghosts })
  } catch (error) {
    return res.status(500).json({ status: 'failed', error })
  }
}

exports.getGhostById = async (req, res) => {
  const id = req.params.id

  try {
    const ghost = await Ghost.findById(id)

    return res.status(200).json({ status: 'ok', data: ghost.getEssentialData })
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

exports.updateGhost = async (req, res) => {
  // TODO Check parameter and then update object one by one 
  // ex: ghost.name.first = 'Max'
  const id = req.params.id
  
  try {
    const ghost = await Ghost.findById(id)
    const updatedGhost = Object.assign(ghost, req.body)

    return res.status(200).json({ status: 'ok', data: updatedGhost.getEssentialData })
  } catch (error) {
    return res.status(500).json({ status: 'failed', error })
  }
}