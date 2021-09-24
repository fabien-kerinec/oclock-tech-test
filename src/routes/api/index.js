const express = require('express')
const router = express.Router()

const game = require('./game')

router.use('/game', game)

module.exports = router
