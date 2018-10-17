class Controller {

  static init() {
    Adapter.fetchTrainers().then(Controller.renderTrainers)
  }

  static renderTrainers(trainersJson) {
    trainersJson.forEach(Controller.renderTrainer)
  }

  static renderTrainer(trainerData) {
    const newTrainer = new Trainer(trainerData);
    const main = document.querySelector('body > main')
    main.append(newTrainer.element())
  }

  static handleAddPokemon(e) {
    const id = e.target.dataset.id;
    const ul = document.querySelector(`#ul-${id}`)

    if(ul.childNodes.length < 6) {
      Adapter.addPokemon(id).then(function(pokeData) {
        const newPokemon = new Pokemon(pokeData);
        ul.append(newPokemon.li())
      })
    }

  }

  static handleDeletePokemon(e) {
    const id = e.target.dataset.id;
    const li = document.querySelector(`#li-${id}`)
    Adapter.deletePokemon(id);
    li.remove()
  }

}
