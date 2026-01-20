import { formatPrice, getStorageItem } from "./utils.js";

const display = (products, element, filters) => {
  // display products
  element.innerHTML = products
    .map((product) => {
      const { id, name, image, price } = product;
      const wishlist = getStorageItem('wishlist') || [];
      const isInWishlist = wishlist.some(item => item.id === id);
      
      // If filters is true (wishlist page), don't show add to cart/wishlist buttons
      const showButtons = !filters;
      
      return ` <article class="product">
          <div class="product-container">
            <img src="${image}" class="product-img img" alt="${name}" />
           
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>

              ${showButtons ? `
                <button class="product-cart-btn product-icon" data-id="${id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
                <button class="product-wishlist-btn product-icon ${isInWishlist ? 'active' : ''}" data-id="${id}">
                  <i class="fas fa-heart"></i>
   </button>
              ` : `
                <!-- On wishlist page, show remove button -->
                <button class="remove-wishlist-btn product-icon" data-id="${id}">
                  <i class="fas fa-trash"></i>
                </button>
              `}
            </div>
          </div>
       <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
    })
    .join("");

  // Don't add event listeners on wishlist page (filters=true)
  if (filters) {
    // Add specific wishlist page event listener for removing items
    element.addEventListener('click', function (e) {
      const button = e.target.closest('button');
      if (!button || !button.classList.contains('remove-wishlist-btn')) return;
      
      const id = button.dataset.id;
      removeFromWishlist(id, element);
    });
    return;
  }

  // Add event listeners for product pages
  element.addEventListener('click', async function (e) {
    const button = e.target.closest('button');
    if (!button) return;
    
    const id = button.dataset.id;
    
    if (button.classList.contains('product-cart-btn')) {
      const { addToCart } = await import('./cart/setupCart.js');
      addToCart(id);
    }
    
    if (button.classList.contains('product-wishlist-btn')) {
      const { toggleWishlist } = await import('./wishlist/setupWishlist.js');
      toggleWishlist(id);
      button.classList.toggle('active');
    }
  });
};

// Function to remove item from wishlist and update display
const removeFromWishlist = (id, container) => {
  let wishlist = getStorageItem('wishlist') || [];
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  
  // Re-render the wishlist
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-wishlist">
        <h3>Your wishlist is empty 😢</h3>
        <p>Browse products and add items you love!</p>
        <a href="index.html" class="btn">Browse Products</a>
      </div>
    `;
  } else {
    display(wishlist, container, true);
  }
};

export default display;