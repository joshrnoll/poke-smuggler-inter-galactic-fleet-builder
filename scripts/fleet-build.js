let availableVehicles = [];
if (sessionStorage.getItem("fleet")){
  let fleet = JSON.parse(sessionStorage.getItem("fleet"))
}
else{
  let fleet = [];
}
let inventory = JSON.parse(sessionStorage.getItem("inventory"));
let remainingWeight = inventory.totalWeight;
let inventorySelection = document.getElementById("fleet-builder-selection");

function addToTable(newVehicle, table){
  let newVehicleObj = {}
  newVehicleObj.name = newVehicle.name
  newVehicleObj.cargo_capacity = newVehicle.cargo_capacity

  // Add one to count of existing vehicle
  if (fleet.includes(newVehicleObj)){
    let index = fleet.indexOf(newVehicleObj);
    fleet[index].count += 1
    let tableRow = document.getElementById(`${newVehicle.name}`)
    let countField = tableRow.children[1]
    let cargoCapField = tableRow.children[2]
    countField.innerHTML = fleet[index].count
    cargoCapField.innerHTML = fleet[index].count * newVehicle.cargo_capacity
    sessionStorage.setItem("fleet", JSON.stringify(fleet))
  }

  // Add new vehicle to table
  else{
    newVehicleObj.count = 1;
    fleet.push(newVehicle);

    // Add to HTML table
    let tableDataName = document.createElement("td")
    let tableDataCount = document.createElement("td")
    let tableDataCargoCap = document.createElement("td")
    tableDataName.innerHTML = newVehicleObj.name
    tableDataCount.innerHTML = newVehicleObj.count
    tableDataCargoCap.innerHTML = newVehicleObj.count * newVehicleObj.weight
    let tableRow = document.createElement("tr");
    tableRow.id = `${newVehicleObj.name}`
    tableRow.appendChild(tableDataName)
    tableRow.appendChild(tableDataCount)
    tableRow.appendChild(tableDataCargoCap)
    table.appendChild(tableRow);
    sessionStorage.setItem("fleet", JSON.stringify(fleet))
  }
}

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

// Build vehicle selection elements
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

    // Decrement remaining weight and display on page when fleet is complete
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
      let fleetTable = document.querySelector(".current-inventory")
      addToTable(vehicle, fleetTable);
    })
    divElement.appendChild(h3Element);
    divElement.appendChild(h4Element);
    divElement.appendChild(buttonElement);
    inventorySelection.appendChild(divElement);
  }
})
