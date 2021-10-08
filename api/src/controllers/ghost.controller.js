const { isWithinInterval, parseISO } = require('date-fns')
const Ghost = require('../models/ghost.model')
const Account = require('../models/account.model')

exports.searchGhosts = async (req, res) => {
  let ghosts

  try {
    // if no query params present, get all ghosts
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
      ghosts = await Ghost.find({}, 'ghostName type categories language blocked timezone about').lean()
    } else {
      // otherwise use query params to query db
      const { type, startDate, endDate, language, category } = req.query

      if (type !== 'all-in-1') {
        if (type === 'ghostwriter' && language !== undefined) {
          ghosts = await Ghost.find(
            { type, language },
            'ghostName type categories language blocked timezone about'
          ).lean()
        } else {
          ghosts = await Ghost.find({ type }, 'ghostName type categories language blocked timezone about').lean()
        }
      } else if (type === 'all-in-1' && language !== undefined) {
        ghosts = await Ghost.find(
          { type: ['ghostwriter', 'moodscout'], language },
          'ghostName type categories language blocked timezone about'
        ).lean()
      } else {
        ghosts = await Ghost.find(
          { type: ['ghostwriter', 'moodscout'] },
          'ghostName type categories language blocked timezone about'
        ).lean()
      }

      // filter by category
      if (category) {
        ghosts = ghosts.filter(ghost => ghost.categories.includes(category))
      }

      if (startDate && endDate) {
        // check if startDate && endDate are within blocked date range and filter ghosts accordingly
        ghosts = ghosts.filter(ghost =>
          ghost.blocked.every(
            ({ start, end }) =>
              !isWithinInterval(parseISO(startDate), { start, end }) &&
              !isWithinInterval(parseISO(endDate), { start, end })
          )
        )
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

    const compare = (a, b) => {
      if (a.ghostName < b.ghostName) return -1
      if (a.ghostName > b.ghostName) return 1
      return 0
    }

    // Strip out blocked dates and sort
    const ghostsStripped = ghosts.sort(compare).map(ghost => {
      const { blocked, ...rest } = ghost
      return rest
    })

    return res.status(200).json({ ok: true, data: ghostsStripped })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.getGhostById = async (req, res) => {
  const { id } = req.params

  try {
    const ghost = await Ghost.findById(id, 'getEssentialData')

    return res.status(200).json({ ok: true, data: ghost })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.requestGhost = async (req, res) => {
  const { id: ghostId } = req.params
  const { user } = req.body

  const requestedGhost = await Ghost.findById(ghostId)

  return res.status(200).json({ ok: true, data: { ghost: requestedGhost, user }, message: 'Request successful' })
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
    return res.status(200).json({ ok: true, data: createdGhost._id })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

exports.updateGhost = async (req, res) => {
  // TODO Check parameter and then update object one by one
  // ex: ghost.name.first = 'Max'
  const { id } = req.params

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
  const localTimezone = 'Europe/Berlin'

  await Ghost.insertMany([
    {
      type: ['ghostwriter', 'moodscout'],
      name: {
        first: 'Andrea',
        last: 'Schrul',
      },
      ghostName: 'Schrulchen',
      language: ['de', 'en'],
      phone: '+491703301300',
      categories: ['people', 'slice-of-life'],
      timezone: localTimezone,
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus nisi, cursus porta fames faucibus sed volutpat pulvinar fames.',
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
      phone: '+491703301300',
      categories: [],
      timezone: localTimezone,
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus nisi, cursus porta.',
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
      phone: '+491703301300',
      categories: ['people', 'cars', 'table-top'],
      timezone: localTimezone,
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
