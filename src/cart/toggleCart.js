import { getElement } from "../utils.js";


const cartOverlay = document.querySelector(".cart-overlay");
const closeCartBtn = document.querySelector(".cart-close");
const toggleCartBtn = document.querySelector(".toggle-cart");


let openCart = () => {};

// only attach logic if cart exists on this page
if (cartOverlay && closeCartBtn && toggleCartBtn) {
  toggleCartBtn.addEventListener("click", () => {
    cartOverlay.classList.add("show");
  });

  closeCartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("show");
  });

  openCart = () => {
    cartOverlay.classList.add("show");
  };
}

export { openCart };
