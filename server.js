const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const config = require('./config')
const routes = require('./src/routes')
const app = express()

require('./src/database')

app.use(express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// recupere l'ensemble des route (api et view)
app.use(routes)

// Demarrage du server nodejs js via l'app express sur un port particulier
// le port à une valeur par default en cas de non configuration

app.listen(process.env.PORT || 3001, () => {
  console.log(`your app is running on port ${process.env.PORT || 3001}`)
})
