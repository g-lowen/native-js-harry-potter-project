fetch('http://hp-api.herokuapp.com/api/characters')
  .then((response) => response.json())
  .then((result) => {
    function filterByImage(result) {
      if (result.image !== '') {
        return true
      }
    }
    let character = document.querySelector('#character'),
      resultByImage = result.filter(filterByImage)

    for (let n = 0; n < Math.min(resultByImage.length, 12); n++) {
      const button = document.createElement('input'),
        card = document.createElement('section'),
        img = document.createElement('img')

      let btnSave = document.getElementsByClassName('btn-save')[0],
        myTeamTotal = document.getElementsByClassName('my-team-total')[0],
        rand = Math.floor(Math.random() * resultByImage.length),
        randChar = resultByImage[rand],
        removeMyTeamPlayerButtons = document.querySelectorAll('.btn-danger')

      resultByImage.splice(rand, 1)

      img.setAttribute('src', randChar.image)
      img.style.borderRadius = '20px'
      img.style.height = '120px'
      img.style.width = '100px'

      button.setAttribute('type', 'button')
      button.setAttribute('value', `Add to My team`)
      // button.addEventListener('click', addToMyTeamClicked)
      card.addEventListener('click', addToMyTeamClicked)

      function addToMyTeamClicked() {
        let myTeamImg = randChar.image
        updateMyTeamTotal()
        addPlayerToMyTeam(myTeamImg)
      }

      function addPlayerToMyTeam(myTeamImg) {
        let myTeamRow = document.createElement('div')
        myTeamRow.classList.add('my-team-row')
        let myTeamPlayers =
            document.getElementsByClassName('my-team-players')[0],
          myTeamPlayer = document.getElementsByClassName('my-team-player-image')

        disableButton()
        enableButton()

        for (let i = 0; i < myTeamPlayer.length; i++) {
          if (myTeamPlayer[i].src == myTeamImg) {
            alert(randChar.name + ' is already in My team')
            return
          }
        }

        let myTeamRowContents = `
        <div class="my-team-player my-team-column">
          <img
            class="my-team-player-image"
            src="${myTeamImg}"
            alt="Spelare"
            width="50"
            height="60"
            data-playerName="${randChar.name}"
          />
        </div>
        <div class="my-team-quantity my-team-column">
          <input class="my-team-quantity-input" type="number" value="1" />
          <button class="btn my-btn btn-danger" type="button">Remove</button>
        </div>
        `
        myTeamRow.innerHTML = myTeamRowContents
        myTeamPlayers.append(myTeamRow)
        myTeamRow
          .getElementsByClassName('btn-danger')[0]
          .addEventListener('click', removeMyTeamPlayer)
        myTeamRow.getElementsByClassName('my-team-quantity-input')[0]

        button.style.background =
          '-webkit-linear-gradient(rgba(216, 163, 19, 0.5), rgba(216, 120, 19, 0.5))'
        button.style.border = 'rgba(216, 120, 19, 0.5) solid 1px'
        button.style.borderRadius = '0.3em'
        button.style.color = 'white'
        button.style.fontFamily = 'sans-serif'
        button.style.fontWeight = 'bold'
        button.style.textAlign = 'center'
        button.style.textShadow = '2px 2px 0px rgba(0, 0, 0, 0.2)'
        button.style.verticalAlign = 'middle'
        button.style.webkitBackgroundClip = 'text'
        button.style.webkitTextFillColor = 'transparent'
        updateMyTeamTotal()
      }

      function disableButton() {
        if (Number(myTeamTotal.innerText) >= 7) {
          for (let i = 0; i < 12; i++) {
            myTeamImg[i]
            button.setAttribute('disabled', '')
          }
        }
      }

      function enableButton() {
        if (Number(myTeamTotal.innerText) < 7) {
          button.removeAttribute('disabled', '')
        }
      }

      for (let i = 0; i < removeMyTeamPlayerButtons.length; i++) {
        let buttonRemove = removeMyTeamPlayerButtons[i]
        buttonRemove.addEventListener('click', removeMyTeamPlayer)
      }

      function removeMyTeamPlayer(event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        button.style.background =
          '-webkit-linear-gradient(rgba(216, 163, 19, 1), rgba(216, 120, 19, 1))'
        button.style.border = 'rgba(216, 120, 19, 1) solid 1px'
        button.style.borderRadius = '0.3em'
        button.style.color = 'white'
        button.style.fontFamily = 'sans-serif'
        button.style.fontWeight = 'bold'
        button.style.textAlign = 'center'
        button.style.textShadow = '2px 2px 0px rgba(0, 0, 0, 0.2)'
        button.style.verticalAlign = 'middle'
        button.style.webkitBackgroundClip = 'text'
        button.style.webkitTextFillColor = 'transparent'
        updateMyTeamTotal()
      }

      function saveMyTeamClicked() {
        let myTeam = []
        let myTeamPlayers =
          document.getElementsByClassName('my-team-players')[0]
        let myTeamPlayerImage = document.getElementsByClassName(
          'my-team-player-image'
        )
        button.style.background =
          '-webkit-linear-gradient(rgba(216, 163, 19, 1), rgba(216, 120, 19, 1))'
        button.style.border = 'rgba(216, 120, 19, 1) solid 1px'
        button.style.borderRadius = '0.3em'
        button.style.color = 'white'
        button.style.fontFamily = 'sans-serif'
        button.style.fontWeight = 'bold'
        button.style.textAlign = 'center'
        button.style.textShadow = '2px 2px 0px rgba(0, 0, 0, 0.2)'
        button.style.verticalAlign = 'middle'
        button.style.webkitBackgroundClip = 'text'
        button.style.webkitTextFillColor = 'transparent'

        while (myTeamPlayers.hasChildNodes()) {
          myTeam.push(myTeamPlayerImage[0].dataset.playername)
          myTeamPlayers.removeChild(myTeamPlayers.firstChild)
          localStorage.setItem('player', JSON.stringify(myTeam))
        }
        updateMyTeamTotal()
      }

      function updateMyTeamTotal() {
        let myTeamPlayerContainer =
            document.getElementsByClassName('my-team-players')[0],
          myTeamRows =
            myTeamPlayerContainer.getElementsByClassName('my-team-row')
        total = 0

        for (let i = 0; i < myTeamRows.length; i++) {
          let myTeamRow = myTeamRows[i]
          let quantityElement = myTeamRow.getElementsByClassName(
            'my-team-quantity-input'
          )[0]
          let quantity = quantityElement.value
          total = Number(total) + Number(quantity)
        }
        myTeamTotal.innerText = total
      }

      character.appendChild(card)

      btnSave.addEventListener('click', saveMyTeamClicked)

      let buttonStyleEnable = (button.style.background =
        '-webkit-linear-gradient(rgba(216, 163, 19, 1), rgba(216, 120, 19, 1))')
      button.style.border = 'rgba(216, 120, 19, 1) solid 1px'
      button.style.borderRadius = '0.3em'
      button.style.color = 'white'
      button.style.fontFamily = 'sans-serif'
      button.style.fontWeight = 'bold'
      button.style.textAlign = 'center'
      button.style.textShadow = '2px 2px 0px rgba(0, 0, 0, 0.2)'
      button.style.verticalAlign = 'middle'
      button.style.webkitBackgroundClip = 'text'
      button.style.webkitTextFillColor = 'transparent'

      card.appendChild(img)
      card.appendChild(button)
      card.classList.add('col-sm-6')
      card.classList.add('col-md-4')
      card.style.padding = '15px'
      card.style.textAlign = 'center'

      button.classList.add('add-player-button')
      buttonStyleEnable
    }
  })
