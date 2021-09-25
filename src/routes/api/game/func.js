const Game = require('../../../services/Game')
const Data = require('../../../services/Data')

let model = {}
model.collection = {}
model.resource = {}

model.resource.create = (req, res, next) => {
  const GameInstance = new Game()
  Data.set(`gameID_${GameInstance.id}`, GameInstance)
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

module.exports = model
