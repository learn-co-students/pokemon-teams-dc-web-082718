const allTrainers = []
class Trainer {
  constructor({id, name, pokemons}){
    this.id = id
    this.name = name
    if(pokemons){
      pokemons.forEach(pokemon =>new Pokemon(pokemon))
    }
    allTrainers.push(this)
  }

  get pokemons(){
    return allPokemon.filter(pokemon => pokemon.trainer == this)
  }

  get element(){
      //     <div class="card" data-id="1"><p>Prince</p>
      //   <button data-trainer-id="1">Add Pokemon</button>
      //   <ul>
      //     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
      //     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
      //     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
      //     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
      //     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
      //   </ul>
      // </div>
    this.node = document.createElement("div")
               this.node.dataset.id = `${this.id}`
               this.node.classList= "card"
               this.node.id = `trainer-${this.id}`
    let name = document.createElement("p")
               name.innerText =`${this.name}`
               this.node.appendChild(name)
    let button = document.createElement("button")
                button.dataset.trainer_id = `${this.id}`
                button.innerText = "Add Pokemon"
                this.node.appendChild(button)
    let pokeList = document.createElement("ul")
                   this.pokemons.forEach(function(pokemon){
                    pokeList.appendChild(pokemon.element)
                   })
                   this.node.appendChild(pokeList)
    return this.node
  }
}
