const carStart = (carNumber, maxTime = 5) =>
  new Promise((resolve, reject) => {
    const randomTime = Math.floor(Math.random() * maxTime) * 1000;
    console.log(randomTime);

    setTimeout(() => {
      resolve(carNumber);
    }, randomTime);
  });

const carsOrder = [];

const updateDisplay = () => {
  const raceElement = document.querySelector("#race");
  raceElement.innerHTML = "";
  carsOrder.forEach((id, position) => {
    raceElement.innerHTML += `<div><img src="car-${id}.png"><span>#${
      position + 1
    } Place"</span></div>`;
  });
};

carStart(1)
  .then((result) => {
    console.log(result);
    carsOrder.push(result);
  })
  .then(updateDisplay);

carStart(2)
  .then((result) => {
    console.log(result);
    carsOrder.push(result);
  })
  .then(updateDisplay);
