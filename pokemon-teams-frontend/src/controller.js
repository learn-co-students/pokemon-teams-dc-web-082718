class Controller {

  static getAllTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => json.forEach(renderTrainer))
  }

  static addPokemonToTrainer(id) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'trainer_id': `${id}`
      })
    })
    .then(res => res.json())
    .then(json => {
      // What is trainer ID?
      const pokeList = document.querySelector(`div[data-id="${json.trainer_id}"] ul`)
      addPokemonToList(json, pokeList)
    })
  }

  static removePokemonFromTrainer(id) {
    fetch(`${POKEMONS_URL}/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(json => {
      debugger
      // What is trainer ID?
      const pokeList = document.querySelector(`div[data-id="${json.trainer_id}"] ul`)
      removePokemonFromList(json, pokeList)
    })
    }
}
