const model = require('./func')
const express = require('express')
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace APIGameRoutes
 */
const router = express.Router()

/**
 * permet de creer de consommer une route /api/game.
 * @name post/
 * @function
 * @memberof module:routers/~APIRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', model.resource.create)
/**
 * permet de creer de consommer une route /api/game/reveal.
 * @name post/
 * @function
 * @memberof module:routers/~APIRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/reveal', model.resource.reveal)
/**
 * permet de creer de consommer une route /api/game/leaderboard.
 * @name get/
 * @function
 * @memberof module:routers/~APIRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/leaderboard', model.resource.leaderboard)

module.exports = router
