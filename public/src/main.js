window.onload = function () {
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
let counter, maxTime
function countdown(countdown) {
  let count = countdown

  counter = setInterval(function () {
    if (count <= 0) {
      alert('losse')
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
    console.log(percent)
    count = count - 10
  }, 10)
}
