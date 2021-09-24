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
 * @name get/
 * @function
 * @memberof module:routers/~APIRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', model.resource.create)

module.exports = router
