export class Inventory {
  constructor(){
    if (sessionStorage.getItem("inventory")){
      this.pokemon = JSON.parse(sessionStorage.getItem("inventory")).pokemon
      this.totalWeight = JSON.parse(sessionStorage.getItem("inventory")).totalWeight
    }

    else{
      this.pokemon = [];
      this.totalWeight = 0;
      sessionStorage.setItem("inventory", JSON.stringify(this))
    }
  }

  calculateTotalWeight(){
    this.totalWeight = 0;
    for (let i = 0; i < this.pokemon.length; i++){
      let weightToAdd = this.pokemon[i].weight * this.pokemon[i].count;
      this.totalWeight += weightToAdd;
    }
  }
}

export function generatePokemonQuery(pokemonId){
  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;

  let query = fetch(url)
  .then((rawResponse) => rawResponse.json())
  .catch(() => alert(`No pokemon named ${pokemonId} was found.`))

  return query
}