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
  // .then((pokemonObj) => pokemonObj) // Not needed?

  return query
}

// Takes in a pokemonId as a starting index, a Div element to manipulate, an incrementor, and the inventory element.
// Beginning at the starting index, it will build out elements inside of the buttonsElement which
// include the pokemon name, image, and an 'add' button. Each time the function is called, it will add
// additional elements according to the incrementor. Event listeners are added to the add buttons which
// update the current inventory when clicked.
export function buildPokeButtons(startingIndex, buttonsElement, incrementor, inventory) {
  for (let i = startingIndex; i < startingIndex + incrementor; i++){
    let query = generatePokemonQuery(i);

    let divElement = document.createElement("div");
    divElement.classList.add("pokebutton");
    let imgElement = new Image(250,250);
    let pElement = document.createElement("p");
    let buttonElement = document.createElement("button");
    buttonElement.classList.add("pokemon-add-button");

    query.then((pokemon) => imgElement.src=pokemon.sprites.front_default);

    query.then((pokemon) => {
      let pokemonName = [...pokemon.name]; // Convert string to array to allow for splicing
      let firstLetter = pokemon.name[0].toUpperCase();
      pokemonName.splice(0,1,firstLetter)
      pokemonName = pokemonName.join(''); // Rejoin array back to string
      pElement.innerHTML=pokemonName;
    });
    buttonElement.innerHTML = "Add";

    query.then((pokemon) => buttonElement.addEventListener("click", () => {
      let pokemonObj = {};
      pokemonObj.name = pokemon.name;
      pokemonObj.weight = pokemon.weight;

      let topDiv = document.getElementById("top-block")
      let pokeSearch = document.getElementById("pokesearch")
      let inventoryTable = document.querySelector(".current-inventory")
      // If there's already a pokemon in inventory by that name, add one to count
      if (inventory.pokemon.some((obj) => obj.name === pokemon.name)){
        let index = inventory.pokemon.findIndex((obj) => obj.name === pokemon.name);
        inventory.pokemon[index].count += 1
        let tableRow = document.getElementById(`${pokemon.name}`)
        let countField = tableRow.children[1]
        let weightField = tableRow.children[2]
        countField.innerHTML = inventory.pokemon[index].count
        weightField.innerHTML = inventory.pokemon[index].count * pokemon.weight
      }

      // Add new pokemon to inventory
      else{
        pokemonObj.count = 1;
        inventory.pokemon.push(pokemonObj);

        // Add to HTML table
        let tableDataName = document.createElement("td")
        let tableDataCount = document.createElement("td")
        let tableDataWeight = document.createElement("td")
        tableDataName.innerHTML = pokemon.name
        tableDataCount.innerHTML = pokemonObj.count
        tableDataWeight.innerHTML = pokemonObj.count * pokemon.weight
        let tableRow = document.createElement("tr");
        tableRow.id = `${pokemon.name}`
        tableRow.appendChild(tableDataName)
        tableRow.appendChild(tableDataCount)
        tableRow.appendChild(tableDataWeight)
        inventoryTable.appendChild(tableRow);
      }

      // Update inventory in session storage
      inventory.totalWeight += pokemon.weight;
      sessionStorage.setItem("inventory", JSON.stringify(inventory))

      // Update display
      let currentTotalWeight = document.getElementById("current-total-weight");
      // let nextButton = document.createElement("button");
      // nextButton.id = "next-button";
      // nextButton.type = "button";
      // nextButton.innerHTML = "Build your fleet >>"
      // nextButton.addEventListener("click", () => window.location.href="fleet-build.html")
      // if (inventory.pokemon.length === 1){
      //   topDiv.insertBefore(nextButton, pokeSearch);
      // }
      let nextButton = document.getElementById("next-button")
      nextButton.addEventListener("click", () => window.location.href="fleet-build.html")
      currentTotalWeight.innerHTML = `Current Total Weight: <span id=total>${inventory.totalWeight}</span>`
    }))

    divElement.appendChild(pElement);
    divElement.appendChild(imgElement);
    divElement.appendChild(buttonElement);
    buttonsElement.appendChild(divElement);
  }
}