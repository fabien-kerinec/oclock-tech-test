// Il est necessaire dans notre cas de stocker les informations de chaque game pour permettre de stocker certaine donnée sans avoir besoin de BDD
//la variable est globale a l'application et n'est donc pas accessible en dehors de cette class
const state = {}

/**
 * Permet de stocker des choses en mémoire,
 * dans notre cas, ça sera surtout pour stocker nos instances de jeu entre deux requêtes HTTP
 */
const Data = {
  get: (key) => state[key],
  set: (key, value) => {
    state[key] = value
  },
  delete: (key) => {
    delete state[key]
  },
}

module.exports = Data
