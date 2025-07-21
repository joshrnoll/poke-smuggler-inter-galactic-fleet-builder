let availableVehicles = [];
let fleet = [];
let inventory = JSON.parse(sessionStorage.getItem("inventory"));
let remainingWeight = inventory.totalWeight;
let inventorySelection = document.getElementById("fleet-builder-selection");

// Get all starships
fetch("https://swapi.info/api/starships")
.then((response) => response.json())
.then((starships) => {
  for (let starship of starships){
    if (starship.cargo_capacity >= inventory.totalWeight){
      availableVehicles.push(starship);
    }
  }
})

// Get all vehicles
.then(
  fetch("https://swapi.info/api/vehicles")
  .then((response) => response.json())
  .then((vehicles) => {
    for (let vehicle of vehicles){
      if (vehicle.cargo_capacity >= inventory.totalWeight){
        availableVehicles.push(vehicle);
      }
    }
  })
)

// Build weight remaining display
.then(() =>{
  let weightRemainingHeader = document.createElement("h1");
  weightRemainingHeader.innerHTML = `Weight Remaining: <span id=weight-remaining>${remainingWeight}</span>`
  weightRemainingHeader.id = "weight-remaining-header"
  let bodyElement = document.getElementsByTagName("body")
  bodyElement[0].insertBefore(weightRemainingHeader, inventorySelection)
})

// Decrement remaining weight with each selection
.then(() => {
  for (let vehicle of availableVehicles){
    let divElement = document.createElement("div");
    let h3Element = document.createElement("h3");
    let h4Element = document.createElement("h4");
    h3Element.innerHTML = vehicle.name;
    h4Element.innerHTML = `Cargo capacity: ${vehicle.cargo_capacity} lbs`
    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.innerHTML = "Select"
    buttonElement.addEventListener("click", () => {
      remainingWeight -= Number(vehicle.cargo_capacity);
      let weightRemainingHeader = document.getElementById("weight-remaining-header")
      if (remainingWeight === 0){
        weightRemainingHeader.innerHTML = "Perfect Pack!"
      }
      else if (remainingWeight < 0){
        weightRemainingHeader.innerHTML = `Fleet Complete! You have <span id=weight-remaining>${remainingWeight - (remainingWeight * 2)} lbs</span> of unused capacity.`
      }
      else{
        weightRemainingHeader.innerHTML = `Weight Remaining: <span id=weight-remaining>${remainingWeight}<span>`
      }
    })
    divElement.appendChild(h3Element);
    divElement.appendChild(h4Element);
    divElement.appendChild(buttonElement);
    inventorySelection.appendChild(divElement);
  }
})
