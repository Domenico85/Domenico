function validateField(id, message) {
  const element = document.getElementById(id);

  element.addEventListener("focusout", (event) => {
    if (element.validity.typeMismatch) {
      element.setCustomValidity(message);
    } else if (element.validity.valueMissing) {
      element.setCustomValidity("Field Required");
    } else if (element.validity.patternMismatch) {
      element.setCustomValidity("Valid Number Required");
    } else {
      element.setCustomValidity("");
    }
    element.reportValidity();
  });
}

validateField("mail", "Insert a valid e-mail");
validateField("phone", "Insert a valid Phone Number");

function validatePassword() {
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm_password");

  if (
    passwordInput.value === confirmPasswordInput.value &&
    passwordInput.value !== ""
  ) {
    console.log("pass match", passwordInput.value);
    confirmPasswordInput.setCustomValidity("");
  } else {
    console.log("not match", passwordInput.value);
    confirmPasswordInput.setCustomValidity("Passwords don't match");
  }
  // confirmPasswordInput.reportValidity();
}

const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm_password");
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener("blur", validatePassword);

confirmPasswordInput.addEventListener("input", () => {
  confirmPasswordInput.reportValidity();
});
