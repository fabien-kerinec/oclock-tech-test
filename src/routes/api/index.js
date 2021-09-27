const headers = require('./headers')
const express = require('express')

const router = express.Router()
const game = require('./game')

// definis les header pour acceder a l'Api
// ça peut en partis permettre de securiser l'application en cas de besoin
router.use(headers)

router.use('/game', game)
router.use(function (err, req, res, next) {
  console.log(' test')
  return next(err)
})
module.exports = router
