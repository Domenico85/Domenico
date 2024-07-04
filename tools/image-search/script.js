const accessKey = "Zdl8QRMj8R_qWGv1ATXq5DkU1TeUv__czaiVfFgqGrU";

const formElement = document.querySelector("form");
const searchInputElement = document.querySelector("#search-input");
const searchResultsElement = document.querySelector(".search-results");
const showMoreBtnElement = document.querySelector("#show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputElement.value;
  console.log(inputData);
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (page === 1) {
    searchResultsElement.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsElement.appendChild(imageWrapper);
  });

  page++;

  console.log(page);

  if (page > 1) {
    showMoreBtnElement.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtnElement.addEventListener("click", () => {
  searchImages();
});
