// import { allProductsUrl } from "./utils.js";

// const fetchProducts = async () => {
//   try {
//     const response = await fetch(allProductsUrl);

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Fetch failed:", error);
//   }
// };

// export default fetchProducts;


import { allProductsUrl } from "./utils.js";

const fetchProducts = async () => {
  try {
    const response = await fetch(allProductsUrl);


    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
};

export default fetchProducts;

