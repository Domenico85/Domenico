const btnElement = document.querySelector("#btn");
const bmiInputElement = document.querySelector("#bmi-result");
const weightConditionElement = document.querySelector("#weight-condition");

function calculateBMI() {
  const heightValue = document.querySelector("#height").value / 100;
  const weightValue = document.querySelector("#weight").value;

  const bmiValue = weightValue / (heightValue * heightValue);

  //   console.log(heightValue, weightValue);

  bmiInputElement.value = bmiValue;

  if (bmiValue < 18.5) {
    weightConditionElement.innerText = "Under weight";
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    weightConditionElement.innerText = "Normal weight";
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    weightConditionElement.innerText = "Over weight";
  } else if (bmiValue >= 30) {
    weightConditionElement.innerText = "Obesity";
  }
}

btnElement.addEventListener("click", calculateBMI);
