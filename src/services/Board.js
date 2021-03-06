const config = require('../../config')
const random = require('../utils')
class Board {
  constructor() {
    this.createBoard()
  }

  /**
   * Fonction qui permet de creer un board avec un nombre de carte
   */
  createBoard() {
    // on commence par initialiser les variables nécessaires :
    // un objet qui va contenir l'ensemble des cartes associées
    // chaque carte aura sera un object avec un ID unique permettant de l'identifier
    this.cardsObject = {}
    // un tableau qui va permettre de stocker temporairement un nombre de carte a placer dans le board
    let cardArray = []

    // On commence par générer  l'array qui va stocker l'ensemble des cartes.
    // Pour ce faire, on va faire une boucle sur le nombre de pairs que l'on veut rajouter
    // et ajouter deux éléments à chaque boucle dans l'array car il y a deux cartes par paire
    for (let i = 0; i < config.GAME_PAIR; i++) {
      // la notation array.push(i, i) est un équivalent a faire deux array.push(i)
      cardArray.push(i, i)
    }
    // On va ensuite créer un objet par carte que l'on va ajouter dans l'objet global cardsObject
    // pour ce faire il va falloir faire une boucle sur l'ensemble des éléments du tableau précédemment créé
    // Le but et de pouvoir positionner et identifier l'ensemble des cartes d'un board

    for (let j = 0; j < config.GAME_PAIR * 2; j++) {
      // pour positionner aléatoirement une valeur dans le tableau, deux possibilités
      // 1 - attribuer à une carte en particulier une position.
      // 2 - attribuer à chaque positions une carte.
      // Ici j'ai choisis d'attribuer à chaque position une carte

      // etape 1 : selectionner une valeur au hasard dans l'array de carte
      const randomCardValue = random(0, cardArray.length - 1)
      // etape 2 : on creer l'object de la carte qui va contenir les paramettre necessaire pour l'identifier et definir son ERROR_CODE_CANNOT_CREATE_RESOURCE
      this.cardsObject[j] = {
        id: j,
        valid: false,
        turn: false,
        card: cardArray[randomCardValue],
      }
      // etape 3 : on retire cette valeur de l'array pour eviter d'avoir deux cartes associé a une position
      cardArray.splice(randomCardValue, 1)
    }
  }
  /**
   * Fonction qui permet de retourner la carte card
   * @param {number} card
   */
  turnCard(card) {
    const cardToTurn = this.cardsObject[card]

    //verifier si la carte existe ou s'il est déjà retournées
    if (!cardToTurn || cardToTurn.valid || cardToTurn.turn) {
      return false
    }

    this.cardsObject[card].turn = true
    return cardToTurn
  }

  /**
   * Fonction qui permet de valider deux cartes identiques
   * @param {array} turnedCard tableau carte à valider
   */
  setValid(validedCard) {
    validedCard.map((item) => {
      this.cardsObject[item.id].valid = true
    })
  }

  /**
   * Fonction qui permet de retourner deux cartes
   * @param {array} array tableau de carte à retourner
   */
  unTurned(array) {
    array.map((item) => {
      this.cardsObject[item.id].turn = false
    })
  }
}

module.exports = Board
