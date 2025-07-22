import { generatePokemonQuery } from './lib.js'
import { buildPokeButtons } from './lib.js'
import { Inventory } from './lib.js'

let pokemonInventory = new Inventory();

// Add first 10 pokemon to selection
let pokeButtons = document.getElementById("pokebuttons");
let resetButton = document.getElementById("pokesearch-reset")
let moreButton = document.getElementById("pokebuttons-more")
let pokeIndex = 1

buildPokeButtons(pokeIndex, pokeButtons, 8, pokemonInventory);

moreButton.addEventListener("click", () => {
  pokeIndex += 8;
  buildPokeButtons(pokeIndex, pokeButtons, 8, pokemonInventory);
})

resetButton.addEventListener("click", () => {
  pokeIndex = 1;
  pokeButtons.innerHTML = "";
  buildPokeButtons(pokeIndex, pokeButtons, 8, pokemonInventory);
})

// Search functionality
let pokeSearch = document.getElementById("pokesearch-input");
let pokeSearchSubmit = document.getElementById("pokesearch-button")

// TODO - allow for hitting 'enter' to submit search
// pokeSearch.addEventListener("blur", () => {
//   let query = pokeSearch.value.toLowerCase().trim(); // user input
//   generatePokemonQuery(query)
//   .then((pokemon) => {
//     document.getElementById("pokebuttons").innerHTML = "";
//     buildPokeButtons(pokemon.id, pokeButtons, 8, pokemonInventory);
//   })
// })

pokeSearch.addEventListener("keyup", (event) => {
  let query = pokeSearch.value.toLowerCase().trim(); // user input
  if (event.key === "Enter"){
    generatePokemonQuery(query)
    .then((pokemon) => {
      document.getElementById("pokebuttons").innerHTML = "";
      buildPokeButtons(pokemon.id, pokeButtons, 8, pokemonInventory);
    })
  }
})

pokeSearchSubmit.addEventListener("click", () => {
  let query = pokeSearch.value.toLowerCase().trim(); // user input
  generatePokemonQuery(query)
  .then((pokemon) => {
    document.getElementById("pokebuttons").innerHTML = "";
    buildPokeButtons(pokemon.id, pokeButtons, 8, pokemonInventory);
  })
})