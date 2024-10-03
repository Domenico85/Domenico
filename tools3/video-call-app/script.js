document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("button.mode-switch")
    .addEventListener("click", function () {
      document.body.classList.toggle("dark");
    });

  document
    .querySelector(".btn-close-right")
    .addEventListener("click", function () {
      document.querySelector(".right-side").classList.remove("show");
      document.querySelector(".expand-btn").classList.add("show");
    });

  document.querySelector(".expand-btn").addEventListener("click", function () {
    document.querySelector(".right-side").classList.add("show");
    this.classList.remove("show");
  });
});
