class Pokemon {

  constructor({id, nickname, species, trainer_id}) {
    this.id = id;
    this.nickname = nickname;
    this.species = species;
    this.trainer_id = trainer_id;
  }

  li() {
    const li = document.createElement('li');
    li.innerText = `${this.nickname} (${this.species})`;
    li.id = `li-${this.id}`

    const releaseButton = document.createElement('button');
    releaseButton.innerText = "Release"
    releaseButton.classList.add('release');
    releaseButton.dataset.id = this.id;
    releaseButton.addEventListener('click', Controller.handleDeletePokemon)
    li.append(releaseButton);

    return li;
  }

}
