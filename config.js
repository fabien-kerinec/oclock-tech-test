require('dotenv').config()

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} APP_PORT port utilisé par l'application
 * @prop {number} GAME_DURATION le temps max d'une game
 * @prop {number} GAME_PAIR le nombre de pair souahité dans le jeu
 */

/**
 * @type {EnvironmentConfiguration}
 */

const config = {
  ...process.env,
}

module.exports = config
