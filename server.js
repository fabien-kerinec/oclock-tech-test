const express = require('express')
const path = require('path')
const app = express()

const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

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

// Demarrage du server nodejs js via l'app express sur un port particulier
// le port à une valeur par default en cas de non configuration
app.listen(port || 3000, () => {
  console.log(`your app is running on port ${port || 3000}`)
})
