const btnElement = document.querySelector("#btn");
const animeContainerElement = document.querySelector(".anime-container");
const animeImgElement = document.querySelector(".anime-img");
const animeNameElement = document.querySelector(".anime-name");

btnElement.addEventListener("click", async function () {
  try {
    btnElement.disabled = true;
    btnElement.innerText = "Loading...";
    animeNameElement.innerText = "Updating...";
    animeImgElement.src = "img/spinner.svg";
    const response = await fetch("https://api.nekosapi.com/v3/images/random");
    const data = await response.json();

    const filteredItems = data.items.filter(
      (item) => item.rating !== "explicit"
    );
    btnElement.disabled = false;
    btnElement.innerText = "Get Anime";

    if (filteredItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredItems.length);
      const randomItem = filteredItems[randomIndex];

      animeImgElement.src = randomItem.image_url;
      animeImgElement.alt = randomItem.tags.map((tag) => tag.name).join(", ");
      animeNameElement.textContent = randomItem.tags
        .map((tag) => tag.name)
        .join(", ");

      animeContainerElement.style.display = "block";
    } else {
      console.warn("No suitable images found.");
    }
  } catch (error) {
    console.error("Error fetching anime image:", error);
  }
});
