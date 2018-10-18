const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    Controller.getAllTrainers()
})

function renderTrainer(data) {
  let trainerBox = document.querySelector('main')
  let trainerCard = document.createElement('div')
  trainerCard.classList.add('card')
  trainerCard.dataset.id = data.id
  trainerBox.appendChild(trainerCard)

  let trainerName = document.createElement('h2')
  trainerName.innerText = data.name
  trainerCard.appendChild(trainerName)

  let addButton = document.createElement('button')
  addButton.dataset.trainerId = data.id
  addButton.innerText = "Add Pokemon"
  addButton.addEventListener('click', addPokemonToTrainer)
  trainerCard.appendChild(addButton)

  let pokeList = document.createElement('ul')
  trainerCard.appendChild(pokeList)
  for (const pokemon of data.pokemons) {
    addPokemonToList(pokemon, pokeList)
  }
}

function addPokemonToList(pokemon, pokeList) {
  let releaseButton = document.createElement('button')
  releaseButton.classList.add('release')
  releaseButton.dataset.pokemonId = pokemon.id
  releaseButton.innerText = "Release"
  releaseButton.addEventListener('click', removePokemonFromTrainer)

  let pokemonLi = document.createElement('li')
  pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
  pokemonLi.appendChild(releaseButton)
  pokeList.appendChild(pokemonLi)
}

function addPokemonToTrainer(event) {
  let pokeCount = event.target.nextSibling.childNodes.length
   if (pokeCount < 6) {
     let trainerId = event.target.dataset.trainerId
     Controller.addPokemonToTrainer(trainerId)
   }
}

function removePokemonFromTrainer(event) {
  let pokeCount = event.target.parentElement.parentElement.childNodes.length
  if (pokeCount > 0) {
    let pokemonId = event.target.dataset.pokemonId
    Controller.removePokemonFromTrainer(pokemonId)
    event.target.parentElement.remove()
  }
}
