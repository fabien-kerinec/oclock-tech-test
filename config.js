require('dotenv').config()

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} PORT the port that we use
 */

/**
 * @type {EnvironmentConfiguration}
 */

const config = {
  ...process.env,
}

module.exports = config
