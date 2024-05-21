async function fetchWord(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    //displayQuestions(data.results);
  } catch (error) {
    console.error("Error fetching the word:", error);
  }
}

document
  .querySelector(".search-bar")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const word = document.querySelector("#search").value;
    fetchWord(word);
  });
