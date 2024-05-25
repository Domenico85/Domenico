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
const currentUrl = window.location.href;
const pathname = window.location.pathname;
(async () => {
  let EuropeCode = {
    continent: {
      __type: "Pointer",
      className: "Continentscountriescities_Continent",
      objectId: "28HX8qDZHw",
    },
  };
  let southAmericaCode = {
    continent: {
      __type: "Pointer",
      className: "Continentscountriescities_Continent",
      objectId: "ISPUD93Or8",
    },
  };
  let africaCode = {
    continent: {
      __type: "Pointer",
      className: "Continentscountriescities_Continent",
      objectId: "X2rEcTJnsE",
    },
  };

  let northAmericaCode = {
    continent: {
      __type: "Pointer",
      className: "Continentscountriescities_Continent",
      objectId: "vZNZcahFvu",
    },
  };

  let asiaCode = {
    continent: {
      __type: "Pointer",
      className: "Continentscountriescities_Continent",
      objectId: "mSxk54vkg6",
    },
  };

  let oceaniaCode = {
    continent: {
      __type: "Pointer",
      className: "Continentscountriescities_Continent",
      objectId: "E6LHZzkHr6",
    },
  };
  console.log(pathname);
  let where = "miao";
  if (
    pathname == "/discoverify/south-america.html" ||
    pathname == "/Domenico/discoverify/south-america.html"
  ) {
    console.log("yes");
    where = encodeURIComponent(JSON.stringify(southAmericaCode));
  } else if (
    pathname == "/discoverify/europe.html" ||
    pathname == "/Domenico/discoverify/europe.html"
  ) {
    where = encodeURIComponent(JSON.stringify(EuropeCode));
  } else if (
    pathname == "/discoverify/asia.html" ||
    pathname == "/Domenico/discoverify/asia.html"
  ) {
    where = encodeURIComponent(JSON.stringify(asiaCode));
  } else if (
    pathname == "/discoverify/africa.html" ||
    pathname == "/Domenico/discoverify/africa.html"
  ) {
    where = encodeURIComponent(JSON.stringify(africaCode));
  } else if (
    pathname == "/discoverify/north-america.html" ||
    pathname == "/Domenico/discoverify/north-america.html"
  ) {
    where = encodeURIComponent(JSON.stringify(northAmericaCode));
  } else if (
    pathname == "/discoverify/oceania.html" ||
    pathname == "/Domenico/discoverify/oceania.html"
  ) {
    where = encodeURIComponent(JSON.stringify(oceaniaCode));
  }

  const response = await fetch(
    `https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=1000&order=name&include=continent&keys=name,emoji,code,capital,continent,continent.name,phone,native,currency,shape&where=${where}`,
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
  const placeholder = document.createElement("option");
  placeholder.text = "Choose a country";
  placeholder.disabled = true;
  placeholder.hidden = true;
  placeholder.selected = selectCountries.appendChild(placeholder);

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
