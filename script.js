let price = 1.87;
let cid = [
  ['PENNY', 1.01],    //$0.01 = 101 pennies
  ['NICKEL', 2.05],   //$0.05 = 41 nickels
  ['DIME', 3.1],      //$0.10 = 31 dimes
  ['QUARTER', 4.25],  //$0.25 = 17
  ['ONE', 90],        //$1.00 = 90
  ['FIVE', 55],       //$5.00 = 11
  ['TEN', 20],        //$10.00 = 2
  ['TWENTY', 60],     //$20.00 = 3
  ['ONE HUNDRED', 100]//$100.00 = 1
];

let cidValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

const inputCash = document.getElementById("cash");
const changeElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let cashArr = [];
let change = 0;
let modulus = 0;
const cidReversed = cid.slice().reverse();
const valuesReversed = cidValues.slice().reverse();

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

  change = (inputCash.value * 100) - (price * 100);
  console.log("Change: " + change);
  calcChange();
  updateCid();

  //aggiungere che il contante entrante si aggiunge alla cassa
  //console.log(cid[0][0]);  //string
  //console.log(cid[0][1]);  //number
});

