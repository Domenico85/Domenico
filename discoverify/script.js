(function () {
  "use strict";

  class Menu {
    constructor(settings) {
      this.menuRootNode = settings.menuRootNode;
      this.isInitialized = false;
      this.isOpened = false;
    }

    changeMenuState(menuState) {
      return (this.isOpened = !menuState);
    }
  }

  class MenuBurger extends Menu {
    constructor(settings) {
      super(settings);
      this.openText = settings.openText;
      this.closeText = settings.closeText;
      this.menuClassesNames = settings.menuClassesNames;
      this.menuLinks = this.menuRootNode.querySelectorAll(
        `.${this.menuClassesNames.menuItemClass}`
      );
      this.hiddenElementsQuery = settings.hiddenElementsQuery;
      this.pageNodes = document.querySelectorAll(this.hiddenElementsQuery);
      this.toggleNode = this.menuRootNode.querySelector(
        `.${this.menuClassesNames.toggleClass}`
      );
      this.a11yAttributes = ["aria-hidden", "inert"];
      this.a11yAttributeValues = {
        "aria-hidden": true,
        inert: "",
      };
    }

    init() {
      let currentMenuState = this.changeMenuState(this.isOpened);

      this.changeToggleHint(
        this.getCurrentToggleHint(
          currentMenuState,
          this.openText,
          this.closeText
        ),
        this.menuRootNode.querySelector(
          `.${this.menuClassesNames.toggleHintClass}`
        )
      );
      this.menuRootNode.classList.toggle(
        `${this.menuClassesNames.activeClass}`
      );
      this.setCurrentA11yAttribute(
        currentMenuState,
        this.toggleNode,
        "aria-expanded"
      );
      this.getFocusCurrentNode(
        currentMenuState,
        this.toggleNode,
        this.menuLinks[0]
      );
      this.pageNodes.forEach((node) =>
        this.setCurrentPageA11yAttributes(
          currentMenuState,
          node,
          this.a11yAttributes,
          this.a11yAttributeValues
        )
      );
    }

    changeToggleHint(toggleHint, toggleNode) {
      toggleNode.textContent = toggleHint;
      return toggleHint;
    }

    getCurrentToggleHint(currentMenuState, openText, closeText) {
      return currentMenuState !== true ? openText : closeText;
    }

    setCurrentA11yAttribute(currentMenuState, toggleNode, attribute) {
      return currentMenuState !== true
        ? toggleNode.removeAttribute(attribute)
        : toggleNode.setAttribute(attribute, currentMenuState);
    }

    getFocusCurrentNode(currentMenuState, importantFocusNode, toggleNode) {
      return currentMenuState !== true
        ? importantFocusNode.focus()
        : toggleNode.focus();
    }

    setCurrentPageA11yAttributes(
      currentMenuState,
      node,
      a11yAttributes,
      a11yAttributeValues
    ) {
      return currentMenuState !== true
        ? a11yAttributes.forEach((attribute) => node.removeAttribute(attribute))
        : a11yAttributes.forEach((attribute) =>
            node.setAttribute(attribute, a11yAttributeValues[attribute])
          );
    }
  }

  const menuClassesNames = {
    rootClass: "menu",
    activeClass: "menu_activated",
    toggleClass: "menu__toggle",
    toggleHintClass: "menu__toggle-hint",
    menuItemClass: "menu__link",
  };

  const jsMenuNode = document.querySelector(`.${menuClassesNames.rootClass}`);
  const demoMenu = new MenuBurger({
    menuRootNode: jsMenuNode,
    menuClassesNames: menuClassesNames,
    openText: "Open the menu",
    closeText: "Close the menu",
    hiddenElementsQuery: `body > *:not(.${menuClassesNames.rootClass}):not(script)`,
  });

  let menuIsDisplayed = false;

  function toggleMenu(event) {
    if (menuIsDisplayed === false) {
      document.addEventListener("keyup", handleEscape);
    }

    function handleEscape(event) {
      let key = event.which || event.keyCode;

      if (menuIsDisplayed === false) {
        document.removeEventListener("keyup", handleEscape);
      }

      if (key === 27 && menuIsDisplayed === true) {
        event.stopPropagation();
        menuIsDisplayed = !menuIsDisplayed;
        document.removeEventListener("keyup", handleEscape);
        demoMenu.init();
      }
    }

    menuIsDisplayed = !menuIsDisplayed;
    return demoMenu.init();
  }

  jsMenuNode
    .querySelector(`.${menuClassesNames.toggleClass}`)
    .addEventListener("click", toggleMenu);
})();

(async () => {
  const where = encodeURIComponent(
    JSON.stringify({
      continent: {
        __type: "Pointer",
        className: "Continentscountriescities_Continent",
        objectId: "28HX8qDZHw",
      },
    })
  );

  const response = await fetch(
    `https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=60&include=continent&where=${where}`,
    {
      headers: {
        "X-Parse-Application-Id": "Q0Ey6x9UWkCTMhWZs4deNROh5AF60rJob85xIogK",
        "X-Parse-REST-API-Key": "CWVIKyb84JV4pde9S94APsKTXwBvWx0BohTQ6Bah",
      },
    }
  );
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));

  const selectCountries = document.createElement("select");
  selectCountries.id = "countries";

  const container = document.querySelector("#countries");

  container.appendChild(selectCountries);

  data.results.forEach((country, index) => {
    const option = document.createElement("option");
    option.text = country.name;
    option.value = index;
    selectCountries.appendChild(option);
  });

  const detailsCountry = document.querySelector(".details-country");

  selectCountries.addEventListener("change", async (event) => {
    const selectedIndex = event.target.value;
    const selectedCountry = data.results[selectedIndex];

    detailsCountry.innerHTML = `
      <h2>${selectedCountry.name}</h2>
      <p><span class="color-text">Native:</span> ${selectedCountry.native}</p>
      <p><span class="color-text">Capital:</span> ${selectedCountry.capital}</p>
      <p><span class="color-text">Currency:</span> ${selectedCountry.currency}</p>
      <p><span class="color-text">Phone Prefix:</span> ${selectedCountry.phone}</p>
      <p><span class="color-text">Code:</span> ${selectedCountry.code}</p>
      <p><span class="color-text">Flag:</span> ${selectedCountry.emoji}</p>
    `;
  });
})();
