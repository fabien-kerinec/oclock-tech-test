/**
 * Fonction permettant de générer un nombre aléatoire entre deux chiffres
 * @param {number} min definis le nombre minimum
 * @param {number} max definis le nombre maximum
 * @returns {number} retourne le nombre aleatoire
 */
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = random
