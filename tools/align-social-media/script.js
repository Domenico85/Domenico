let searchbar = document.getElementsByClassName("search-bar")[0];
let cards = document.getElementsByClassName("cards");

searchbar.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    console.log("clicked");
    cards.innerHTML = "Course is Coming soon";
    for (let i = 0; i < cards.length; i++) {
      cards[i].innerHTML = "Course is Coming soon";
    }
  }
});
