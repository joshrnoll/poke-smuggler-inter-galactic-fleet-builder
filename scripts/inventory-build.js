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
let searchTimeout;

// TODO - allow for hitting 'enter' to submit search
pokeSearch.addEventListener("input", (event) => {
  let query = event.target.value.toLowerCase().trim(); // user input
  clearTimeout(searchTimeout);

  // TODO - fix bug that causes failed query alerts to stack up
  // Convert to named function to allow for event listener removal
  searchTimeout = setTimeout(() => {
    pokeSearchSubmit.addEventListener("click", () =>
      generatePokemonQuery(query)
      .then((pokemon) => {
        document.getElementById("pokebuttons").innerHTML = "";
        buildPokeButtons(pokemon.id, pokeButtons, 8, pokemonInventory);
      })
    )
  }, 500)
});


