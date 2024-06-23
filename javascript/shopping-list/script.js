class ShoppingList {
  constructor(
    itemsSelector,
    addItemButtonSelector,
    newItemTextSelector,
    storageKey = "shoppingList"
  ) {
    this.storageKey = storageKey;
    this.itemsElement = document.querySelector(itemsSelector);
    this.addItemButtonElement = document.querySelector(addItemButtonSelector);
    this.newItemTextElement = document.querySelector(newItemTextSelector);

    this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  renderItems() {
    this.itemsElement.innerHTML = "";
    if (this.items.length === 0) {
      const itemElement = document.createElement("li");
      itemElement.textContent = "No Items";
      this.itemsElement.appendChild(itemElement);
    }
  }
}

const myShoppingList = new ShoppingList(
  "#shopping-list-items",
  "#add-item",
  "#new-item-text"
);

myShoppingList.renderItems();
