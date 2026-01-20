import { getStorageItem, setStorageItem } from '../utils.js';

let wishlist = getStorageItem('wishlist') || [];

export const toggleWishlist = (id) => {
  const store = getStorageItem('store');
  if (!store) {
    console.error('Store not loaded');
    return;
  }
  
  const product = store.find(item => item.id === id);
  if (!product) {
    console.error('Product not found');
    return;
  }
  
  const exists = wishlist.find(item => item.id === id);
  
  if (exists) {
    wishlist = wishlist.filter(item => item.id !== id);
    console.log('Removed from wishlist');
  } else {
    wishlist = [...wishlist, product];
    console.log('Added to wishlist');
  }
  
  setStorageItem('wishlist', wishlist);
  
  // Update UI
  const wishlistBtn = document.querySelector(`[data-id="${id}"]`);
  if (wishlistBtn) {
    wishlistBtn.classList.toggle('active');
  }
};