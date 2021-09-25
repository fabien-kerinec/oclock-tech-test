require('dotenv').config()

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} APP_PORT port utilisé par l'application
 * @prop {number} GAME_DURATION le temps max d'une game
 * @prop {number} GAME_PAIR le nombre de pair souahité dans le jeu
 * @prop {number} MONGO_USER l'utilisateur de la base de donnée mongo
 * @prop {number} MONGO_PASS le mot de passe de votre base de donnée
 * @prop {number} MONGO_HOST l'url de vote base de donnée
 * @prop {number} MONGO_DATABASE_NAME le nom de votre database
 */

/**
 * @type {EnvironmentConfiguration}
 */

const config = {
  ...process.env,
}

module.exports = config
