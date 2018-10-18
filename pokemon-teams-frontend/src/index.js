document.addEventListener('DOMContentLoaded', () => {
  fetchTrainers()
})
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(data => {data.forEach(trainer => renderCard(trainer))
  })
}

function renderCard(trainer) {
  let main = document.querySelector("main")

  let card = document.createElement("div")
  card.className = "card"
  card.dataset.id = trainer.id
  main.appendChild(card)

  card.innerHTML = `<p>${trainer.name}</p>`

  let btn = document.createElement("button")
  btn.dataset.id = trainer.id
  btn.innerText = "Add Pokemon"
  btn.addEventListener('click', addPokemon)
  card.appendChild(btn)

  let ul = document.createElement("ul")
  card.appendChild(ul)
  trainer.pokemons.forEach(pokemon => {
    let li = document.createElement("li")
    li.id = `pokemon-${pokemon.id}`
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    let pokeBtn = document.createElement("button")
    pokeBtn.className = "release"
    pokeBtn.dataset.id = pokemon.id
    pokeBtn.innerText = "Release"
    pokeBtn.addEventListener('click', releasePokemon)

    li.appendChild(pokeBtn)
    ul.appendChild(li)
  })
}


function addPokemon(event) {
  event.preventDefault()
  let trainerId = event.currentTarget.dataset.id
  let data = {trainer_id: trainerId}
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
    })
  .then(response => response.json())
  .then(json=> {renderPokemon(json)})
}

function renderPokemon(json) {
  let clickedCard = document.querySelector(`div[data-id='${json.trainer_id}']`)

  let list = clickedCard.querySelector('ul')

  let li = document.createElement("li")
  li.id = `pokemon-${json.id}`
  li.innerText = `${json.nickname} (${json.species})`
  let pokeBtn = document.createElement("button")
  pokeBtn.className = "release"
  pokeBtn.dataset.id = json.id
  pokeBtn.innerText = "Release"
  pokeBtn.addEventListener('click', releasePokemon)

  li.appendChild(pokeBtn)
  list.appendChild(li)
}

function releasePokemon(event) {
  let pokeId = event.currentTarget.dataset.id
  fetch(`${POKEMONS_URL}/${pokeId}`, {
    method: "DELETE"
 })
 .then((response) => {
   document.getElementById(`pokemon-${pokeId}`).remove()
 })
}
