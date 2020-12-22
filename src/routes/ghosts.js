const express = require('express')
const Ghost = require('../models/ghost-model')

const router = express.Router()

// init test data start


// const maria = new Ghost({
//   email: 'ko@mariala.com',
//   firstName: 'Maria',
//   lastName: 'Cordou',
//   proMembership: false,
//   occupation: 'Ghost & Moodscout',
//   mobliePhone: '+491703345233',
//   categories: ['Tabletop', 'Beauty'],
//   blockedDates: [{startBlockedDate: '2019-09-07', endBlockedDate: '2019-10-01'}, {startBlockedDate: '2020-09-07', endBlockedDate: '2020-10-01'}]
// })

// maria.save().then(() => console.log('contact saved'))

// init test data end


/* GET ghosts listing. */
router.get('/', async (req, res) => {
  const ghosts = await Ghost.find()
  res.send(ghosts)
})

module.exports = router
