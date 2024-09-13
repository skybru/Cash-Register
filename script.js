let price = 1.87;
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

const coinDenomArr = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.10],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
]

let denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
let changeResult = {
  status: "",
  change: []
};

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
    changeDueEl.innerHTML = 
    `<p>No change due because customer paid with exact money</p>`;
    inputCash.value = "";
    return;
  }
  //o se è inferiore al prezzo
  if (Number(inputCash.value) < price) {
    alert("Customer does not have money to purchase item(s)");
    return;
  }

  //calcolo il resto e controllo lo stato
  let change = parseFloat(inputCash.value - price).toFixed(2);
  let status = checkStatus(change);

  //se lo stato è valido procedo a calcolare le denominazioni da restituire
  if (status) {
    const denomReversed = denominations.slice().reverse();
    changeDueEl.innerHTML += 
    `<p>Change due: ${change}</p>`;

    for (let i = 0; i < denomReversed.length; i++) {
      
    };
  }
};

const checkStatus = (change) => {
  console.log("checkStatus function:")
  //sommo tutti i soldi che ho nel cassetto
  let cidSum = 0;
  const cidReversed = cid.slice().reverse();
  cidReversed.forEach((item) => cidSum += item[1]);
  console.log(cidSum);

  //verifico se il mio cassetto non può restituire il resto necessario
  if (cidSum < change) {
    changeDueEl.innerHTML = 
    `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return false;
    
  }
  //o se ho appena finito i soldi nel cassetto
  if (cidSum === change) {
    changeDueEl.innerHTML = 
    `<p>Status: CLOSED</p>`;
    return false;
  }

  changeDueEl.innerHTML = 
  `<p>Status: OPEN</p>`;
  return true;
};

purchaseBtn.addEventListener("click", () => {
  checkResult();
});