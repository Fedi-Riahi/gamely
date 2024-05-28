"use client";
import React, { useState, useEffect } from "react";
import CategoryFilter from "@/components/categoryFilter/CategoryFilter"; // Import CategoryFilter
import Link from "next/link";
import ProductCard from "@/components/productCard/ProductCard";
import Intro from "@/components/intro/Intro";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [displayedListings, setDisplayedListings] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryFilterChange = (selectedCategories) => {
    setFilteredCategories(selectedCategories);
  };

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/userproduct");

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await res.json();

        let filteredListings = data.products;

        if (filteredCategories.length > 0) {
          filteredListings = filteredListings.filter((product) =>
            filteredCategories.includes(product.category)
          );
        }

        setListings(filteredListings);
      } catch (error) {
        console.log("Error loading listings", error);
      }
    };

    getListings();
  }, [filteredCategories]);

  const loadMoreListings = () => {
    setDisplayedListings((prev) => prev + 6);
    const listingsContainer = document.getElementById("listings-container");
    if (listingsContainer) {
      listingsContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div className=" bg-white w-full">
      <Intro />
      <div className="md:px-40 sm:px-5 w-full">
        <div className="flex items-center justify-between w-full mt-4 mb-5 md:px-40 sm:px-5">
          <div className="flex flex-col gap-1 w-2/5">
            <button
              className="block md:hidden bg-zinc text-white py-2 px-4"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="fixed  z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Filters</h2>
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <CategoryFilter
                  selectedCategories={filteredCategories}
                  onChange={handleCategoryFilterChange}
                />
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="bg-zinc text-white py-2 px-4 mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex items-start justify-between mx-auto my-20 gap-5">
          <div className="hidden md:block w-1/4">
            <div className="bg-white mb-2">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <CategoryFilter
                  selectedCategories={filteredCategories}
                  onChange={handleCategoryFilterChange}
                />
              </div>
            </div>
          </div>
          <div
            className=" w-full flex items-center justify-center flex-col mb-40"
            id="listings-container"
          >
            <div className="grid md:grid-cols-4 grid-cols-1 gap-5 w-full">
              {listings.slice(0, displayedListings).map((listing) => (
                <ProductCard listing={listing} key={listing._id} />
              ))}
            </div>

            {displayedListings < listings.length && (
              <button
                className="bg-zinc text-white py-2 px-4 mt-4"
                onClick={loadMoreListings}
              >
                Charger plus
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
