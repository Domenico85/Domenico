async function getRandomDog() {
  const img = document.querySelector("#random-dog");
  const apiUrl = "https://dog.ceo/api/breeds/image/random";

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    img.src = data.message;
  } catch (error) {
    console.error("Error fetching the dog image:", error);
  }
}
async function getBreedDog(breed) {
  const img = document.querySelector("#random-dog");
  const apiUrl = `https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`;

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

      for (const breed in breeds) {
        const breedName = breed.charAt(0).toUpperCase() + breed.slice(1);
        const optgroup = document.createElement("optgroup");
        optgroup.label = breedName;

        if (breeds[breed].length > 0) {
          breeds[breed].forEach((subBreed) => {
            const subBreedName =
              subBreed.charAt(0).toUpperCase() + subBreed.slice(1);
            const option = document.createElement("option");
            option.value = `${subBreed} ${breed}`;
            option.textContent = subBreedName;
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
        const selectedBreed = select.value;
        if (selectedBreed) {
          const breedParts = selectedBreed.split(" ");
          const mainBreed = breedParts[0];
          getBreedDog(mainBreed);
        }
      });

      select.selectedIndex = 0;
      const initialBreed = select.value;
      if (initialBreed) {
        const [subBreed, mainBreed] = initialBreed.split(" ");
        getBreedDog(mainBreed, subBreed);
      }
    })
    .catch((error) => console.error("Error fetching the dog breeds:", error));
}

function buttonRandomDog() {
  const btn = document.querySelector("button");
  btn.addEventListener("click", getRandomDog);
}

const img = document.querySelector("#random-dog");
img.src = "img/dog.jpg";
buttonRandomDog();
getBreedList();
