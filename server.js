const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const routes = require('./src/routes')
require('./src/database')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// logger qui permet d'afficher les routes en console
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
// parse application/x-www-form-urlencoded

// recupère l'ensemble des route (api et view)
app.use(routes)

// catch 404 and forward to error handler
app.use(({ next }) => {
  console.log('create error')
  return next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.setHeader('Content-type', 'text/html')
  res.status(err.status || 500)
  res.render('error', function (err, html) {
    if (err) {
      console.log(err)
    }
    res.send(html)
  })
})

// Demarrage du server nodejs js via l'app express sur un port particulié
// le port a une valeur par default en cas de non configuration
app.listen(process.env.PORT || 3001, () => {
  console.log(`your app is running on port ${process.env.PORT || 3001}`)
})
