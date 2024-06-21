const dataArray = [
  {
    title: "Why is JavaScript cool?",
    detail:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores a qu fugiat perferendis voluptatem porro, quo eius doloremque corporis ea quodrepellat veritatis similique iusto illo eveniet. Aut, impedit ad!",
  },
  {
    title: "What is JavaScript?",
    detail:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores a qu fugiat perferendis voluptatem porro, quo eius doloremque corporis ea quodrepellat veritatis similique iusto illo eveniet. Aut, impedit ad!",
  },
  {
    title: "How Can I learn JavaScript?",
    detail:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores a qu fugiat perferendis voluptatem porro, quo eius doloremque corporis ea quodrepellat veritatis similique iusto illo eveniet. Aut, impedit ad!",
  },
];

const makeHTML = (data) => {
  return `<details>
        <summary>${data.title}</summary>
        <p>${data.detail}</p>
    </details>`;
};

const containerElement = document.querySelector("#faq-container");

containerElement.innerHTML = dataArray
  .map((dataItem) => makeHTML(dataItem))
  .join("");
