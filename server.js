const express = require('express')
const app = express()

const port = 3000

// definition de la route principale, va servir de point d'acces a l'application
// la route sera la racine de l'app : /
app.get('/', (req, res) => {
  res.send('Hello World')
})

// Demarrage du server nodejs js via l'app express sur un port particulier
// le port à une valeur par default en cas de non configuration
app.listen(port || 3000, () => {
  console.log(`your app is running on port ${port || 3000}`)
})
