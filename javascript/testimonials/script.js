const testimonials = [
  {
    author: {
      name: "Gabriel Moore",
      image: "img/author-01.jpg",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam quia, sint sit eum esse, libero, deserunt ipsum nemo recusandae architecto nesciunt. Rem labore fugiat exercitationem reiciendis est consequatur eos.",
    date: "21rd June",
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

const updatePage = () => {
  let markup = makeTestimonialCard(testimonials[0]);

  containerElement.innerHTML = markup;
};

updatePage();
