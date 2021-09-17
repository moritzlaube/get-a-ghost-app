const Ghost = require('../models/ghost.model')
const Account = require('../models/account.model')
const { isWithinInterval, parseISO } = require('date-fns')

exports.getAllGhosts = async (req, res) => {
  let ghosts

  try {
    // if no query params present, get all ghosts
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
      ghosts = await Ghost.find()
    } else {
      //otherwise use query params to query db
      const { type, startDate, endDate, language } = req.query
      if (typeof type === 'string') {
        if (type === 'ghostwriter' && language !== undefined) {
          ghosts = await Ghost.find().where('type').in([type]).where('language').in([language])
        } else {
          ghosts = await Ghost.find().where('type').in([type])
        }
      } else {
        ghosts = await Ghost.find()
          .where('type')
          .in([...type])
      }

      if (startDate && endDate) {
        // check if startDate && endDate are within blocked date range and filter ghosts accordingly
        ghosts = ghosts.filter(ghost => {
          return ghost.blocked.every(({ start, end }) => {
            return (
              !isWithinInterval(parseISO(startDate), { start, end }) &&
              !isWithinInterval(parseISO(endDate), { start, end })
            )
          })
        })
      }
    }

    if (!req.user) {
      return res.status(200).json({
        ok: true,
        data: {
          ghostCount: ghosts.length,
        },
      })
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
    const createdAccount = await Account.register(
      {
        email,
        roleModel: 'User',
        verificationToken: authService.getRandomInt(1000, 9999),
        verificationTokenExpire: new Date(Date.now() + 1000 * 3600 * 24),
      },
      password
    )

    const createdGhost = await Ghost.create({
      type,
      name,
    })
    return res.status(200).json({ ok: true, data: createdGhost.getEssentialData })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.updateGhost = async (req, res) => {
  // TODO Check parameter and then update object one by one
  // ex: ghost.name.first = 'Max'
  const id = req.params.id

  if (req.user.role !== req.params.id) return res.status(401).json({ ok: false, message: 'Unauthorized' })

  try {
    const ghost = await Ghost.findById(id)
    Object.keys(req.body).forEach(key => {
      if (key === 'blocked') {
        ghost[key].push(...req.body[key])
      } else {
        ghost[key] = req.body[key]
      }
    })

    await ghost.save()

    return res.status(200).json({ ok: true, data: ghost })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.init = async (req, res) => {
  await Ghost.insertMany([
    {
      type: ['ghostwriter', 'moodscout'],
      name: {
        first: 'Andrea',
        last: 'Schrul',
      },
      ghostName: 'Schrulchen',
      language: ['de', 'en'],
      blocked: [
        {
          start: new Date(2021, 1, 10),
          end: new Date(2021, 1, 13),
        },
        {
          start: new Date(2021, 2, 14),
          end: new Date(2021, 2, 21),
        },
        {
          start: new Date(2021, 3, 21),
          end: new Date(2021, 3, 28),
        },
        {
          start: new Date(2021, 5, 1),
          end: new Date(2021, 5, 12),
        },
      ],
    },
    {
      type: ['ghostwriter'],
      name: {
        first: 'Fintan',
        last: 'Gsänger',
      },
      language: ['de'],
      blocked: [
        {
          start: new Date(2021, 3, 22),
          end: new Date(2021, 4, 5),
        },
        {
          start: new Date(2021, 5, 22),
          end: new Date(2021, 6, 3),
        },
        {
          start: new Date(2021, 7, 1),
          end: new Date(2021, 7, 8),
        },
        {
          start: new Date(2021, 8, 8),
          end: new Date(2021, 8, 22),
        },
      ],
    },
    {
      type: ['moodscout'],
      name: {
        first: 'Kai',
        last: 'Werner',
      },
      language: [],
      blocked: [
        {
          start: new Date(2021, 3, 22),
          end: new Date(2021, 4, 5),
        },
        {
          start: new Date(2021, 5, 22),
          end: new Date(2021, 6, 3),
        },
        {
          start: new Date(2021, 9, 8),
          end: new Date(2021, 9, 12),
        },
        {
          start: new Date(2021, 9, 19),
          end: new Date(2021, 10, 22),
        },
      ],
    },
  ])
  res.status(200).json({ ok: true, message: 'Ghost docs created!' })
}
