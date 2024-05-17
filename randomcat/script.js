async function getRandomCat() {
  const img = document.querySelector("#catImage");
  const apiUrl = "https://cataas.com/cat/gif";

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    img.src = URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching the cat image:", error);
  }
}

function buttonRandomCat() {
  const btn = document.querySelector("button");
  btn.addEventListener("click", getRandomCat);
}

buttonRandomCat();
