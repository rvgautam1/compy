import { formatPrice, getStorageItem } from "../utils.js";

const displayWishlist = (products, element) => {
  element.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      
      return ` <article class="product">
          <div class="product-container">
            <img src="${image}" class="product-img img" alt="${name}" />
           
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              
              <!-- Remove buttons or keep only view button -->
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
    })
    .join("");
};

export default displayWishlist;