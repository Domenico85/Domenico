const btnElement = document.querySelector("#calculate");
const billInput = document.querySelector("#bill");
const tipInput = document.querySelector("#tip");
const totalSpan = document.querySelector("#total");

function calculateTotal() {
  const billValue = billInput.value;
  //   console.log(billValue);
  const tipValue = tipInput.value;
  const totalValue = billValue * (1 + tipValue / 100);
  //   console.log(totalValue);
  totalSpan.innerText = totalValue.toFixed(2);
}

btnElement.addEventListener("click", calculateTotal);
