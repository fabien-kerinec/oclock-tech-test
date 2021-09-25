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
    // on commence par initialiser les variables necessaires :
    // un objet qui va contenir l'ensemble des cartes associé
    // chaque carte aura sera un object avec un ID unique permettant de l'identifier
    this.cardsObject = {}
    // un tableau qui va permettre de stocker temporairement un nombre de carte a placer dans le board
    let cardArray = []

    // On commence par generer l'array qui va stocker l'ensemble des carte.
    // Pour se faire, on va faire un boucle sur le nombre de pair que l'ont veux rajouter
    // et ajouter deux element a chaque boucle dans l'array car il y a deux cartes par paires
    for (let i = 0; i < config.GAME_PAIR; i++) {
      // la notation array.push(i, i) est un équivalent a faire deux array.push(i)
      cardArray.push(i, i)
    }

    // On va ensuite créer un objet par carte que l'on va ajouter dans l'objet global cardsObject
    // pour se faire il va falloir faire une boucle sur l'ensemble des elements du tableau precedement créer
    // Le but et de pouvoir positionner et identifier l'ensemble des cartes d'un board

    for (let j = 0; j < cardArray.length; j++) {
      // pour positionner aleatoirement une valeur dans le tableau, deux possibilitée
      // 1 - attriber a une carte en particulier une position.
      // 2 - attribuer a chaque position une carte.
      // Ici j'ai choisis d'attribuer a chaque positions une carte

      // etape 1 : selectionner une valeur au hasard dans l'array de carte
      const randomCardValue = random(0, cardArray.length - 1)
      console.log(randomCardValue)
    }
  }
}

module.exports = Board
