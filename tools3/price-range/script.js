const rangeInputs = document.querySelectorAll(".range-input input");
const progressBar = document.querySelector(".progress");
const minText = document.querySelector(".text-min");
const maxText = document.querySelector(".text-max");

let minGap = 1000; // Minimum distance between min and max handles
let maxValue = parseInt(rangeInputs[1].max); // Max value of the range

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleRangeInput);
});

function handleRangeInput(e) {
  let minVal = parseInt(rangeInputs[0].value);
  let maxVal = parseInt(rangeInputs[1].value);

  // Ensure a minimum gap between the handles
  if (maxVal - minVal < minGap) {
    if (e.target.classList.contains("range-min")) {
      rangeInputs[0].value = maxVal - minGap;
    } else {
      rangeInputs[1].value = minVal + minGap;
    }
  } else {
    updateProgressBar(minVal, maxVal);
    updateTextValues(minVal, maxVal);
  }
}

function updateProgressBar(minVal, maxVal) {
  const minPercent = (minVal / maxValue) * 100;
  const maxPercent = (maxVal / maxValue) * 100;

  progressBar.style.left = minPercent + "%";
  progressBar.style.width = maxPercent - minPercent + "%";
}

function updateTextValues(minVal, maxVal) {
  minText.innerText = minVal.toLocaleString();
  maxText.innerText = maxVal.toLocaleString();

  minText.style.left = (minVal / maxValue) * 100 + "%";
  maxText.style.right = 100 - (maxVal / maxValue) * 100 + "%";
}
