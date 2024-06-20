document.addEventListener("DOMContentLoaded", () => {
    const navElement = document.querySelector("nav");
    const navbarLinks = document.querySelectorAll("nav a");
    const sectionElements = document.querySelectorAll("section");
  
    if (sectionElements instanceof NodeList) {
      console.log("sectionElements is a NodeList");
    } else {
      console.error("sectionElements is not a NodeList");
    }
  
    const sectionsArray = Array.from(sectionElements);
  
    const removeActiveLinks = () => {
      navbarLinks.forEach(link => link.parentElement.classList.remove("active"));
    };
  
    const hideSections = () => {
      sectionsArray.forEach(section => section.classList.add("hidden"));
    };
  
    navbarLinks.forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        removeActiveLinks();
        hideSections();
        link.parentElement.classList.add('active');
        const targetSection = document.querySelector(link.hash);
        if (targetSection) {
          targetSection.classList.remove('hidden');
        } else {
          console.error(`No section found for ${link.hash}`);
        }
      });
    });
  });
  