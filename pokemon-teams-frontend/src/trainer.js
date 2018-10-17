class Trainer {

  constructor({id, name, pokemons}) {
    this.id = id;
    this.name = name;
    this.pokemons = pokemons;
  }

  element() {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = this.id

    const header = document.createElement('p');
    header.innerText = this.name;
    div.append(header);

    const addButton = document.createElement('button');
    addButton.innerText = "Add Pokemon";
    addButton.dataset.id = this.id;
    addButton.addEventListener('click', Controller.handleAddPokemon)
    div.append(addButton);

    const pokeUl = document.createElement('ul');
    pokeUl.id = `ul-${this.id}`
    div.append(pokeUl);


    this.pokemons.forEach(function(pokemon) {
      const newPokemon = new Pokemon(pokemon)
      pokeUl.append(newPokemon.li())
    })

    return div;

  }

}
