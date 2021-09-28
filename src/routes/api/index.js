const headers = require('./headers')
const express = require('express')

const router = express.Router()
const game = require('./game')

// definis les headers pour acceder à l'Api
// Pour en partie permettre de securiser l'application
router.use(headers)

router.use('/game', game)
router.use(function (err, req, res, next) {
  console.log(' test')
  return next(err)
})
module.exports = router
