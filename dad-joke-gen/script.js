const btnElement = document.querySelector("#btn");
const apiKey = "KJHiEiPTEQQVZ/NFlBhubw==NnoVSgRdanJAfN1h";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit";

async function getJoke() {
  const response = await fetch(apiURL, options);
  const data = await response.json();

  console.log(data);
}

btnElement.addEventListener("click", getJoke);
