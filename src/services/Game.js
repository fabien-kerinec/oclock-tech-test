const { v4: uuidv4 } = require('uuid')
const config = require('../../config')
const Board = require('./Board')
const Data = require('./Data')
class Game {
  constructor() {
    // Crée un id unique pour la game
    this.id = uuidv4()
    // Definis la durée max de la partie
    // la valeur est definie par default dans le env mais prend une valeur par default de 5 minute en ms
    this.gameDuration = config.GAME_DURATION || 60 * 5 * 1000
    // Crée une instance de board, cela representera le plateau
    this.Board = new Board()
    // Definis la liste des cartes actuellement tournée
    this.turnedCard = []
    // Definis la liste des cartes actuellement tournée
    this.validCard = []
    // Booleean qui definis si le jeu est en cours ou pas.
    this.end = false
    // definis le status de la fin de jeu (gain ou perte)
    this.statusGame = ''
    // conteur global de temps pour la partie
    this.count = 0
    this.countdown(this.gameDuration)
  }
  /**
   * Fonction qui permet de marqué un carte comme retourné
   * @param {number} card id de la carte a marqué comme retourné
   */
  setTurn(card) {
    let oldArray = []
    // Etape 1 : verifier qu'il n'y a pas deux carte déjà tournée
    if (this.turnedCard.length >= 2) {
      console.log('TODO : CARTE A RETOURNER AVANT DE FAIRE QUOI QUE CE SOIT')
      oldArray = Array.from(this.turnedCard)
      this.Board.unTurned(this.turnedCard)
      this.turnedCard = []
    }
    // Etape 2 : marqué la carte comme tournée
    const turned = this.Board.turnCard(card)

    // Etape 3 : ajouté la carte a l'array
    this.turnedCard.push(turned)

    // Etape 4 : s'il y a deux carte retournées regarder si elle sont identique
    if (this.turnedCard.length >= 2) {
      if (this.checkTurnedCard()) {
        this.validCard.push(this.turnedCard[0], this.turnedCard[1])
        if (this.validCard.length === config.GAME_PAIR * 2) {
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
   * Fonction qui permet de checker si deux carte sont identique parmis deux cartes retourné
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
   * fonction qui permet de defnir la fin de jeu
   */
  endGame() {
    this.end = true

    clearInterval(this.counter)
    Data.delete(`gameID_${this.id}`)
  }

  countdown(duration) {
    this.count = duration

    let counter = setInterval(() => {
      console.log(this.count)
      if (this.count <= 0) {
        this.endGame()
        this.statusGame = 'losse'
        clearInterval(counter)
      }
      this.count = this.count - 1000
    }, 1000)
  }
}

module.exports = Game
