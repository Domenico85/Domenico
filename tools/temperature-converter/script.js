const celsiusElement = document.querySelector("#celsius");
const fahrenheitElement = document.querySelector("#fahrenheit");
const kelvinElement = document.querySelector("#kelvin");

celsiusElement.value = "";
fahrenheitElement.value = "";
kelvinElement.value = "";

function calculateTemperature(event) {
  const currentValue = +event.target.value;

  switch (event.target.name) {
    case "celsius":
      kelvinElement.value = (currentValue + 273.15).toFixed(2);
      fahrenheitElement.value = (currentValue * 1.8 + 32).toFixed(2);
      break;
    case "fahrenheit":
      celsiusElement.value = ((currentValue - 32) / 1.8).toFixed(2);
      kelvinElement.value = ((currentValue - 32) / 1.8 + 273.15).toFixed(2);
      break;
    case "kelvin":
      celsiusElement.value = (currentValue - 273.15).toFixed(2);
      fahrenheitElement.value = ((currentValue - 273.15) * 1.8 + 32).toFixed(2);
      break;
    default:
      break;
  }
}
