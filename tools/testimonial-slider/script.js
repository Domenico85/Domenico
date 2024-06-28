const testimonials = [
  {
    name: "Carol G.",
    photoURL:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I had the pleasure of working with Dome as my web developer and I couldn't be more satisfied with the results. Dome is a true professional in every sense of the word. Not only did he create a stunning website for my business, but his attention to detail and beautiful graphics truly set my website apart from others in my industry.",
  },
  {
    name: "Alexander H.",
    photoURL:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "One of the things that impressed me the most about Dome was his perfect communication throughout the entire process. He was always available to answer any questions or concerns I had and kept me updated on the progress of my website. This level of communication made the whole experience stress-free and enjoyable.",
  },
  {
    name: "Joanna P.",
    photoURL:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I highly recommend Dome as a web developer. His professionalism, beautiful graphics, and perfect communication make him stand out in the industry. I am beyond happy with my website and I have Dome to thank for bringing my vision to life. Thank you, Dome, for your exceptional work!",
  },
];

const imageElement = document.querySelector("img");
const textElement = document.querySelector(".text");
const usernameElement = document.querySelector(".username");

let index = 0;

function updateTestimonial() {
  const { name, photoURL, text } = testimonials[index];
  imageElement.src = photoURL;
  textElement.innerText = text;
  usernameElement.innerText = name;
  index++;
  if (index === testimonials.length) {
    index = 0;
  }
  setTimeout(updateTestimonial, 7000);
}

updateTestimonial();
