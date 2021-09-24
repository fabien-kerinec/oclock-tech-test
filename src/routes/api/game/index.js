const express = require('express')
const router = express.Router()
const model = require('./func')

// Context: /api/formats
router.get('/', model.resource.create)

module.exports = router
