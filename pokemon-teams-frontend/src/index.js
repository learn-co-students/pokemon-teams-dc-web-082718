const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', function(){
  fetchAllTrainers()
})

function fetchAllTrainers(){
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(data => data.forEach(trainer => renderTrainerCard(trainer)))
}

function renderTrainerCard(trainer){

  //create and append div element
  let div = document.createElement('div')
  div.className = 'card'
  div.setAttribute('data-id', `${trainer.id}`)
  document.querySelector('main').appendChild(div)

  //create and append p element
  let p = document.createElement('p')
  p.innerText = `${trainer.name}`
  div.appendChild(p)

  //create add pokemon button
  let button = document.createElement('button')
  button.setAttribute('data-trainer-id', `${trainer.id}`)
  button.innerText = 'Add Pokemon'
  div.appendChild(button)
  //add event listener for click
  button.addEventListener('click', addPokemonListener)

  //create ul
  let ul = document.createElement('ul')
  ul.dataset.trainerId = trainer.id
  // setAttribute('ul-id-', `${trainer.id}`)
  div.appendChild(ul)

  //li element for each pokemon
  trainer.pokemons.forEach(pokemon => {
    let li = document.createElement('li')
    li.innerText = pokemon.species
    ul.appendChild(li)

    //releaseButton for each li
    let releaseButton = document.createElement("button")
    releaseButton.className = 'release'
    releaseButton.innerText = 'Release'
    releaseButton.dataset.pokemonId = pokemon.id
    li.appendChild(releaseButton)
    //add event listener for click
    releaseButton.addEventListener('click', releasePokemonListener)
  })
}

function addPokemonListener(){
  let data = {trainer_id: this.dataset.trainerId}


  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(() => {
      //re-render trainer card
      document.querySelector('main').innerHTML = ""
      fetchAllTrainers()
    })
}

function releasePokemonListener(){
  let pokemonId = event.target.dataset.pokemonId
  // debugger
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE'
  }).then(response => response.json())
  .then(() => {
    document.querySelector('main').innerHTML = ""
    fetchAllTrainers()
  })
}
