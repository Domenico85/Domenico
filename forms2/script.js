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
