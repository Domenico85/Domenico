async function fetchQuote(quote) {
  const apiUrl = `https://api.quotable.io/random`;

  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`No quote found.`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching the word:", error);
  }
}
