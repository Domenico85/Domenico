async function getRandomDog() {
  const img = document.querySelector("#random-dog");
  const apiUrl = "https://dog.ceo/api/breeds/image/random";

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    img.src = data.message;
  } catch (error) {
    console.error("Error fetching the dog image:", error);
  }
}

async function getBreedDog(breed, subBreed) {
  const img = document.querySelector("#random-dog");
  let apiUrl;

  if (subBreed) {
    apiUrl = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
  } else {
    apiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
  }

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    img.src = data.message;
  } catch (error) {
    console.error("Error fetching the dog image:", error);
  }
}

function getBreedList() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
      const breeds = data.message;
      const select = document.querySelector("#breedSelect");
      const breedRandomButton = document.querySelector(".breed-random");

      for (const breed in breeds) {
        const breedName = breed.charAt(0).toUpperCase() + breed.slice(1);
        const optgroup = document.createElement("optgroup");
        optgroup.label = breedName;

        if (breeds[breed].length > 0) {
          breeds[breed].forEach((subBreed) => {
            const subBreedName =
              subBreed.charAt(0).toUpperCase() + subBreed.slice(1);
            const option = document.createElement("option");
            option.value = `${breed}-${subBreed}`;
            option.textContent = `${subBreedName} (${breedName})`;
            optgroup.appendChild(option);
          });
        } else {
          const option = document.createElement("option");
          option.value = breed;
          option.textContent = breedName;
          optgroup.appendChild(option);
        }

        select.appendChild(optgroup);
      }

      select.addEventListener("change", () => {
        const selectedValue = select.value;
        if (selectedValue) {
          const [breed, subBreed] = selectedValue.split("-");
          getBreedDog(breed, subBreed);
          breedRandomButton.style.display = "block";
        } else {
          breedRandomButton.style.display = "none";
        }
      });

      select.selectedIndex = 0;
      breedRandomButton.style.display = "none";
    })
    .catch((error) => console.error("Error fetching the dog breeds:", error));
}

function setupEventListeners() {
  const randomDogButton = document.querySelector("#btn-random-dog");
  randomDogButton.addEventListener("click", getRandomDog);

  const breedRandomButton = document.querySelector(".breed-random");
  breedRandomButton.addEventListener("click", () => {
    const select = document.querySelector("#breedSelect");
    const selectedValue = select.value;
    if (selectedValue) {
      const [breed, subBreed] = selectedValue.split("-");
      getBreedDog(breed, subBreed);
    }
  });
}

const img = document.querySelector("#random-dog");
img.src = "img/dog.jpg";

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  getBreedList();
});
