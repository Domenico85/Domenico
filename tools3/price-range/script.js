const rangeInputs = document.querySelectorAll(".range-input input");
const rangeProgress = document.querySelector(".progress");
const minText = document.querySelector(".text-min");
const maxText = document.querySelector(".text-max");

let minGap = 1000;
let maxValue = 10000;

rangeInputs.forEach((input) => {
  input.addEventListener("input", updateRange);
});

function updateRange() {
  const minVal = parseInt(rangeInputs[0].value);
  const maxVal = parseInt(rangeInputs[1].value);

  if (maxVal - minVal < minGap) {
    if (this.className === "range-min") {
      rangeInputs[0].value = maxVal - minGap;
    } else {
      rangeInputs[1].value = minVal + minGap;
    }
  } else {
    const minPercent = (minVal / maxValue) * 100;
    const maxPercent = (maxVal / maxValue) * 100;

    rangeProgress.style.left = minPercent + "%";
    rangeProgress.style.width = maxPercent - minPercent + "%";

    minText.innerText = minVal.toLocaleString();
    maxText.innerText = maxVal.toLocaleString();
  }
}
