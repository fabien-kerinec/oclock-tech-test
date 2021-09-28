const Game = require('../../../services/Game')
const Data = require('../../../services/Data')
const leaderboardSchema = require('../../../database/Leaderboard')
const createHttpError = require('http-errors')

let model = {}
model.collection = {}
model.resource = {}
/**
 * Fonction definissant ce qui va ce passer sur la route associée /api/game/
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
model.resource.create = (req, res, next) => {
  const GameInstance = new Game()
  Data.set(`gameID_${GameInstance.id}`, GameInstance)
  return res.json({
    game: GameInstance.id,
    timer: GameInstance.gameDuration,
  })
}
/**
 * Fonction definissant ce qui va ce passer sur la route associée /api/game/reveal
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
model.resource.reveal = async (req, res, next) => {
  if (!req.body.card || !req.body.game) {
    console.log('error')
    return
  }
  const game = req.body.game
  const card = req.body.card

  const fullGame = Data.get(`gameID_${game}`)

  const turnedCard = await fullGame.setTurn(card)
  if (turnedCard) {
    res.json({
      cards: turnedCard,
    })
  } else {
    res.json({
      game: 'win',
    })
  }
}
/**
 * Fonction definissant ce qui va ce passer sur la route associée /api/game/leaderboard
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
model.resource.leaderboard = async (req, res, next) => {
  const leaderboard = await leaderboardSchema.find({}, null, {
    limit: 3,
    sort: { time: 1 },
  })
  return res.json(leaderboard)
}

module.exports = model
