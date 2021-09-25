const Game = require('../../../services/Game')

let model = {}
model.collection = {}
model.resource = {}

model.resource.create = (req, res, next) => {
  const GameInstance = new Game()
  return res.json({ response: 'test' })
}

module.exports = model
