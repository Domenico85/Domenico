const countersElements = document.querySelectorAll(".counter");

countersElements.forEach((counterEl) => {
  counterEl.innerText = "0";

  incrementCounter();

  function incrementCounter() {
    let currentNumber = +counterEl.innerText;
    const dataCeil = counterEl.getAttribute("data-ceil");
    // console.log(dataCeil);
    const increment = dataCeil / 15;
    currentNumber = Math.ceil(currentNumber + increment);

    if (currentNumber < dataCeil) {
      counterEl.innerText = currentNumber;
      setTimeout(incrementCounter, 50);
    } else {
      counterEl.innerText = dataCeil;
    }
  }
});
