function hiddenPlaceholder() {
  const searchBox = document.querySelector(".search-box");
  const inputSearch = document.querySelector(".input-search");
  const btnSearch = document.querySelector(".btn-search");

  btnSearch.addEventListener("click", () => {
    inputSearch.focus();
  });

  inputSearch.addEventListener("focus", () => {
    inputSearch.setAttribute("placeholder", "Type to Search...");
  });

  inputSearch.addEventListener("blur", () => {
    if (inputSearch.value === "") {
      inputSearch.setAttribute("placeholder", "");
    }
  });
}

hiddenPlaceholder();

const apiKey = "ae761484c1284fce82f91509241405";

document.querySelector(".btn-search").addEventListener("click", () => {
  const city = document.querySelector(".input-search").value.trim();
  if (city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    console.log(url);

    fetch(url, { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        updateWeatherInfo(data);
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  } else {
    alert("Please enter a city name.");
  }
});

function updateWeatherInfo(data) {
  const weatherInfo = document.querySelector(".weather-info");
  const location = data.location;
  weatherInfo.querySelector(
    ".weather-info__city"
  ).innerText = `${location.name}, ${location.region}, ${location.country}`;
  weatherInfo.querySelector(".weather-info__description").innerText =
    data.current.condition.text;
  weatherInfo.querySelector(".weather-info__date").innerText = new Date(
    data.location.localtime
  ).toLocaleDateString();
  weatherInfo.querySelector(".weather-info__time").innerText = new Date(
    data.location.localtime
  ).toLocaleTimeString();
  weatherInfo.querySelector(
    ".weather-info__temperature"
  ).innerText = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
  weatherInfo.querySelector(
    ".weather-info__units-f"
  ).innerText = `Fahrenheit: ${data.current.temp_f}°F`;
  weatherInfo.querySelector(
    ".weather-info__units-c"
  ).innerText = `Celsius: ${data.current.temp_c}°C`;

  const iconUrl = `https:${data.current.condition.icon}`;
  weatherInfo.querySelector(
    ".weather-info__icon svg"
  ).innerHTML = `<img src="${iconUrl}" alt="${data.current.condition.text} icon" />`;
}
