const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', function(event){
  fetchTrainers()
})

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(r => r.json())
    .then(trainers => {
      trainers.forEach(trainer => renderTrainerCard(trainer))
    })
}

function renderTrainerCard(trainer) {
  let trainerName = document.createElement('h2')
  trainerName.innerText = `${trainer.name}`
  let trainerCard = document.createElement('div')
  let pokeListBox = document.createElement('ul')
  trainerCard.classList.add("card")
  trainerCard.id = `${trainer.name}`
  let ul = document.createElement('ul')
  ul.id = `${trainer.name}-${trainer.id}`
  trainerCard.appendChild(ul)
  trainerCard.appendChild(trainerName)
  let addPokemonButton = document.createElement('button')
  addPokemonButton.id = "add-pokemon"
  addPokemonButton.innerText = "add a pokemon"
  addPokemonButton.addEventListener('click', function(event){
    catchaPokemon(trainer)
  })
  trainerCard.appendChild(addPokemonButton)
  trainer.pokemons.forEach(pokemon => {
    let pokeList = document.createElement('li')
    pokeList.innerText = `${pokemon.nickname} (${pokemon.species})`

    let pokeButton = document.createElement('button')
    pokeButton.classList.add("release")
    pokeButton.dataset.id = pokemon.id
    pokeButton.innerText = "kill this pokemon"
    pokeButton.addEventListener('click', function(event){
      removeaPokemon(pokemon);
    })

    pokeList.appendChild(pokeButton)
    pokeListBox.appendChild(pokeList)
  })
  trainerCard.appendChild(pokeListBox)
  document.getElementById("main-box").appendChild(trainerCard)
}

function removeaPokemon(pokemon) {
  console.log(`you are about to remove ${pokemon.nickname}`)
  let id = event.currentTarget.dataset.id
  let url = `${POKEMONS_URL}/${id}`
  let options = {
    method: "DELETE"
  }
  fetch(url, options)
    .then(r => r.json())
    .then(data => {
      let box = document.getElementById("main-box")
      box.innerHTML = ""
      console.log(`deleted ${pokemon.nickname}`)
      fetchTrainers()
    })
}

function catchaPokemon(trainer) {
  console.log(trainer.name)
  console.log(`trainer has ${trainer.pokemons.length} pokemon`)
  if (trainer.pokemons.length < 6) {
    console.log("you can add pokemon")
    let url = POKEMONS_URL
    let id = trainer.id
    let body = {
      trainer_id: trainer.id
    }
    let options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch(url, options)
    .then(r => r.json())
    .then(data => {
      let box = document.getElementById("main-box")
      box.innerHTML = ""
      trainer.pokemons.push(data)
      fetchTrainers()
    })
  }
  else {
    alert("Your shit is full bitch")
  }
}
