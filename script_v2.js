let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
let changeResult = {
  status: "",
  change: []
}

const changeDueEl = document.getElementById("change-due");
const inputCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");

const checkResult = () => {
  //controllo sul valore inserito != 0
  //nel caso valore inserito > 0 allora calcolo il resto
  if (!inputCash.value) {
    alert("Please, insert customer payment!");
    return;
  }
  calculateChangeDue();
};

const calculateChangeDue = () => {
  console.log("calculateChangeDue function:");
  //verifico se input è uguale al prezzo
  if (Number(inputCash.value) === price) {
    changeDueEl.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    inputCash.value = "";
    return;
  }
  //o se è inferiore al prezzo
  if (Number(inputCash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    //changeDueEl.innerHTML = `<p>Customer does not have money to purchase item(s)</p>`;
    return;
  }

  //calcolo il resto e controllo lo stato
  let change = parseFloat((inputCash.value - price).toFixed(2));
  let cidSum = 0;
  cid.forEach((item) => cidSum += item[1]);
  cidSum = parseFloat(cidSum.toFixed(2));
  const cidReversed = cid.slice().reverse();
  
  if (cidSum < change) {
    //changeResult.status = "INSUFFICIENT_FUNDS";
    //changeDueEl.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  
  if (cidSum === change) {
    //changeResult.status = "CLOSED";
    //changeDueEl.innerHTML = `<p>Status: CLOSED</p>`;
    return {status: "CLOSED", change: cid};
  }
  
  //se lo stato è valido procedo a calcolare le denominazioni da restituire
  for (let i = 0; i < cidReversed.length; i++) {
    if (change >= denominations[i] && change > 0) {
      console.log(change);
      let counter = Math.floor(change / denominations[i]);
      let actualCoin = cidReversed[i][1];
      while(change >= denominations[i] && actualCoin > 0) {
        actualCoin -= denominations[i];
        change = parseFloat((change - counter * denominations[i]).toFixed(2));
        changeResult.change.push([cidReversed[i][0], counter * denominations[i]]);
        console.log(cid);
      }
    }
  }

  if (change > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }

  changeResult.status = "OPEN";
  
  formatResult(changeResult.status, changeResult.change);

};

const formatResult = (status, change) => {
  changeDueEl.innerHTML = `<p>Status: ${status}</p>`;
  change.forEach(
    item => {
      if (item[1] > 0) 
      (changeDueEl.innerHTML += `<p>${item[0]}: $${item[1]}</p>`)}
  );
  return;
}

purchaseBtn.addEventListener("click", () => {
  checkResult();
});