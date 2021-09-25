const { v4: uuidv4 } = require('uuid')
const config = require('../../config')
const Board = require('./Board')
class Game {
  constructor() {
    // Crée un id unique pour la game
    this.id = uuidv4()
    // Definis la durée max de la partie
    // la valeur est definie par default dans le env mais prend une valeur par default de 5 minute en ms
    this.gameDuration = config.GAME_DURATION || 60 * 5 * 1000
    // Crée une instance de board, cela representera le plateau
    this.Board = new Board()
  }
}

module.exports = Game
