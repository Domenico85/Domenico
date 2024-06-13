const input = document.querySelector("#input");

function reverseString(str) {
  return str.split("").reverse().join("");
}

function check() {
  const value = input.value;
  const reverse = reverseString(value);

  if (value === reverse) {
    alert("Palindrome");
  } else {
    alert("Not Palindrome");
  }
  input.value = "";
}
