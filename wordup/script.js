async function fetchWord(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    updateWordInfo(data[0]);
  } catch (error) {
    console.error("Error fetching the word:", error);
  }
}

document
  .querySelector(".search-bar")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search");
    const word = searchInput.value;
    fetchWord(word);
    searchInput.value = "";
    searchInput.blur();
  });

function updateWordInfo(data) {
  const wordContainer = document.querySelector(".container-word");

  const wordElement = wordContainer.querySelector(".word");
  const definitionElement = wordContainer.querySelector(".definition");
  const phoneticElement = wordContainer.querySelector(".phonetic");
  const audioElement = wordContainer.querySelector(".audio");
  const originElement = wordContainer.querySelector(".origin");

  wordElement.innerHTML = `<span class="color-text">Word:</span> ${data.word}`;

  definitionElement.innerHTML = `<span class="color-text">Definition:</span> ${data.meanings[0].definitions[0].definition}`;

  phoneticElement.innerHTML = data.phonetic
    ? `<span class="color-text">Phonetic</span>: ${data.phonetic}`
    : "";

  if (data.phonetics[0] && data.phonetics[0].audio) {
    const audioUrl = data.phonetics[0].audio;
    audioElement.innerHTML = `<audio controls src="${audioUrl}"></audio>`;
  } else {
    audioElement.innerHTML = "";
  }

  originElement.innerText = data.origin ? `Origin: ${data.origin}` : "";
}
