let nameChange = document.querySelector('#name'),
  populateChange = document.querySelector('#population'),
  change = document.querySelector('#change')

let nameAdd = document.querySelector('#name-add'),
  populateAdd = document.querySelector('#population-add'),
  add = document.querySelector('#add')

let nameRemove = document.querySelector('#name-remove'),
  populateRemove = document.querySelector('#population-remove'),
  remove = document.querySelector('#remove')

change.setAttribute('disabled', '')
// add.setAttribute('disabled', '')
// remove.setAttribute('disabled', '')

function enableChangeButton() {
  let inputId = document.querySelector('#name').value,
    inputName = document.querySelector('#name').value,
    inputPopulation = document.querySelector('#population').value
  if (inputId === '' && inputName === '' && inputPopulation === '') {
    change.setAttribute('disabled', '')
  }
  if (inputName.length > 0) {
    change.removeAttribute('disabled', '')
  }
  if (inputPopulation.length > 0) {
    change.removeAttribute('disabled', '')
  }
}

function enableRemoveButton() {
  let cityRemove = document.querySelector('#city-remove').value
  if (cityRemove === '') {
    remove.setAttribute('disabled', '')
  }
  if (cityRemove.length > 0) {
    remove.removeAttribute('disabled', '')
  }
}

document
  .querySelector('#form-patch')
  .addEventListener('submit', function (event) {
    // let id = document.querySelector('#city').value, FRÅGA OM DETTA
    // let id = '4bc43d96-3e84-4695-b777-365dbed33f89',
    let id = document.querySelector('#city').value,
      inputName = document.querySelector('#name').value,
      inputPopulation = document.querySelector('#population').value
    // if (id === 'Stockholm') {
    //   let id = '4bc43d96-3e84-4695-b777-365dbed33f89'
    //   console.log(id)
    // }

    let patch = {
      name: inputName,
      population: Number(inputPopulation)
    }
    if (inputName === '') {
      patch = {
        population: Number(inputPopulation)
      }
    } else if (inputPopulation === null) {
      patch = {
        name: inputName
      }
    }

    fetch('https://avancera.app/cities/' + id, {
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    }).then((response) => {
      console.log(response)
    })
    event.preventDefault()
  })

document
  .querySelector('#form-add')
  .addEventListener('submit', function (event) {
    let nameInput = document.querySelector('#name-add').value,
      populationInput = document.querySelector('#population-add').value
    // patch = {
    //   name: nameInput,
    //   population: Number(populationInput)
    // }
    fetch('https://avancera.app/cities/', {
      body: JSON.stringify({
        name: nameInput,
        population: Number(populationInput)
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
      })
    event.preventDefault()
  })

document
  .querySelector('#form-remove')
  .addEventListener('submit', function (event) {
    let id = document.querySelector('#city-remove').value
    fetch('https://avancera.app/cities/' + id, {
      method: 'DELETE'
    }).then((response) => {
      console.log(response)
    })
    event.preventDefault()
  })

nameChange.addEventListener('input', enableChangeButton)
populateChange.addEventListener('input', enableChangeButton)
// remove.addEventListener('input', enableRemoveButton)

const filter = document.querySelector('#filter'),
  img = document.querySelector('img'),
  loading = document.querySelector('#loading'),
  ol = document.querySelector('#ol')

fetch('https://avancera.app/cities/')
  .then((response) => response.json())
  .then((result) => {
    cities = result

    for (let i = 0; i < cities.length; i++) {
      ol.innerHTML +=
        '<li>' + cities[i].name + ' (' + cities[i].population + ')</li>'
    }
  })
