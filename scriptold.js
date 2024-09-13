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

const coinArr = [
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

let cidValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

const inputCash = document.getElementById("cash");
const changeElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceShow = document.getElementById("price");
const cashDrawerShow = document.getElementById("cash-drawer");

let cashArr = [];
let changeDue = 0;
let modulus = 0;
let changeReturn = {
  change: [],
  status: ""
}
const cidReversed = cid.slice().reverse();
const valuesReversed = cidValues.slice().reverse();

const checkStatus = (change) => {
  let cidSum = 0;
  cidReversed.forEach((item) => cidSum += item[1] );
  cidSum = cidSum * 100;

  if (Number(inputCash.value) === price) {
    changeElement.innerHTML = 
    `<p>Customer paid with exact money</p>`;
    inputCash.value = "";
    return;
  }

  if (Number(inputCash.value) < price) {
    alert("Customer does not have money to purchase item(s)");
    inputCash.value = "";
    return;
  }

  changeReturn.change = "OPEN";

  if (cidSum < change) {
    return (changeElement.innerHTML = 
    `<p>Status: INSUFFICIENT_FUNDS</p>`);
    
  }

  if (cidSum === change) {
    changeReturn.status = "CLOSED";
  }

};


const calcChange = () => {

  for (let i = 0; i < valuesReversed.length; i++) {
    let counter = 0;
    modulus = (change % (valuesReversed[i] * 100));

    if (modulus != change) {
      counter = Math.floor(change / (valuesReversed[i] * 100));
      change = change - ((valuesReversed[i] * 100) * counter);
      cashArr.push(counter * valuesReversed[i]);
      cidReversed[i][1] -= cashArr[i];
    } else {
      cashArr.push(0);
    }
  };

  console.log(cashArr);

};

purchaseBtn.addEventListener("click", () => {
  changeDue = (inputCash.value * 100) - (price * 100);
  console.log("Change: " + changeDue);
  calcChange();
  checkStatus(changeDue);

  //aggiungere che il contante entrante si aggiunge alla cassa

});

