const { v4: uuidv4 } = require('uuid')
const config = require('../../config')
const Board = require('./Board')
const Data = require('./Data')
const leaderboardSchema = require('../database/Leaderboard')

class Game {
  constructor() {
    // Crée un id unique pour la game
    this.id = uuidv4()
    // définit la durée max de la partie
    // la valeur est definie par default dans le env mais prend une valeur par de secours de 5 minutes en ms en cas de non configuration
    this.gameDuration = config.GAME_DURATION || 60 * 5 * 1000
    // Crée une instance de board, cela representera le plateau
    this.Board = new Board()
    // Définit la liste des cartes actuellement tournée
    this.turnedCard = []
    // Définit la liste des cartes actuellement tournée
    this.validCard = []
    // Booleean qui définit si le jeu est en cours ou pas.
    this.end = false
    // Définit le status de la fin de jeu (gain ou perte)
    this.statusGame = ''
    // conteur global de temps pour la partie
    this.count = 0
    this.countdown(this.gameDuration)
  }
  /**
   * Fonction qui permet de marquer un carte comme retournée
   * @param {number} card id de la carte a marqué comme retournée
   */
  setTurn(card) {
    let oldArray = []
    // Etape 1 : verifier qu'il n'y a pas deux carte déjà tournée
    if (this.turnedCard.length >= 2) {
      oldArray = Array.from(this.turnedCard)
      this.Board.unTurned(this.turnedCard)
      this.turnedCard = []
    }
    // Etape 2 : marquer la carte comme tournée
    const turned = this.Board.turnCard(card)

    // Etape 3 : ajouté la carte a l'array en verifiant s'il existe
    if (turned) {
      this.turnedCard.push(turned)
    }

    // Etape 4 : s'il y a deux cartes retournées regarder si elles sont identiques
    if (this.turnedCard.length >= 2) {
      if (this.checkTurnedCard()) {
        this.validCard.push(this.turnedCard[0], this.turnedCard[1])
        if (this.validCard.length === config.GAME_PAIR * 2) {
          const wintime = config.GAME_DURATION - this.count
          const time = leaderboardSchema.create({ time: wintime })
          this.endGame()
          this.statusGame = 'win'
        }
      }
    }

    return {
      oldArray,
      newArray: this.turnedCard,
      validArray: this.validCard,
      end: this.end,
      status: this.statusGame,
    }
  }

  /**
   * Fonction qui permet de checker si deux cartes sont identiques parmis deux cartes retournées
   */
  checkTurnedCard() {
    if (this.turnedCard[0].card === this.turnedCard[1].card) {
      this.Board.setValid(this.turnedCard)
      return true
    } else {
      return false
    }
  }

  /**
   * fonction qui permet de definir la fin de jeu
   */
  endGame() {
    this.end = true

    clearInterval(this.counter)
    Data.delete(`gameID_${this.id}`)
  }
  /**
   * Fonction qui gère le setInterval pour la game duration
   * @param {number} duration
   */
  countdown(duration) {
    this.count = duration

    let counter = setInterval(() => {
      if (this.count <= 0) {
        this.endGame()
        this.statusGame = 'losse'
      }
      if (this.end) {
        clearInterval(counter)
      }
      this.count = this.count - 1000
    }, 1000)
  }
}

module.exports = Game
