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

function getDayName(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}
const apiKey = "ae761484c1284fce82f91509241405";

function searchWeather() {
  const city = document.querySelector(".input-search").value.trim();
  if (city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
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
  const todayDayName = getDayName(data.location.localtime);

  weatherInfo.querySelector(
    ".weather-info__city"
  ).innerText = `${location.name}, ${location.region}, ${location.country}`;
  weatherInfo.querySelector(".weather-info__description").innerText =
    data.current.condition.text;
  weatherInfo.querySelector(".weather-info__day").innerText = todayDayName;
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

  getWeatherIconUrl(data.current.condition.code, data.current.is_day)
    .then((iconUrl) => {
      const iconElement = weatherInfo.querySelector(".weather-info__icon");
      iconElement.innerHTML = `<img src="${iconUrl}" alt="${data.current.condition.text} icon" />`;

      if (!iconUrl.includes("default.svg")) {
        const defaultIcon = iconElement.querySelector("img");
        defaultIcon.style.width = "110px";
      }
    })
    .catch((error) => {
      console.error("Error getting weather icon URL:", error);
    });
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
  ).innerText = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  weatherDetails.querySelector(
    ".wind div span"
  ).innerText = `${data.current.wind_kph}km/h`;

  const weatherNextDays = document.querySelector(".next-days-info-day1");
  const dayName = getDayName(data.forecast.forecastday[1].date);
  weatherNextDays.querySelector(".day").innerText = `${dayName}`;
  weatherNextDays.querySelector(
    ".max-temp"
  ).innerText = `Max ${data.forecast.forecastday[1].day.maxtemp_c}°C`;
  weatherNextDays.querySelector(
    ".min-temp"
  ).innerText = `Min ${data.forecast.forecastday[1].day.mintemp_c}°C`;

  getWeatherIconUrl(
    data.forecast.forecastday[1].day.condition.code,
    data.forecast.forecastday[1].is_day
  )
    .then((iconUrl) => {
      const iconElement = weatherNextDays.querySelector(".icon-next-day");
      iconElement.innerHTML = `<img src="${iconUrl}" alt="${data.current.condition.text} icon" />`;

      if (!iconUrl.includes("default.svg")) {
        const defaultIcon = iconElement.querySelector("img");
        defaultIcon.style.width = "110px";
      }
      weatherNextDays.style.background = "rgba(255, 255, 255, 0.5)";
    })
    .catch((error) => {
      console.error("Error getting weather icon URL:", error);
    });

  const weatherNextDays2 = document.querySelector(".next-days-info-day2");
  const dayName2 = getDayName(data.forecast.forecastday[2].date);
  weatherNextDays2.querySelector(".day").innerText = `${dayName2}`;
  weatherNextDays2.querySelector(
    ".max-temp"
  ).innerText = `Max ${data.forecast.forecastday[2].day.maxtemp_c}°C`;
  weatherNextDays2.querySelector(
    ".min-temp"
  ).innerText = `Min ${data.forecast.forecastday[2].day.mintemp_c}°C`;

  getWeatherIconUrl(
    data.forecast.forecastday[2].day.condition.code,
    data.forecast.forecastday[2].is_day
  )
    .then((iconUrl) => {
      const iconElement = weatherNextDays2.querySelector(".icon-next-day");
      iconElement.innerHTML = `<img src="${iconUrl}" alt="${data.current.condition.text} icon" />`;

      if (!iconUrl.includes("default.svg")) {
        const defaultIcon = iconElement.querySelector("img");
        defaultIcon.style.width = "110px";
      }
      weatherNextDays2.style.background = "rgba(255, 255, 255, 0.5)";
    })
    .catch((error) => {
      console.error("Error getting weather icon URL:", error);
    });
}

function getWeatherIconUrl(conditionCode, isDay) {
  return fetch("weather/conditions.json")
    .then((response) => response.json())
    .then((conditions) => {
      const condition = conditions.find((item) => item.code === conditionCode);
      const icon = condition ? condition.icon : null;

      let iconUrl = "img/default.svg";
      if (icon) {
        const timeOfDay = isDay ? "day" : "night";
        iconUrl = `weather/64x64/${timeOfDay}/${icon}.png`;
      }

      return iconUrl;
    })
    .catch((error) => {
      console.error("Error fetching conditions:", error);
      return "img/default.svg";
    });
}
