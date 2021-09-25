window.onload = function () {
  init()
}

function turnCard(id) {
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
      console.log(res)
      if (!res.cards.end) {
        if (res.cards.validArray.length > 0) {
          res.cards.validArray.map((card) => {
            const elm = document.querySelector(`.item[data-id="${card.id}"]`)
            if (!elm.classList.contains('valid')) {
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
        if (res.cards.oldArray.length > 0) {
          res.cards.oldArray.map((card) => {
            const elm = document.querySelector(`.item[data-id="${card.id}"]`)
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
          })
        }
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
      } else {
        clearInterval(counter)
        console.log(res.cards.statusGame)
      }
    })
}

function init() {
  fetch('/api/game', { method: 'POST' })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      sessionStorage.setItem('game', res.game)
      countdown(res.timer)
      const itemList = document.querySelectorAll('.item')
      itemList.forEach((item) => {
        item.addEventListener('click', (e) => {
          turnCard(item.dataset.id)
        })
      })
    })
}
let counter
function countdown(countdown) {
  let count = countdown

  counter = setInterval(function () {
    console.log(count)
    if (count <= 0) {
      alert('losse')
      clearInterval(counter)
    }
    count = count - 1000
  }, 1000)
}
