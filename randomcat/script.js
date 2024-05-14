function getRandomCat() {
  const img = document.querySelector("img");
  const apiUrl = "https://cataas.com/cat/gif";
  const apiUrl2 =
    "https://api.giphy.com/v1/gifs/translate?api_key=R2XyezYv6ZrqOtjNvceIvOtdLm9vjsEX&s=cats";
  fetch(apiUrl, { mode: "cors" })
    .then(function (response) {
      console.log(response);
      return response.blob();
    })
    .then(function (blob) {
      img.src = URL.createObjectURL(blob);
    })
    .catch((e) => {
      console.log(e);
    });
}

function buttonRandomCat() {
  const btn = document.querySelector("button");
  btn.addEventListener("click", getRandomCat);
}

buttonRandomCat();
