function hiddenPlaceholder() {
  const searchBox = document.querySelector(".search-box");
  const inputSearch = document.querySelector(".input-search");
  const btnSearch = document.querySelector(".btn-search");

  btnSearch.addEventListener("click", () => {
    inputSearch.focus();
  });

  inputSearch.addEventListener("focus", () => {
    inputSearch.setAttribute("placeholder", "Search a City...");
  });

  inputSearch.addEventListener("blur", () => {
    if (inputSearch.value === "") {
      inputSearch.setAttribute("placeholder", "");
    }
  });
}

hiddenPlaceholder();

const apiKey = "ae761484c1284fce82f91509241405";

function searchWeather() {
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
        document.querySelector(".input-search").value = "";
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  } else {
    alert("Please enter a city name.");
  }
}

document.querySelector(".btn-search").addEventListener("click", searchWeather);

document
  .querySelector(".input-search")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchWeather();
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

  fetch("weather/conditions.json")
    .then((response) => response.json())
    .then((conditions) => {
      const conditionCode = data.current.condition.code;

      const condition = conditions.find((item) => item.code === conditionCode);

      const icon = condition ? condition.icon : null;

      let iconUrl = "img/default.svg";
      if (icon) {
        const timeOfDay = data.current.is_day ? "day" : "night";
        iconUrl = `weather/64x64/${timeOfDay}/${icon}.png`;
      }

      const iconElement = weatherInfo.querySelector(".weather-info__icon");
      iconElement.innerHTML = `<img src="${iconUrl}" alt="${data.current.condition.text} icon" />`;

      if (!icon) {
        const defaultIcon = iconElement.querySelector("img");
        defaultIcon.style.width = "50px";
      }
    })
    .catch((error) => console.error("Error fetching conditions:", error));

  const weatherDetails = document.querySelector(".weather-details");
  console.log("con", data.current.condition);
  weatherDetails.querySelector(
    ".feels-like div span"
  ).innerText = `${data.current.feelslike_c}°C / ${data.current.feelslike_f}°F`;
  weatherDetails.querySelector(
    ".humidity div span"
  ).innerText = `${data.current.humidity}%`;
  weatherDetails.querySelector(
    ".rain div span"
  ).innerText = `${data.current.precip_mm}mm`;
  weatherDetails.querySelector(
    ".wind div span"
  ).innerText = `${data.current.wind_kph}km/h`;
}
