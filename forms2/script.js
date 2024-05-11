// const email = document.getElementById("mail");
// console.log("Email input field:", email);

// email.addEventListener("change", (event) => {
//   console.log("Input event triggered");
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("I am expecting an email address!");
//   } else {
//     email.setCustomValidity("");
//   }
// });

function validateForm() {
  let mail = document.forms["myForm"]["mail"].value;
  if (mail == "") {
    alert("Mail must be filled out");
    return false;
  }
}
