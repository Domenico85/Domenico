const selectHidden = document.querySelector(".select-category");
selectHidden.selectedIndex = 0;
const selectCategory = document.querySelector(".select-category");
const contentPlaceholder = document.getElementById("content-placeholder");

selectCategory.addEventListener("change", async (event) => {
  const selectedValue = event.target.value;

  if (selectedValue === "1") {
    const characters = await fetchFromAPI(
      "https://rickandmortyapi.com/api/character"
    );
    renderSelect(characters);
  } else if (selectedValue === "2") {
    const locations = await fetchFromAPI(
      "https://rickandmortyapi.com/api/location"
    );
    renderSelect(locations);
  } else if (selectedValue === "3") {
    const episodes = await fetchFromAPI(
      "https://rickandmortyapi.com/api/episode"
    );
    renderSelect(episodes);
  } else {
    contentPlaceholder.innerHTML = "";
  }
});

async function fetchFromAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function renderSelect(items) {
  const selectElement = document.createElement("select");
  selectElement.classList.add("select-content");
  selectElement.innerHTML = `<option value="" disabled selected hidden>Choose an option</option>`;

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name || item.title;
    selectElement.appendChild(option);
  });

  contentPlaceholder.innerHTML = "";
  contentPlaceholder.appendChild(selectElement);
}
