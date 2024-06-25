const getLoremIpsum = (numberOfParagraphs) => {
  fetch(
    `https://baconipsum.com/api/?type=meat-and-filler&paras=${numberOfParagraphs}`
  )
    .then((response) => response.json())
    .then((loremIpsumTextArray) => {
      updateResult(loremIpsumTextArray);
    });
};

const addCopyButton = (text) => {
  const resultElement = document.querySelector("#result");
  const copyBtn = document.createElement("button");

  copyBtn.textContent = "Copy";
  copyBtn.classList.add("copy");

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  };

  resultElement.appendChild(copyBtn);
};

const updateResult = (textArray) => {
  const resultElement = document.querySelector("#result");
  resultElement.innerHTML = "";
  resultElement.innerHTML = textArray
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  addCopyButton(textArray.join(""));
  resultElement.classList.add("show");
};

const getLoremIpsumBtnElement = document.querySelector("#get-lorem-ipsum");
const paragraphsCountElement = document.querySelector("#paragraphs-count");

getLoremIpsumBtnElement.addEventListener("click", () => {
  getLoremIpsum(parseInt(paragraphsCountElement.value));
  paragraphsCountElement.value = "";
});
