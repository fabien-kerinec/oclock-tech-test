const mongoose = require('mongoose')
const config = require('../../config')
const leaderboardSchema = require('./Leaderboard')
mongoose.connect(
  `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@${config.MONGO_HOST}/${config.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
  {}
)

const { connection: db } = mongoose
db.on('connected', async () => {
  console.log('DB Connected')

  const data = await leaderboardSchema.find({})
  // ici je verifie s'il y a déjà des datas si c'est vide, j'insert des data par default pour l'exemple
  if (!data.length) {
    const newData = [{ time: 1000000 }, { time: 1200000 }, { time: 1500000 }]
    leaderboardSchema.insertMany(newData)
  }
})

db.on('disconnected', () => {
  console.log('DB Disconnected')
})
db.on('error', () => {
  console.log('DB Error')
})

module.exports = db
