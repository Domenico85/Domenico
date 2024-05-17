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

function buttonRandomDog() {
  const btn = document.querySelector("button");
  btn.addEventListener("click", getRandomDog);
}
const img = document.querySelector("#random-dog");
img.src = "img/dog.jpg";
buttonRandomDog();
