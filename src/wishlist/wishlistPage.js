import { getStorageItem, getElement } from '../utils.js';
import display from '../displayProducts.js';

// Wishlist Page Setup
const container = getElement('.wishlist-container');
if (!container) {
  console.warn('Wishlist container not found');
  // Optionally, you could create the container or handle this case as needed
} else {
  const wishlist = getStorageItem('wishlist') || [];
  console.log('Wishlist items from localStorage:', wishlist);
  
  if (!wishlist || wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-wishlist">
        <h3>Your wishlist is empty 😢</h3>
        <p>Browse products and add items you love!</p>
        <a href="index.html" class="btn">Browse Products</a>
      </div>
    `;
  } else {
    // Display wishlist items with filters=true to prevent cart/wishlist buttons
    display(wishlist, container, true);
  }
}