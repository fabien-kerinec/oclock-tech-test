const express = require('express')
const api = require('./api')
const cors = require('cors')
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace GameRoutes
 */
const router = express.Router()

/**
 * Rends la vue de l'application sur l'url root.
 * @name get/
 * @function
 * @memberof module:routers/~GameRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', (req, res) => {
  res.sendFile('/index.html')
})

router.use(cors())
//recupere les routes de l'api
router.use('/api/', api)

module.exports = router
