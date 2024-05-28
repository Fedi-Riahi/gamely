"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BestDeals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products.slice(0, 3));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to truncate the description to a certain length
  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  return (
    <div className="mt-40 bg-white">
      <div className="flex items-center justify-between mx-20">
        <h1 className="text-gray-900 text-2xl font-semibold ">
          Best Deals of the month
        </h1>
        <span className="text-gray-800">Voir Tout</span>
      </div>
      <div className="flex items-center mt-10 mx-20">
        <div className="flex items-start gap-4 flex-1 flex-col">
          <button className="z-10 mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-10 rounded-tl-lg rounded-br-lg">
            Gift Cards
          </button>
          <button className="bg-transparent border border-gray-600 hover:bg-gray-200/10 text-gray-900 font-semibold py-3 px-10  rounded-tl-lg rounded-br-lg mt-2">
            In-Game Currency
          </button>
        </div>
        {products.map((product) => (
          <div
            key={product._id}
            className="max-w-xs flex flex-col py-4 px-2 items-center justify-between bg-blue-950 rounded-lg overflow-hidden shadow-lg m-4 mr-20 bg-cover bg-center relative"
            style={{
              width: "300px",
              height: "480px",
              backgroundImage: `url(${product.productImage})`,
            }}
          >
            <div className="absolute inset-0 bg-blue-950 bg-opacity-60 z-0"></div>
            <h3 className="text-lg text-center font-semibold mb-2 text-white z-10">
              {product.name}
            </h3>
            <div className="w-full flex items-center justify-center z-10">
              {/* Remove the Image component since it's now a background */}
            </div>
            <div className="p-4 z-10">
              <p className="text-gray-300 mb-2">
                {truncateDescription(product.description, 50)}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-2xl">
                  {product.price} DT
                </p>
                <button className="mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-8 rounded-tl-lg rounded-br-lg">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestDeals;
