const btnElement = document.querySelector("#btn");
const birthdayElement = document.querySelector("#birthday");
const resultElement = document.querySelector("#result");

function calculateAge() {
  //   console.log("clicked");
  const birthdayValue = birthdayElement.value;
  //   console.log(birthdayValue);
  if (birthdayValue === "") {
    alert("Please enter your birthday");
  } else {
    const age = getAge(birthdayValue);
    resultElement.innerText = `Your Age is ${age} ${
      age > 1 ? "years" : "year"
    } old`;
  }
}

function getAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);
  //   console.log(birthdayDate.getFullYear());
  let age = currentDate.getFullYear() - birthdayDate.getFullYear();
  //   console.log(age);
  const month = currentDate.getMonth() - birthdayDate.getMonth();

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthdayDate.getDate())
  ) {
    age--;
  }

  return age;
}

btnElement.addEventListener("click", calculateAge);
