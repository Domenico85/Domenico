let typeFrom = document.getElementById("typeFrom");
let typeTo = document.getElementById("typeTo");
let res = document.getElementById("res");
let input = document.getElementById("input");
let inputType = document.getElementById("inputType");
let resultType = document.getElementById("resultType");

const tags = {
  10: "Decimal:",
  2: "Binary:",
  8: "Octal:",
  16: "HexaDecimal:",
};

function update() {
  inputType.innerText = tags[typeFrom.value];
  resultType.innerText = tags[typeTo.value];

  res.value = Number(parseInt(input.value, typeFrom.value)).toString(
    typeTo.value
  );
}

function reverse() {
  inputType.innerText = tags[typeFrom.value];
  resultType.innerText = tags[typeTo.value];

  input.value = Number(parseInt(res.value, typeTo.value)).toString(
    typeFrom.value
  );
}

update();
