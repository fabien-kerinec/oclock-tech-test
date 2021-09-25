const mongoose = require('mongoose')
const config = require('../../config')
const leaderboardSchema = require('./Leaderboard')
mongoose.connect(
  `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@${config.MONGO_HOST}/${config.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
  {}
)

const { connection: db } = mongoose
db.on('connected', () => {
  console.log('DB Connected')
})

db.on('disconnected', () => {
  console.log('DB Disconnected')
})
db.on('error', () => {
  console.log('DB Error')
})

module.exports = db
