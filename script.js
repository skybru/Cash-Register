let price = 4.59;
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

const changeDueElement = document.getElementById("change-due");
const inputCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const showPrice = document.getElementById("price");
const showCashDrawer = document.getElementById("cash-drawer");

const checkResult = () => {
    if (!inputCash.value) {
        alert("Please, insert a value for the customer money!");
        return;
    }
    calculateChangeDue();
    showResults(changeResult.status, changeResult.change);
    updateDrawer(cid);
};

const calculateChangeDue = () => {
    if (parseFloat(inputCash.value) < price) {
        inputCash.value = "";
        return alert("Customer does not have enough money to purchase the item");
    }

    if (parseFloat(inputCash.value) === price) {
        console.log(inputCash.value)
        inputCash.value = "";
        changeDueElement.innerHTML = "No change due - customer paid with exact cash";
        return;
    }

    let changeDue = inputCash.value - price;
    changeResult.status = "OPEN";
    let cidSum = 0;
    cid.forEach(item => cidSum += item[1]);
    cidSum = parseFloat(cidSum.toFixed(2));
    if (cidSum < changeDue) {
        return changeResult.status = "INSUFFICIENT_FUNDS", changeResult.change = [];
    }
    
    if (cidSum === changeDue) {
        changeResult.status = "CLOSED";
    }
    let change = [];
    for (let i = 0; i < denominations.length; i++) {
        let counter = 0;
        let cidReversed = cid.slice().reverse();
        while (changeDue >= denominations[i] && cidReversed[i][1] >= denominations[i]) {
            changeDue -= denominations[i];
            changeDue = parseFloat(changeDue.toFixed(2));
            cidReversed[i][1] -= denominations[i];
            cidReversed[i][1] = parseFloat(cidReversed[i][1].toFixed(2));
            counter += denominations[i];
        }

        if (counter > 0) {
            change.push([cidReversed[i][0], parseFloat(counter.toFixed(2))]);
        }
    }

    if (changeDue > 0) {
        return changeResult.status = "INSUFFICIENT_FUNDS", changeResult.change = [];
    }

    changeResult.change = change;
};

const showResults = (status, change) => {
    if (status) {
        changeDueElement.innerHTML = `<p>Status: ${status}</p>`;
    }
    change.forEach(item => {
        if (item[1] > 0) 
          (changeDueElement.innerHTML += `<p>${item[0]}: $${item[1]}</p>`)}
      );
    
};

const updateDrawer = (drawer) => {
    drawer.forEach(item => {
        showCashDrawer.innerHTML += `<p>${item[0]}: $${item[1]}</p>`;
    });
};

purchaseBtn.addEventListener("click", () => {
    showCashDrawer.innerHTML = "";
    checkResult();
  });