require('dotenv').config()

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} APP_PORT port utilisé par l'application
 * @prop {string} GAME_DURATION le temps max d'une game
 */

/**
 * @type {EnvironmentConfiguration}
 */

const config = {
  ...process.env,
}

module.exports = config
