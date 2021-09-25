const mongoose = require('mongoose')

const LeaderboardSchema = new mongoose.Schema(
  {
    time: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

const leaderboardSchema = mongoose.model('leaderbord', LeaderboardSchema)

module.exports = leaderboardSchema
