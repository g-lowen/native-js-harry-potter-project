let a = document.createElement('a'),
  btnPlayer = document.getElementsByClassName('btn-player'),
  btnSave = document.getElementsByClassName('btn-save')[0],
  li = document.createElement('li'),
  players = JSON.parse(localStorage.getItem('player'))

function addMyTeam() {
  const ul = document.querySelector('#ul'),
    ctx = document.getElementById('myChart').getContext('2d'),
    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(95, 30, 6, 0.2)'
            ],
            borderColor: ['rgba(216, 163, 19, 1)'],
            borderWidth: 0.2
          }
        ]
      }
    })
  for (let i = 0; i < players.length; i++) {
    chart.data.datasets[0].data.push(1)
    chart.data.labels.push(players[i])
    chart.update()
  }
}

// console.log(players)
// a.setAttribute('href', '')
// for (let i = 0; i < players.length; i++) {
//   ul.appendChild(li)
//   li.textContent = players[i]
// }
// a.addEventListener('click', (event) => {
//   // document.querySelector
//   for (let i = 0; i < players.length; i++) {
//     chart.data.datasets[0].data.push(1)
//     chart.data.labels.push(players[i])
//     chart.update()
//   }
// })

btnSave.addEventListener('click', addMyTeam)
