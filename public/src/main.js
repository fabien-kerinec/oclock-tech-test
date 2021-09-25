window.onload = function () {
  const itemList = document.querySelectorAll('.item')
  itemList.forEach((item) => {
    item.addEventListener('click', (e) => {
      turnCard(item.dataset.id)
    })
  })
}

function turnCard(id) {
  console.log(id)
}
