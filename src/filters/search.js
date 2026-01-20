import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupSearch = (store) => {
  const form = getElement(".input-form");
  const nameInput = getElement(".search-input");

  form.addEventListener("keyup", function () {
    const value = nameInput.value.toLowerCase().trim();

    if (value) {
      const newStore = store.filter((product) => {
        const name = product.name.toLowerCase();

        // first check if input is match with the first lettre of product name
        if (name.startsWith(value)) {
          return true;
        }
        //check input anywhere in the product name
        return name.includes(value);
      });

      console.log("Filtered products:", newStore);
      display(newStore, getElement(".products-container"), true);

      if (newStore.length < 1) {
        const products = getElement(".products-container");
        products.innerHTML = `<h3 class="filter-error">
          sorry, no products matched the  search
        </h3>`;
      }
    } else {
      display(store, getElement(".products-container"), true);
    }
  });
};

export default setupSearch;
