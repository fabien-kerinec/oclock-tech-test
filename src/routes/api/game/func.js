const Game = require('../../../services/Game')
const Data = require('../../../services/Data')
const leaderboardSchema = require('../../../database/Leaderboard')

let model = {}
model.collection = {}
model.resource = {}

model.resource.create = (req, res, next) => {
  const GameInstance = new Game()
  Data.set(`gameID_${GameInstance.id}`, GameInstance)

  console.log(leaderboard)
  return res.json({
    game: GameInstance.id,
    timer: GameInstance.gameDuration,
    full: GameInstance,
  })
}

model.resource.reveal = (req, res, next) => {
  if (!req.body.card || !req.body.game) {
    console.log('error')
    return
  }
  const game = req.body.game
  const card = req.body.card

  const fullGame = Data.get(`gameID_${game}`)

  const turnedCard = fullGame.setTurn(card)

  res.json({
    cards: turnedCard,
  })
}

model.resource.leaderboard = async (req, res, next) => {
  const leaderboard = await leaderboardSchema.find({}, null, {
    limit: 3,
    sort: { time: 1 },
  })
  return res.json(leaderboard)
}

module.exports = model
