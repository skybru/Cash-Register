let price = 1.87;
let cid = [
  ['PENNY', 1.01],    //$0.01
  ['NICKEL', 2.05],   //$0.05
  ['DIME', 3.1],      //$0.10
  ['QUARTER', 4.25],  //$0.25
  ['ONE', 90],        //$1.00
  ['FIVE', 55],       //$5.00
  ['TEN', 20],        //$10.00
  ['TWENTY', 60],     //$20.00
  ['ONE HUNDRED', 100]//$100.00
];

const inputCash = document.getElementById("cash");
const changeElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

//Passi principali:
//Ordina le monete e le banconote disponibili in ordine decrescente.
//Inizia con la denominazione più alta e usa quante più monete/banconote di quel tipo possibile senza superare l'importo del resto.
//Sottrai l'importo coperto dalle monete/banconote scelte dal totale del resto.
//Ripeti il processo con la denominazione successiva fino a quando il resto diventa zero.

let change = 0;

purchaseBtn.addEventListener("click", () => {

});

