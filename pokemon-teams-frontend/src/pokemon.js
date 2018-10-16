let allPokemon = []
class Pokemon{
  constructor({id, nickname,species,trainer_id}){
    this.id = id
    this.nickname = nickname
    this.species = species
    this.trainer_id = trainer_id
    this.element = this.elementGenerator()
    allPokemon.push(this)
  }

  get trainer(){
    return allTrainers.find(trainer => trainer.id == this.trainer_id)
  }

 elementGenerator(){
    // <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    let node = document.createElement("li")
    node.id = `pokemon-${this.id}`
    node.innerHTML = `${this.nickname} (${this.species}) <button class="release" data-pokemon-id="${this.id}">Release</button>`
    this.button = node.querySelector("button")
    return node
  }

  static releasePokemon(pokemonID){
    allPokemon = allPokemon.filter(pokemon=> pokemon.id != pokemonID)
  }
}
