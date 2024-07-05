const btnElement = document.querySelector("#btn");
const jokeElement = document.querySelector("#joke");
const apiKey = "KJHiEiPTEQQVZ/NFlBhubw==NnoVSgRdanJAfN1h";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit";

async function getJoke() {
  try {
    jokeElement.innerText = "Updating...";
    btnElement.disabled = true;
    btnElement.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();

    btnElement.disabled = false;
    btnElement.innerText = "TELL ME A JOKE";

    console.log(data[0].joke);

    jokeElement.innerText = data[0].joke;
  } catch (error) {
    jokeElement.innerText = "An error happened, try again later.";
    btnElement.disabled = false;
    btnElement.innerText = "TELL ME A JOKE";
    console.log(error);
  }
}

btnElement.addEventListener("click", getJoke);
