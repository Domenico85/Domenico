const testimonials = [
  {
    author: {
      name: "Gabriel Moore",
      image: "img/author-01.jpg",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam quia, sint sit eum esse, libero, deserunt ipsum nemo recusandae architecto nesciunt. Rem labore fugiat exercitationem reiciendis est consequatur eos.",
    date: "21rd June",
  },
  {
    author: {
      name: "Billy Bailey",
      image: "img/author-02.jpg",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam quia, sint sit eum esse, libero, deserunt ipsum nemo recusandae architecto nesciunt. Rem labore fugiat exercitationem reiciendis est consequatur eos.",
    date: "25th June",
  },
  {
    author: {
      name: "Jakie Oliver",
      image: "img/author-03.jpg",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam quia, sint sit eum esse, libero, deserunt ipsum nemo recusandae architecto nesciunt. Rem labore fugiat exercitationem reiciendis est consequatur eos.",
    date: "2nd July",
  },
  {
    author: {
      name: "Pauline Carter",
      image: "img/author-04.jpg",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam quia, sint sit eum esse, libero, deserunt ipsum nemo recusandae architecto nesciunt. Rem labore fugiat exercitationem reiciendis est consequatur eos.",
    date: "9th July",
  },
];

const containerElement = document.querySelector("#testimonials-container");

const makeTestimonialCard = (testimonial) => {
  return `<div class="testimonial-card">
            <img src="${testimonial.author.image}">
            <h2>${testimonial.author.name}</h2>
            <p>${testimonial.text}</p>
            <date>Written on ${testimonial.date}</date>
    
    </div>`;
};

let currentTestimonial = 0;

const nextTestimonial = () => {
  if (currentTestimonial < testimonials.length - 1) {
    currentTestimonial += 1;
    updatePage();
  }
};

const prevTestimonial = () => {
  if (currentTestimonial > 0) {
    currentTestimonial -= 1;
    updatePage();
  }
};

const updatePage = () => {
  let markup = makeTestimonialCard(testimonials[currentTestimonial]);

  if (testimonials.length > 1) {
    markup += `<nav>
        <button onclick="prevTestimonial()">Previous</button>
        <button onclick="nextTestimonial()">Next</button>
    </nav>`;
  }
  containerElement.innerHTML = markup;
};

updatePage();
