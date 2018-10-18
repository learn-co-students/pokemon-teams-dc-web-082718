const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
  getAllTrainers();
})


function getAllTrainers(){
  let main = document.querySelector('main');
  main.innerHTML = "";

  fetch(TRAINERS_URL).
  then(res => res.json()).
  then(data => {
    data.forEach(trainer => renderTrainer(trainer))
  })
}


function renderTrainer(trainer){
  let main = document.querySelector('main');

  let name = trainer.name
  let id = trainer.id




//   <div class="card" data-id="1"><p>Prince</p>
  let div = document.createElement('div');
  div.classList.add('card');
  div.dataset.id = `${id}`;
  main.appendChild(div)

  let p = document.createElement('p');
  p.innerText = name;
  div.appendChild(p);

//   <button data-trainer-id="1">Add Pokemon</button>
  let button = document.createElement('button');
  button.dataset.trainerId = `${id}`;
  button.innerText = "Add Pokemon";
  button.addEventListener('click', addPokemon)
  div.appendChild(button);
  // <ul>
  ul = document.createElement('ul');
  div.appendChild(ul)

  trainer.pokemons.forEach(pokemon => {
    let li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;

    let releaseButton = document.createElement('button');
    releaseButton.classList.add('release');
    releaseButton.dataset.pokemonId = `${pokemon.id}`;
    releaseButton.innerText = "Release";
    releaseButton.addEventListener('click', releaseFunction)

    li.appendChild(releaseButton);
    ul.appendChild(li);
  })
}

function releaseFunction(e){
  let trainerId = e.target.parentElement.parentElement.parentElement.dataset.id;
  let pokeId = e.target.dataset.pokemonId

  fetch(`http://localhost:3000/pokemons/${pokeId}`, {
    method: "DELETE"
  }).
  then(res => res.json()).
  then(data => getAllTrainers());
}


function addPokemon(e){
let trainerId = e.target.dataset.trainerId
let numberOfPoke = e.target.parentElement.querySelector('ul').children.length

  if (numberOfPoke < 6){
    fetch("http://localhost:3000/pokemons", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        trainer_id: trainerId
      })
    }).then(res => res.json()).then(data => getAllTrainers());
  } else {
    alert("This trainer already has a full team. Must first release a pokemon in order to add a new one!")
  }
}
