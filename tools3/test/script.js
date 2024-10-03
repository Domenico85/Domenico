const micOn = document.getElementById("micOn");
const micOff = document.getElementById("micOff");

micOn.addEventListener("click", () => {
  micOn.style.display = "none";
  micOff.style.display = "block";
});

micOff.addEventListener("click", () => {
  micOff.style.display = "none";
  micOn.style.display = "block";
});
