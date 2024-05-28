// utils/api.js
export const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/userproduct");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      const allCategories = data.products.map(product => product.category);
      return Array.from(new Set(allCategories));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  