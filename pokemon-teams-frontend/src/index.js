document.addEventListener("DOMContentLoaded",function(){
  Adapter.getTrainers()
  .then(trainers => displayTrainers(trainers))

});

function displayTrainers(trainers){
  trainers.forEach(trainer=> displayTrainer(trainer))
}

function displayTrainer(trainerData){
  const parentNode = document.querySelector("main")
  let trainer = new Trainer(trainerData)
  parentNode.appendChild(trainer.element)
  trainer.node.querySelector("button").addEventListener("click",addPokemon)
  trainer.pokemons.forEach(function(pokemon){
    pokemon.button.addEventListener("click", releasePokemon)
  })
}

function releasePokemon(e){
  let pokemonID = e.target.dataset.pokemonId
  let pokemonNode = document.querySelector(`#pokemon-${pokemonID}`)

  Pokemon.releasePokemon(pokemonID)
  Adapter.releasePokemon(pokemonID).then(pokemonNode.remove())
}

function addPokemon(e){
  let trainer = allTrainers.find(trainerObj => trainerObj.id == e.target.dataset.trainer_id)
  if (trainer.pokemons.length < 6){
    Adapter.addPokemon(trainer.id).then(function(pokemonData){
      let pokemon = new Pokemon(pokemonData)
      displayPokemon(pokemon)
    })
  }
  else{
    alert("Trainer can't have more than 6 pokemons!")
  }
}
function displayPokemon(pokemon){
  let pokeList = pokemon.trainer.node.querySelector("ul")
  pokeList.appendChild(pokemon.element)
  pokemon.button.addEventListener("click", releasePokemon)
}
