window.onload = function () {
  // Au chargement de la page, on recupere les element du leaderboard
  fetch('/api/game/leaderboard')
    .then((res) => res.json())
    .then((res) => {
      let string = ''
      res.map((item, index) => {
        string += `<li>#${index + 1} : ${millisToMinutesAndSeconds(
          item.time
        )}</li>`
      })
      document.querySelector('ul').innerHTML = string
    })
  document.querySelector('button').addEventListener('click', function () {
    document.querySelector('.introduction').classList.add('remove')
    document.querySelector('.board').classList.add('display')
    document.querySelector('.progressBar').classList.add('display')
    init()
  })
}

function turnCard() {
  const id = this.dataset.id
  const element = document.querySelector(`.item[data-id="${id}"]`)
  if (!element.classList.contains('valid')) {
    fetch('/api/game/reveal', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ card: id, game: sessionStorage.getItem('game') }),
    })
      .then((res) => res.json())
      .then((res) => {
        // si jamais le jeu n'est pas finis alors on execute le process.
        // Sinon on lance la fin du jeu
        if (!res.cards.end) {
          // On traite l'ensemble des cartes validées
          if (res.cards.validArray.length > 0) {
            // On parcours l'ensemble des cartes valides, puis on si jamais elles n'ont pas la class valid on l'ajoute.
            // On leur retire aussi la class turned pour s'assurer qu'il n'y ai pas de mauvaise selection par la suite
            res.cards.validArray.map((card) => {
              const elm = document.querySelector(`.item[data-id="${card.id}"]`)
              if (!elm.classList.contains('valid')) {
                elm.removeEventListener('click', turnCard)
                document
                  .querySelector(`.item[data-id="${card.id}"] .front`)
                  .classList.add(`card_${card.card}`)
                elm.classList.add('valid')
              }
              if (elm.classList.contains('turned')) {
                elm.classList.remove('turned')
              }
            })
          }
          // On traite l'ensemble des cartes qu'il faut retourner
          if (res.cards.oldArray.length > 0) {
            // On parcours l'ensemble qu'il faut retourner, puis on si jamais elles n'ont pas la class valid et a la class turned on retire la class turned pour la masquer.
            // On ajout un leger delai pour reset le positionnement du sprite (pour eviter de retrouver les reponses dans le DOM)
            res.cards.oldArray.map((card) => {
              if (card.id !== res.cards.newArray[0].id) {
                const elm = document.querySelector(
                  `.item[data-id="${card.id}"]`
                )
                if (
                  elm.classList.contains('turned') &&
                  !elm.classList.contains('valid')
                ) {
                  elm.classList.remove('turned')
                  setTimeout(() => {
                    document
                      .querySelector(`.item[data-id="${card.id}"] .front`)
                      .classList.remove(`card_${card.card}`)
                  }, 300)
                }
              }
            })
          }
          // On traite l'ensemble des cartes qu'il faut afficher
          if (res.cards.newArray.length > 0) {
            // On parcours l'ensemble des cartes a afficher, puis on si jamais elles n'ont pas la class valid ni la class turned on ajoute la class turned.
            // On leur ajoute aussi la class permettant d'afficher le bon fruit exemple "card_1" avec 1 étant un identifiant contenu côté backoffice
            // et qui permet d'associer un numero à un fruit
            res.cards.newArray.map((card) => {
              const elm = document.querySelector(`.item[data-id="${card.id}"]`)
              if (
                !elm.classList.contains('turned') &&
                !elm.classList.contains('valid')
              ) {
                document
                  .querySelector(`.item[data-id="${card.id}"] .front`)
                  .classList.add(`card_${card.card}`)
                elm.classList.add('turned')
              }
            })
          }
        } else {
          if (res.cards.newArray.length > 0) {
            res.cards.newArray.map((card) => {
              const elm = document.querySelector(`.item[data-id="${card.id}"]`)
              if (
                !elm.classList.contains('turned') &&
                !elm.classList.contains('valid')
              ) {
                document
                  .querySelector(`.item[data-id="${card.id}"] .front`)
                  .classList.add(`card_${card.card}`)
                elm.classList.add('turned')
              }
            })
          }
          document.querySelectorAll(`.item`).forEach((item) => {
            item.removeEventListener('click', turnCard)
          })
          document.querySelector('.win').classList.add('display')
          document.querySelector('.game').classList.add('disable')
          document.querySelector('.progressBar').classList.remove('display')
          clearInterval(counter)
        }
      })
  }
}

/**
 * Fonction qui lance l'ensmble du jeu
 */
function init() {
  //requete le debut du jeu, ça permet d'initialiser un board au hasard côté backoffice
  fetch('/api/game', { method: 'POST' })
    .then((res) => res.json())
    .then((res) => {
      sessionStorage.setItem('game', res.game)
      countdown(res.timer)
      const itemList = document.querySelectorAll('.item')
      itemList.forEach((item) => {
        item.addEventListener('click', turnCard)
      })
    })
}
let counter, maxTime
function countdown(countdown) {
  let count = countdown

  counter = setInterval(function () {
    // si le counter arrive à 0, on arrete le jeu, et l'utilisateur a perdu
    if (count <= 0) {
      document.querySelector('.lose').classList.add('display')
      document.querySelector('.game').classList.add('disable')
      document.querySelector('.progressBar').classList.remove('display')
      // il est important de retirer les event afin d'éviter tout problème
      document.querySelectorAll(`.item`).forEach((item) => {
        item.removeEventListener('click', turnCard)
      })
      clearInterval(counter)
    }
    let percent = ((countdown - count) * 100) / countdown
    percent = 100 - percent
    percent.toFixed(2)
    document.querySelector('.progressBar .bar').style.width = percent + '%'
    // document.querySelector('.progressBar #file').value = percent

    if (percent < 50) {
      document.querySelector('.progressBar .bar').classList.remove('green')
      document.querySelector('.progressBar .bar').classList.add('orange')
      document.querySelector('.progressBar .bar').style.background =
        'rgb(208, 125, 0)'
    }
    if (percent < 15) {
      document.querySelector('.progressBar .bar').classList.remove('orange')
      document.querySelector('.progressBar .bar').classList.add('red')
      document.querySelector('.progressBar .bar').style.background =
        'rgb(208, 0, 0)'
    }
    count = count - 10
  }, 10)
}

/**
 * Fonction qui convertis milliseconde en mm:ss
 * @param {number} millis
 * @returns {string} text comprenant la convertion
 */
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
