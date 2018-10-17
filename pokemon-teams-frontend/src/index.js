const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
  fetchTrainers()
})

function fetchTrainers(){
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.forEach(trainer => render(trainer)))
}

function render(trainer){
  //create card
  let cardDiv = document.createElement("div")
  cardDiv.classList.add("card")
  cardDiv.dataset.id = trainer.id
  document.querySelector("main").appendChild(cardDiv)

  //p Element
  let pElement = document.createElement('p')
  pElement.innerText = trainer.name
  cardDiv.appendChild(pElement)

  //create add pokemon button
  let addPokeButtonElement = document.createElement("button")
  addPokeButtonElement.dataset.trainerId = trainer.id
  addPokeButtonElement.innerText = "Add Pokemon"
  cardDiv.appendChild(addPokeButtonElement)
  addPokeButtonElement.addEventListener('click', addPokemonListener)

  //ul
  let ulElement = document.createElement("ul")
  ulElement.id = `trainer${trainer.id}-pokemon-list`
  cardDiv.appendChild(ulElement)

  //li element for each pokemon
  trainer.pokemons.forEach(pokemon => {
    let liElement = document.createElement("li")
    // liElement.innerText = `${pokemon.nickname} (${pokemon.species})`
    liElement.innerText = pokemon.species
    ulElement.appendChild(liElement)

    //release button for each pokemon
    let releaseButtonElement = document.createElement("button")
    releaseButtonElement.classList.add("release")
    releaseButtonElement.dataset.pokemonId = pokemon.id
    releaseButtonElement.innerText = "Release"
    liElement.appendChild(releaseButtonElement)
    releaseButtonElement.addEventListener("click", releasePokemonListener)
  })
}

function addPokemonListener(){
  let data = {trainer_id: this.dataset.trainerId}

  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json', "Accept": "application/json"},
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(pokemon => renderNewPokemon(pokemon))
}

function renderNewPokemon(pokemon){
  let trainerPokemonList = document.querySelector(`#trainer${pokemon.trainer_id}-pokemon-list`)
  let liElement = document.createElement("li")
  liElement.innerText = pokemon.species
  trainerPokemonList.appendChild(liElement)

  //release button for each pokemon
  let releaseButtonElement = document.createElement("button")
  releaseButtonElement.classList.add("release")
  releaseButtonElement.dataset.pokemonId = pokemon.id
  releaseButtonElement.innerText = "Release"
  liElement.appendChild(releaseButtonElement)
  releaseButtonElement.addEventListener("click", releasePokemonListener)
}

function releasePokemonListener(){
  let pokemonId = this.dataset.pokemonId

  fetch(`${POKEMONS_URL}/${pokemonId}`, {method: "DELETE"})
    .then(() => {
      document.querySelector("main").innerHTML = "";
      fetchTrainers()
    })
}
