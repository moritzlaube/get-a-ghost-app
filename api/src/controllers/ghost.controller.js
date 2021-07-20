const Ghost = require('../models/ghost.model')

exports.getAllGhosts = async (req, res) => {
  let ghosts

  try {
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
      ghosts = await Ghost.find()
    } else {
      const { type, start, end } = req.query
      console.log(start) // undefined
      ghosts = await Ghost.find().where('type').in([type])
    }

    return res.status(200).json({ ok: true, data: ghosts })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.getGhostById = async (req, res) => {
  const id = req.params.id

  try {
    const ghost = await Ghost.findById(id)

    return res.status(200).json({ ok: true, data: ghost.getEssentialData })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.createGhost = async (req, res) => {
  const { type, name } = req.body

  try {
    const savedGhost = await Ghost.create({
      type,
      name,
    })
    return res.status(200).json({ ok: true, data: savedGhost.getEssentialData })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.updateGhost = async (req, res) => {
  // TODO Check parameter and then update object one by one
  // ex: ghost.name.first = 'Max'
  const id = req.params.id

  try {
    const ghost = await Ghost.findById(id)
    Object.keys(req.body).forEach(key => {
      if (key === 'blocked') {
        ghost[key].push(...req.body[key])
      } else {
        ghost[key] = req.body[key]
      }
    })
    // ghost.blocked.push(...req.body.blocked)
    await ghost.save()

    return res.status(200).json({ ok: true, data: ghost })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}
