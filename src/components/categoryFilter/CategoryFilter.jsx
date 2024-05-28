"use client"
import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ selectedCategories = [], onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/userproduct");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const allCategories = data.products.map(product => product.category);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event, category) => {
    const isChecked = event.target.checked;
    const updatedCategories = isChecked
      ? [...selectedCategories, category]
      : selectedCategories.filter(cat => cat !== category);
    onChange(updatedCategories);
  };

  return (
    <div> 
      <ul className="flex flex-col items-start justify-center gap-2">
        {categories.map((category, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`category-${index}`}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={(event) => handleCategoryChange(event, category)}
              className="hidden"
            />
            <label
              htmlFor={`category-${index}`}
              className={`inline-flex text-sm items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: '100%' }} // Set width to 100% for the label container
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(event) => handleCategoryChange(event, category)}
                className="accent-gray-800 w-6 h-6 text-white border-gray-300 rounded   mr-2 peer peer-checked:bg-gray-500 peer-checked:text-gray-900"
              />
              <span className="text-md font-medium">{category}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
