function hiddenPlaceholder() {
  const searchBox = document.querySelector(".search-box");
  const inputSearch = document.querySelector(".input-search");
  const btnSearch = document.querySelector(".btn-search");

  btnSearch.addEventListener("click", () => {
    inputSearch.focus();
  });

  inputSearch.addEventListener("focus", () => {
    inputSearch.setAttribute("placeholder", "Type to Search...");
  });

  inputSearch.addEventListener("blur", () => {
    if (inputSearch.value === "") {
      inputSearch.setAttribute("placeholder", "");
    }
  });
}

hiddenPlaceholder();
