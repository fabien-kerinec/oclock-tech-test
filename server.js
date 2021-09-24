const express = require('express')
const path = require('path')
const config = require('./config')
const routes = require('./src/routes')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

// Demarrage du server nodejs js via l'app express sur un port particulier
// le port à une valeur par default en cas de non configuration
app.listen(config.APP_PORT || 3001, () => {
  console.log(`your app is running on port ${config.APP_PORT || 3001}`)
})
