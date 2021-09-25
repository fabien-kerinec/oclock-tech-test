window.onload = function () {
  init()
}

function turnCard() {
  const id = this.dataset.id
  const element = document.querySelector(`.item[data-id="${id}"]`)
  if (
    !element.classList.contains('turned') &&
    !element.classList.contains('valid')
  ) {
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
  } else {
    alert('sorry your game is already finished')
  }
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
        item.addEventListener('click', turnCard)
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
      document.querySelectorAll(`.item`).forEach((item) => {
        console.log('test')
        item.removeEventListener('click', turnCard)
      })
      clearInterval(counter)
    }
    count = count - 10000
  }, 1000)
}
