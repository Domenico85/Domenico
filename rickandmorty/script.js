const selectHidden = document.querySelector(".select-category");
selectHidden.selectedIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const selectCategory = document.querySelector(".select-category");
  const contentPlaceholder = document.getElementById("content-placeholder");

  selectCategory.addEventListener("change", async (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "1") {
      const characters = await fetchCharacters();
      renderCharacters(characters);
    } else {
      contentPlaceholder.innerHTML = "";
    }
  });

  async function fetchCharacters() {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data.results;
  }

  function renderCharacters(characters) {
    const selectCharacters = document.createElement("select");
    selectCharacters.classList.add("select-characters");
    selectCharacters.innerHTML = `<option value="" disabled selected hidden>Choose a character</option>`;

    characters.forEach((character) => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.name;
      selectCharacters.appendChild(option);
    });

    contentPlaceholder.innerHTML = "";
    contentPlaceholder.appendChild(selectCharacters);
  }
});
