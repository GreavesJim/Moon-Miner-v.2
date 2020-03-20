let cheese = {
  count: 0
};
let addToCount = 1;
let multiplier = 1;
let passive = 0;

let state = {
  cheese: 0,
  clickItems: {
    pickaxe: {
      purchased: 0,
      cost: 20,
      addToCount: 1
    },
    drill: {
      purchased: 0,
      cost: 50,
      multiplierAdd: 0.5
    }
  },
  autoItems: {
    excavator: {
      purchased: 0,
      cost: 75,
      passiveAdd: 1
    },
    crew: {
      purchased: 0,
      cost: 200,
      passiveAdd: 5
    }
  }
};

function autoMine() {
  let total = 0;
  for (var key in state.autoItems) {
    total += state.autoItems[key].purchased * state.autoItems[key].passiveAdd;
  }
  state.cheese += total;
}

function mine() {
  let total = 0;
  for (var key in state.clickItems) {
    total += state.clickItems[key].purchased * state.clickItems[key].passiveAdd;
  }
  state.cheese += total;
}

function altMine(auto) {
  let total = 0;
  let items = state.clickItems;
  if (auto) {
    // @ts-ignore
    items = state.autoItems;
  }
  for (var key in items) {
    total += items[key].purchased * items[key].passiveAdd;
  }
  state.cheese += total;
}

var pickaxe = {
  purchased: 0,
  cost: 20,
  addToCount: 1
};
let drill = {
  purchased: 0,
  cost: 50,
  multiplierAdd: 0.5
};
let excavator = {
  purchased: 0,
  cost: 75,
  passiveAdd: 1
};
let crew = {
  purchased: 0,

  cost: 200,
  passiveAdd: 5
};

let cheeseTotal = document.querySelector("#cheese");
let Multiplier = document.querySelector("#multiplier");
let pickaxeTotal = document.querySelector("#pickaxeCount");
let drillTotal = document.querySelector("#drillCount");
let excavatorTotal = document.querySelector("#excavatorCount");
let crewTotal = document.querySelector("#crewCount");
let PickaxeCost = document.querySelector("#pickaxeCost");
let ExcavatorCost = document.querySelector("#excavatorCost");
let DrillCost = document.querySelector("#drillCost");
let CrewCost = document.querySelector("#crewCost");
let CountAdd = document.querySelector("#coundAdd");
let PerSec = document.querySelector("#perSec");

function Mine() {
  cheese.count += addToCount * multiplier;
  cheese.count = Math.floor(cheese.count);
  drawMine();
}

function drawMine() {
  cheeseTotal.innerText = cheese.count;
  pickaxeTotal.innerText = pickaxe.purchased;
  drillTotal.innerText = drill.purchased;
  excavatorTotal.innerText = excavator.purchased;
  crewTotal.innerText = crew.purchased;
  PickaxeCost.innerText = pickaxe.cost;
  ExcavatorCost.innerText = excavator.cost;
  DrillCost.innerText = drill.cost;
  CrewCost.innerText = crew.cost;
  Multiplier.innerText = multiplier;
  CountAdd.innerText = addToCount;
  PerSec.innerText = passive;
}
drawMine();

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function buyExcavator() {
  if (cheese.count > excavator.cost) {
    cheese.count -= excavator.cost;
    excavator.purchased += 1;
    passive += excavator.passiveAdd;
    let newCost = (excavator.cost *= 1.25);
    excavator.cost = Math.floor(newCost);
    drawMine();
  }
}

function buy(type, name) {
  let item = state[type][name];
  if (item && item.cost < state.cheese) {
    item.purchased++;
    state.cheese -= item.cost;
  }
}

function buyDrill() {
  if (cheese.count > drill.cost) {
    cheese.count -= drill.cost;
    drill.purchased += 1;
    multiplier += drill.multiplierAdd;
    let newCost = (drill.cost *= 1.25);
    drill.cost = Math.floor(newCost);
    drawMine();
  }
}
function buyCrew() {
  if (cheese.count > crew.cost) {
    cheese.count -= crew.cost;
    crew.purchased += 1;
    passive += crew.passiveAdd;
    let newCost = (crew.cost *= 1.25);
    crew.cost = Math.floor(newCost);
    drawMine();
  }
}
function buyPickaxe() {
  if (cheese.count > pickaxe.cost) {
    cheese.count -= pickaxe.cost;
    pickaxe.purchased += 1;
    addToCount += pickaxe.addToCount;
    let newCost = (pickaxe.cost *= 1.25);
    pickaxe.cost = Math.floor(newCost);
    drawMine();
  }
}
setInterval(
  function() {
    cheese.count += passive;
    drawMine();
  },

  2000
);
