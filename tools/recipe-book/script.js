const apiKey = "052242452bac4d46bcef30864d64fd10";
const recipeListElement = document.querySelector("#recipe-list");

function displayRecipes(recipes) {
  recipeListElement.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemElement = document.createElement("li");
    recipeItemElement.classList.add("recipe-item");

    const recipeImageElement = document.createElement("img");
    recipeImageElement.src = recipe.image;
    recipeImageElement.alt = "recipe-image";

    const recipeTitleElement = document.createElement("h2");
    recipeTitleElement.innerText = recipe.title;

    const recipeIngredientsElement = document.createElement("p");
    recipeIngredientsElement.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;

    const recipeLinkElement = document.createElement("a");
    recipeLinkElement.href = recipe.sourceUrl;
    recipeLinkElement.innerText = "View Recipe";

    recipeItemElement.appendChild(recipeImageElement);
    recipeItemElement.appendChild(recipeTitleElement);
    recipeItemElement.appendChild(recipeIngredientsElement);
    recipeItemElement.appendChild(recipeLinkElement);
    recipeListElement.appendChild(recipeItemElement);
  });
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
  console.log(recipes);
}

init();
