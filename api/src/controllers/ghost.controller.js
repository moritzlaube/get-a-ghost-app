/* eslint-disable no-underscore-dangle */
const { isWithinInterval, parseISO } = require('date-fns')
const pug = require('pug')
const path = require('path')
const Ghost = require('../models/ghost.model')
const User = require('../models/user.model')
const Account = require('../models/account.model')
const Request = require('../models/request.model')
const sendMail = require('../services/mail.service')

/* **************
  SEARCH GHOSTS
************** */

exports.searchGhosts = async (req, res) => {
  let ghosts

  try {
    // if no query params present, get all ghosts
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
      return res
        .status(400)
        .json({ ok: false, message: 'Please provide at least the type and a date range for a successful search.' })
    }
    // otherwise use query params to query db
    const { type, startDate, endDate, language, category } = req.query

    if (type !== 'all-in-1') {
      if (type === 'ghostwriter' && language !== undefined) {
        ghosts = await Ghost.find(
          { type, languages: language, active: true },
          'ghostName type categories languages blocked timezone about website countryCode phone'
        )
          .lean()
          .populate('account', 'email')
      } else {
        ghosts = await Ghost.find(
          { type, active: true },
          'ghostName type categories languages blocked timezone about website countryCode phone'
        )
          .lean()
          .populate('account', 'email')
      }
    } else if (type === 'all-in-1' && language !== undefined) {
      ghosts = await Ghost.find(
        { type: ['ghostwriter', 'moodscout'], languages: language, active: true },
        'ghostName type categories languages blocked timezone about website countryCode phone'
      )
        .lean()
        .populate('account', 'email')
    } else {
      ghosts = await Ghost.find(
        { type: ['ghostwriter', 'moodscout'], active: true },
        'ghostName type categories languages blocked timezone about website countryCode phone'
      )
        .lean()
        .populate('account', 'email')
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

/* **************
  REQUEST GHOST
************** */

exports.requestGhost = async (req, res) => {
  const { id: ghostId } = req.params
  const {
    user,
    requestedDates: { start, end },
  } = req.body

  const startDate = new Date(start).toLocaleDateString('en-En', {})
  const endDate = new Date(end).toLocaleDateString('en-En', {})

  try {
    const [requestedGhost, requestedBy] = await Promise.all([
      Ghost.findById(ghostId, 'requests account name ghostName countryCode phone').populate('account', 'email'),
      User.findById(user.profile.id, 'requests account name countryCode phone company').populate('account', 'email'),
    ])

    const newRequest = await Request.create({
      requestedGhost: requestedGhost._id,
      requestedBy: requestedBy._id,
      requestedDates: {
        start,
        end,
      },
    })

    requestedGhost.requests.push(newRequest._id)
    requestedBy.requests.push(newRequest._id)
    await Promise.all([requestedGhost.save(), requestedBy.save()])

    let pugPayload = {
      name: {
        first: requestedBy.name.first,
        last: requestedBy.name.last,
      },
      ghostFirstName: requestedGhost.name.first,
      company: requestedBy.company,
      countryCode: requestedBy.countryCode,
      phone: requestedBy.phone,
      email: requestedBy.account.email,
      requestedDates: {
        start: startDate,
        end: endDate,
      },
    }

    const subjectGhost = '👻 Congratulations! You have a request!'
    const htmlGhost = pug.renderFile(
      path.join(__dirname, '../', 'views', 'email-templates', 'request-ghost.pug'),
      pugPayload
    )

    pugPayload = {
      firstName: requestedBy.name.first,
      ghostName: requestedGhost.ghostName,
      countryCode: requestedGhost.countryCode,
      phone: requestedGhost.phone,
      email: requestedGhost.account.email,
      requestedDates: {
        start: startDate,
        end: endDate,
      },
    }

    const subjectUser = `👻 We have successfully forwarded your request to ${requestedGhost.ghostName}!`
    const htmlUser = pug.renderFile(
      path.join(__dirname, '../', 'views', 'email-templates', 'request-user.pug'),
      pugPayload
    )

    await Promise.all([
      sendMail(requestedGhost.account.email, subjectGhost, htmlGhost),
      sendMail(requestedBy.account.email, subjectUser, htmlUser),
    ])

    return res.status(200).json({ ok: true, data: newRequest })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

/* **************
  CREATE GHOST
************** */

exports.createGhost = async (req, res) => {
  const { name, password, countryCode, phone, email } = req.body

  try {
    const createdAccount = await Account.register(
      {
        email,
        isGhost: true,
        emailVerified: true,
        role: 'Ghost',
      },
      password
    )

    const createdGhost = await Ghost.create({
      account: createdAccount._id,
      countryCode,
      phone,
      name,
    })

    createdAccount.profile = createdGhost._id
    await createdAccount.save()

    return res.status(200).json({ ok: true, data: createdGhost._id })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

/* **************
  UPDATE GHOST
************** */

exports.updateGhost = async (req, res) => {
  // TODO Check parameter and then update object one by one
  // ex: ghost.name.first = 'Max'
  const { id } = req.params

  if (req.user._id.toString() !== req.params.id) return res.status(403).json({ ok: false, message: 'Forbidden' })

  try {
    const {
      profile: { _id: ghostId },
    } = await Account.findById(id)
    const ghost = await Ghost.findById(ghostId)
    Object.keys(req.body)
      .filter(key => req.body[key] != null)
      .forEach(key => {
        ghost[key] = req.body[key]
      })
    if (ghost.active === false) ghost.active = true
    await ghost.save()

    return res.status(200).json({ ok: true, data: ghost })
  } catch (error) {
    return res.status(500).json({ ok: false, error })
  }
}

/* **************
  INIT GHOSTS
************** */

// exports.init = async (req, res) => {
//   const localTimezone = 'GMT+02:00 Europe/Berlin'

//   await Ghost.insertMany([
//     {
//       type: ['ghostwriter', 'moodscout'],
//       active: true,
//       name: {
//         first: 'Andrea',
//         last: 'Schrul',
//       },
//       ghostName: 'Schrulchen',
//       languages: ['german', 'english'],
//       phone: '+491703301300',
//       website: 'https://www.example.com',
//       categories: ['people', 'slice-of-life'],
//       timezone: localTimezone,
//       about:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus nisi, cursus porta fames faucibus sed volutpat pulvinar fames.',
//       blocked: [
//         {
//           start: new Date(2021, 1, 10),
//           end: new Date(2021, 1, 13),
//         },
//         {
//           start: new Date(2021, 2, 14),
//           end: new Date(2021, 2, 21),
//         },
//         {
//           start: new Date(2021, 3, 21),
//           end: new Date(2021, 3, 28),
//         },
//         {
//           start: new Date(2021, 5, 1),
//           end: new Date(2021, 5, 12),
//         },
//       ],
//     },
//     {
//       type: ['ghostwriter'],
//       active: true,
//       name: {
//         first: 'Fintan',
//         last: 'Gsänger',
//       },
//       languages: ['german'],
//       phone: '+491703301300',
//       website: 'https://www.example.com',
//       categories: [],
//       timezone: localTimezone,
//       about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus nisi, cursus porta.',
//       blocked: [
//         {
//           start: new Date(2021, 3, 22),
//           end: new Date(2021, 4, 5),
//         },
//         {
//           start: new Date(2021, 5, 22),
//           end: new Date(2021, 6, 3),
//         },
//         {
//           start: new Date(2021, 7, 1),
//           end: new Date(2021, 7, 8),
//         },
//         {
//           start: new Date(2021, 8, 8),
//           end: new Date(2021, 8, 22),
//         },
//       ],
//     },
//     {
//       type: ['moodscout'],
//       active: true,
//       name: {
//         first: 'Kai',
//         last: 'Werner',
//       },
//       languages: [],
//       phone: '+491703301300',
//       website: 'https://www.example.com',
//       categories: ['people', 'cars', 'table-top'],
//       timezone: localTimezone,
//       about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       blocked: [
//         {
//           start: new Date(2021, 3, 22),
//           end: new Date(2021, 4, 5),
//         },
//         {
//           start: new Date(2021, 5, 22),
//           end: new Date(2021, 6, 3),
//         },
//         {
//           start: new Date(2021, 9, 8),
//           end: new Date(2021, 9, 12),
//         },
//         {
//           start: new Date(2021, 9, 19),
//           end: new Date(2021, 10, 22),
//         },
//       ],
//     },
//   ])
//   res.status(200).json({ ok: true, message: 'Ghost docs created!' })
// }
