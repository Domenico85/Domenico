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
        document.getElementById("weather-result").innerText = JSON.stringify(
          data,
          null,
          2
        );
      })
      .catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
      });
  } else {
    alert("Please enter a city name.");
  }
});
