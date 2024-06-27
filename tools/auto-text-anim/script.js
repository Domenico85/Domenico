const containerElement = document.querySelector(".container");

const careers = ["Freelancer", "Web Developer", "Passionate", "DOME!"];

let careerIndex = 0;
let characterIndex = 0;

function updateText() {
  characterIndex++;
  const currentCareer = careers[careerIndex];
  const prefix =
    currentCareer.slice(0, 1) === "D" || currentCareer.slice(0, 1) === "P"
      ? ""
      : "a ";
  containerElement.innerHTML = `
    <h1>I am ${prefix}${currentCareer.slice(0, characterIndex)}</h1>`;

  if (characterIndex === currentCareer.length) {
    careerIndex++;
    characterIndex = 0;
  }

  if (careerIndex === careers.length) {
    careerIndex = 0;
  }

  setTimeout(updateText, 400);
}

updateText();
