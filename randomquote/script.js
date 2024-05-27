async function fetchQuote() {
  const apiUrl = `https://api.quotable.io/random`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`No quote found.`);
    }
    const data = await response.json();
    displayQuote(data.content, data.author);
    console.log(data);
  } catch (error) {
    console.error("Error fetching the quote:", error);
  }
}
function displayQuote(quote, author) {
  const quoteElement = document.querySelector(".quote");
  const authorElement = document.querySelector(".author");

  quoteElement.textContent = `"${quote}"`;
  authorElement.textContent = `${author}`;
}
function showQuote() {
  const btn = document.querySelector(".button");
  btn.addEventListener("click", () => fetchQuote());
}
showQuote();
