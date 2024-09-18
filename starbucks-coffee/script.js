let next = document.querySelector("#next");
let prev = document.querySelector("#prev");
let carousel = document.querySelector(".carousel");
let item = document.querySelectorAll("carousel .item");
let countItem = item.length;
let active = 1;
let other_1 = null;
let other_2 = null;

next.addEventListener("click", () => {
  active = active + 1 >= countItem ? 0 : active + 1;
  other_1 = active - 1 < 0 ? countItem - 1 : active - 1;
  other_2 = active + 1 >= countItem ? 0 : active + 1;
  changeSlider();
});

const changeSlider = () => {
  let itemOldActive = document.querySelector("carousel .item.active");
  if (itemOldActive) itemOldActive.classList.remove("active");

  let itemOldOther_1 = document.querySelector("carousel .item.other_1");
  if (itemOldOther_1) itemOldOther_1.classList.remove("other_1");

  let itemOldOther_2 = document.querySelector("carousel .item.other_2");
  if (itemOldOther_2) itemOldOther_2.classList.remove("other_2");
};
