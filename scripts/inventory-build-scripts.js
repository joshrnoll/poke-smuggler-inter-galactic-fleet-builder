function generateRandomArray(){
  let result = [];
  const minCeiled = Math.ceil(1);
  const maxFloored = Math.floor(1025); // total number of Pokemon in PokeAPI database

  for (let i = 0; i < 10; i++){
    result.push(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled));
  }
  return result;
}

function generatePokemonQuery(pokemonId){
  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;

  let query = fetch(url)
  .then((rawResponse) => rawResponse.json())
  .then((pokemonObj) => pokemonObj)

  return query
}

let pokeButtons = document.querySelector(".pokebuttons");
let randomPokeIds = generateRandomArray();
let randomPokeQueries = [];
for (i = 0; i < randomPokeIds.length; i++){
  let query = generatePokemonQuery(randomPokeIds[i]);
  randomPokeQueries.push(query);
}

for (i = 0; i < randomPokeQueries.length; i++){
  let imgElement = new Image(250,250);
  randomPokeQueries[i].then((pokemon) => imgElement.src=pokemon.sprites.front_default)
  pokeButtons.appendChild(imgElement)
}