const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

class Adapter {

  static fetchTrainers() {
    return fetch(TRAINERS_URL).then(res => res.json());
  }

  static addPokemon(id) {

    const data = {trainer_id: id}

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    return fetch(POKEMONS_URL, options).then(res => res.json())

  }

  static deletePokemon(id) {

    const url = POKEMONS_URL + '/' + id

    const options = {
      method: 'DELETE'
    }

    return fetch(url, options)

  }

}
