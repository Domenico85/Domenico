function calculateLoan() {
  // console.log("change");
  loanAmountValue = document.querySelector("#loan-amount").value;

  // console.log(loanAmountValue);
  interestRateValue = document.querySelector("#interest-rate").value;

  monthsToPayValue = document.querySelector("#months-to-pay").value;

  interest = (loanAmountValue * (interestRateValue * 0.01)) / monthsToPayValue;

  monthlyPayment = (loanAmountValue / monthsToPayValue + interest).toFixed(2);

  document.querySelector(
    ".payment"
  ).innerHTML = `Monthly Payment: ${monthlyPayment}`;
}
