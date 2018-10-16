const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


class Adapter {

  static getTrainers(){
    return fetch(TRAINERS_URL)
    .then(response => response.json())
  }

  static releasePokemon(pokemonID){
    let url = POKEMONS_URL +`/${pokemonID}`
    return fetch(url,{
      method: "DELETE"
    }).then(response=> response.json())
  }
  static addPokemon(trainerId){
    let url = POKEMONS_URL
    let body = {"trainer_id":trainerId}
    return fetch(url,{
      method:"POST",
      headers:
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response=>response.json())
  }
}
