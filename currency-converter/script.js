const currencyFirstEl = document.querySelector("#currency-first");
const worthFirstEl = document.querySelector("#worth-first");
const currencySecondEl = document.querySelector("#currency-second");
const worthSecondEl = document.querySelector("#worth-second");
const exchangeRateEl = document.querySelector("#exchange-rate");

updateRate();

function updateRate() {
  //   console.log("called");
  fetch(
    ` https://v6.exchangerate-api.com/v6/ba12cf70ce896b50a7ae0f5a/latest/${currencyFirstEl.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[currencySecondEl.value];
      console.log(rate);
      exchangeRateEl.innerText = `1 ${currencyFirstEl.value} = ${
        rate + " " + currencySecondEl.value
      }`;

      worthSecondEl.value = (worthFirstEl.value * rate).toFixed(3);
    });
}

currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);
