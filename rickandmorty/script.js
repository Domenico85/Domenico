const selectHidden = document.querySelector(".select-category");
selectHidden.selectedIndex = 0;
const selectCategory = document.querySelector(".select-category");
const contentPlaceholder = document.querySelector("#select-placeholder");
const descriptionDiv = document.querySelector("#description");

async function fetchFromAPI(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
}

function getCurrentPage(url) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return parseInt(urlParams.get("page")) || 1;
}

async function renderSelect(items, next, prev, type) {
  contentPlaceholder.innerHTML = "";

  const itemsContainer = document.createElement("div");
  itemsContainer.classList.add("items-container");

  if (Array.isArray(items)) {
    items.forEach((item) => {
      const itemLink = document.createElement("a");
      itemLink.href = "#";
      itemLink.dataset.id = item.id;
      itemLink.textContent = item.name || item.title;
      itemLink.classList.add("item-link");

      itemLink.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedItemId = event.target.dataset.id;

        if (!selectedItemId) {
          return;
        }

        const selectedItem = items.find(
          (item) => item.id === parseInt(selectedItemId)
        );
        displayItemDescription(selectedItem, type);
      });

      itemsContainer.appendChild(itemLink);
    });
  }

  let currentPage = 1;
  if (prev) {
    currentPage = getCurrentPage(prev) + 1;
  } else if (next) {
    currentPage = getCurrentPage(next) - 1;
  }

  const arrowsContainer = document.createElement("div");
  arrowsContainer.classList.add("arrows-container");

  const leftArrowLink = document.createElement("a");
  leftArrowLink.href = prev ? prev : "#";
  const leftArrow = document.createElement("span");
  leftArrow.classList.add("arrow", "left");
  leftArrowLink.appendChild(leftArrow);

  leftArrowLink.addEventListener("click", async (event) => {
    event.preventDefault();
    if (prev) {
      const data = await fetchFromAPI(prev);
      renderSelect(data.results, data.info.next, data.info.prev);
    }
  });

  const pageNumber = document.createElement("p");
  pageNumber.textContent = `Page ${currentPage}`;
  pageNumber.classList.add("page-number");

  const rightArrowLink = document.createElement("a");
  rightArrowLink.href = next ? next : "#";
  const rightArrow = document.createElement("span");
  rightArrow.classList.add("arrow", "right");
  rightArrowLink.appendChild(rightArrow);

  rightArrowLink.addEventListener("click", async (event) => {
    event.preventDefault();
    if (next) {
      const data = await fetchFromAPI(next);
      renderSelect(data.results, data.info.next, data.info.prev);
    }
  });

  arrowsContainer.appendChild(leftArrowLink);
  arrowsContainer.appendChild(pageNumber);
  arrowsContainer.appendChild(rightArrowLink);

  contentPlaceholder.appendChild(itemsContainer);
  contentPlaceholder.appendChild(arrowsContainer);
}

function displayItemDescription(item, type) {
  const descriptionDiv = document.querySelector("#description");

  descriptionDiv.innerHTML = "";
  console.log("1", item);

  if (!item) {
    const message = document.createElement("p");
    message.textContent = "Sorry, the details for this item are not available.";
    descriptionDiv.appendChild(message);
    descriptionDiv.style.display = "flex";
    console.log("2", message);
    return;
  }

  const itemDetails = document.createElement("div");
  itemDetails.classList.add("detail-description");

  if (type == "1") {
    itemDetails.innerHTML = `
      <h2>${item.name}</h2>
      <p>Status: ${item.status || "Unknown"}</p>
      <p>Species: ${item.species || "Unknown"}</p>
      <p>Gender: ${item.gender || "Unknown"}</p>
      ${item.image ? `<img src="${item.image}" alt="${item.name}" />` : ""}
    `;
  } else if (type == "2") {
    itemDetails.innerHTML = `
      <h2>${item.name}</h2>
      <p>Type: ${item.type || "Unknown"}</p>
      <p>Dimension: ${item.dimension || "Unknown"}</p>
      <p>${item.residents.length} Residents</p>
    `;
  } else if (type == "3") {
    console.log("3", item.type);
    console.log("4", item.episode);
    itemDetails.innerHTML = `
      <h2>${item.name}</h2>
      <p>Episode: ${item.episode || "Unknown"}</p>
      <p>Air Date: ${item.air_date || "Unknown"}</p>
      <p>${item.characters.length} Characters</p>
    `;
  } else {
    itemDetails.innerHTML = `
      <h2>${item.name || item.title}</h2>
      <p>Status: ${item.status || "No description available."}</p>
      <p>Type: ${item.type || "Unknown"}</p>
      <p>Gender: ${item.gender || "Unknown"}</p>
      ${item.image ? `<img src="${item.image}" />` : ""}
    `;
  }
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.classList.add("close-button");

  closeButton.addEventListener("click", () => {
    descriptionDiv.style.display = "none";
  });

  descriptionDiv.addEventListener("click", (event) => {
    console.log("desc", descriptionDiv);
    if (!descriptionDiv.contains(event.target)) {
      descriptionDiv.style.display = "none";
    }
  });

  itemDetails.appendChild(closeButton);
  descriptionDiv.style.display = "flex";
  descriptionDiv.appendChild(itemDetails);
}

selectCategory.addEventListener("change", async (event) => {
  const selectedValue = event.target.value;
  contentPlaceholder.innerHTML = "Loading...";
  descriptionDiv.innerHTML = "";

  try {
    let data;
    if (selectedValue === "1") {
      data = await fetchFromAPI("https://rickandmortyapi.com/api/character");
      // console.log("character", data);
    } else if (selectedValue === "2") {
      data = await fetchFromAPI("https://rickandmortyapi.com/api/location");
      // console.log("location", data);
    } else if (selectedValue === "3") {
      data = await fetchFromAPI("https://rickandmortyapi.com/api/episode");
      // console.log("episodes", data);
    } else {
      contentPlaceholder.innerHTML = "";
      return;
    }

    renderSelect(data.results, data.info.next, data.info.prev, selectedValue);
  } catch (error) {
    contentPlaceholder.innerHTML = "Failed to load data. Please try again.";
  }
});
